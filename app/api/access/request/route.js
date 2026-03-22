import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_REQUEST_COOKIE,
  createPendingAccessToken,
  issueAccessRequest,
  sendAccessEmail,
  validateAccessPayload
} from '../../../../lib/access-control';
import { appendRegistrationRow } from '../../../../lib/google-sheets';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const payload = await request.json();
    const hostname = request.nextUrl.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const validation = validateAccessPayload(payload);

    if (!validation.isValid) {
      return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
    }

    const { password, expiresAt } = issueAccessRequest(validation.clean);
    const pendingAccessToken = createPendingAccessToken({
      email: validation.clean.email,
      password,
      expiresAt
    });
    const delivery = await sendAccessEmail({
      email: validation.clean.email,
      name: validation.clean.name,
      countryCode: validation.clean.countryCode,
      phoneNumber: validation.clean.phoneNumber,
      wealthBand: validation.clean.wealthBand,
      password,
      expiresAt
    });
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_REQUEST_COOKIE, pendingAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' && !isLocalhost,
      path: '/',
      expires: new Date(expiresAt)
    });

    const registeredAt = new Date().toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Asia/Tokyo'
    });

    try {
      await appendRegistrationRow([
        registeredAt,
        validation.clean.name,
        validation.clean.email,
        validation.clean.countryCode,
        validation.clean.phoneNumber,
        validation.clean.wealthBand
      ]);
    } catch (sheetError) {
      console.error('[access/request] Google Sheets append failed', sheetError.message);
    }

    return NextResponse.json({
      ok: true,
      expiresAt,
      devPassword: delivery.devPassword || null
    });
  } catch (error) {
    const code = error?.code || 'unexpected_error';
    console.error('[access/request] failed', {
      code,
      message: error?.message || 'unknown error'
    });

    const messageMap = {
      mail_config_missing: 'メール送信設定が未完了です。時間をおいて再度お試しください。',
      mail_from_unverified: '送信元メール設定が未完了です。時間をおいて再度お試しください。',
      mail_delivery_failed: 'メール送信に失敗しました。時間をおいて再度お試しください。',
      auth_config_missing: '認証設定が未完了です。時間をおいて再度お試しください。'
    };

    return NextResponse.json(
      {
        ok: false,
        code,
        message: messageMap[code] || '送信に失敗しました。時間をおいて再度お試しください。'
      },
      { status: 500 }
    );
  }
}
