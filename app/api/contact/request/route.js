import { NextResponse } from 'next/server';
import { appendContactRow } from '../../../../lib/google-sheets';

export const dynamic = 'force-dynamic';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getReceivingEmails() {
  const receivingRaw =
    process.env.ACCESS_RECEIVING_EMAIL ||
    process.env.ACCESS_RECIVING_EMAIL ||
    process.env.ACCESS_ADMIN_EMAIL ||
    '';

  return receivingRaw
    .split(/[,\n;\s]+/)
    .map((value) => normalizeEmail(value))
    .filter(Boolean);
}

function describeMailConfig({ resendApiKey, fromEmail, receivingEmails }) {
  const missing = [];

  if (!resendApiKey) missing.push('RESEND_API_KEY');
  if (!fromEmail) missing.push('ACCESS_FROM_EMAIL');
  if (!receivingEmails || receivingEmails.length === 0) missing.push('ACCESS_RECEIVING_EMAIL');

  return {
    missing,
    hasResendApiKey: Boolean(resendApiKey),
    fromEmail: fromEmail || null,
    receivingCount: Array.isArray(receivingEmails) ? receivingEmails.length : 0
  };
}

function validatePayload(payload) {
  const errors = {};
  const name = String(payload.name || '').trim();
  const email = normalizeEmail(payload.email);
  const company = String(payload.company || '').trim();
  const phoneNumber = String(payload.phoneNumber || '').trim();
  const message = String(payload.message || '').trim();
  const agreed = Boolean(payload.agreed);

  if (name.length < 2) errors.name = 'お名前を入力してください。';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = '有効なメールアドレスを入力してください。';
  if (phoneNumber.replace(/[^\d]/g, '').length < 8) errors.phoneNumber = '有効な電話番号を入力してください。';
  if (message.length < 5) errors.message = 'お問い合わせ内容を入力してください。';
  if (!agreed) errors.agreed = '同意が必要です。';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    clean: { name, email, company, phoneNumber, message, agreed }
  };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validatePayload(payload);

    if (!validation.isValid) {
      return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.ACCESS_FROM_EMAIL;
    const receivingEmails = getReceivingEmails();
    const configState = describeMailConfig({ resendApiKey, fromEmail, receivingEmails });
    const agreedAt = new Date();
    const agreedAtText = agreedAt.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    });

    if (!resendApiKey || !fromEmail || receivingEmails.length === 0) {
      console.error('[contact/request] missing config', configState);
      return NextResponse.json(
        { ok: false, message: 'メール送信設定が未完了です。時間をおいて再度お試しください。' },
        { status: 500 }
      );
    }

    if (/@.*resend\.dev>?$/i.test(fromEmail)) {
      console.error('[contact/request] invalid production sender', configState);
      return NextResponse.json(
        { ok: false, message: '送信元メール設定が未完了です。時間をおいて再度お試しください。' },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif; color: #111; line-height: 1.8;">
        <p>お問い合わせフォームを受信しました。</p>
        <p>お名前: ${escapeHtml(validation.clean.name)}</p>
        <p>メールアドレス: ${escapeHtml(validation.clean.email)}</p>
        <p>会社名: ${escapeHtml(validation.clean.company || '-')}</p>
        <p>電話番号: ${escapeHtml(validation.clean.phoneNumber)}</p>
        <p>プライバシーポリシー同意: 同意済み</p>
        <p>同意時刻: ${escapeHtml(agreedAtText)} (JST)</p>
        <p>お問い合わせ内容:</p>
        <p style="white-space: pre-wrap;">${escapeHtml(validation.clean.message)}</p>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif; color: #111; line-height: 1.8;">
        <p>${escapeHtml(validation.clean.name)} 様</p>
        <p>この度は THE SILENCE へお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを受け付けました。担当者より順次ご連絡いたします。</p>
        <p>お名前: ${escapeHtml(validation.clean.name)}</p>
        <p>メールアドレス: ${escapeHtml(validation.clean.email)}</p>
        <p>会社名: ${escapeHtml(validation.clean.company || '-')}</p>
        <p>電話番号: ${escapeHtml(validation.clean.phoneNumber)}</p>
        <p>受付時刻: ${escapeHtml(agreedAtText)} (JST)</p>
        <p>お問い合わせ内容:</p>
        <p style="white-space: pre-wrap;">${escapeHtml(validation.clean.message)}</p>
      </div>
    `;

    const [notificationResponse, confirmationResponse] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: receivingEmails,
          reply_to: validation.clean.email,
          subject: '【受信通知】THE SILENCE お問い合わせフォーム',
          html
        })
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [validation.clean.email],
          subject: '【自動返信】THE SILENCE お問い合わせありがとうございます',
          html: confirmationHtml
        })
      })
    ]);

    if (!notificationResponse.ok) {
      const text = await notificationResponse.text();
      throw new Error(`Contact email delivery failed: ${notificationResponse.status} ${text}`);
    }

    if (!confirmationResponse.ok) {
      const text = await confirmationResponse.text();
      throw new Error(`Contact confirmation delivery failed: ${confirmationResponse.status} ${text}`);
    }

    try {
      console.log('[contact/request] Attempting Google Sheets append...');
      console.log('[contact/request] GOOGLE_SHEETS_CONTACT_ID:', process.env.GOOGLE_SHEETS_CONTACT_ID ? 'set' : 'not set');
      console.log('[contact/request] GOOGLE_SHEETS_SPREADSHEET_ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? 'set' : 'not set');
      console.log('[contact/request] GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'set' : 'not set');
      console.log('[contact/request] GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:', process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ? 'set (length: ' + process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.length + ')' : 'not set');
      await appendContactRow([
        agreedAtText,
        validation.clean.name,
        validation.clean.email,
        validation.clean.company || '-',
        validation.clean.phoneNumber,
        validation.clean.message,
        '同意済み'
      ]);
      console.log('[contact/request] Google Sheets append succeeded');
    } catch (sheetError) {
      console.error('[contact/request] Google Sheets append failed', sheetError.message, sheetError.stack);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact/request] failed', error);
    return NextResponse.json(
      { ok: false, message: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
