import { createHmac, timingSafeEqual } from 'node:crypto';

const WEBHOOK_TOLERANCE_SECONDS = 300;

export const INBOUND_SHEET_HEADERS = [
  'type',
  'webhook_created_at',
  'email_created_at',
  'email_id',
  'message_id',
  'subject',
  'from',
  'to',
  'reply_to',
  'name',
  'email',
  'company',
  'phone_number',
  'agreed_at',
  'message_text',
  'attachments',
  'cc',
  'html'
];

function parseSignatureHeader(signatureHeader) {
  return String(signatureHeader || '')
    .split(/\s+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [version, signature] = entry.split(',');
      return { version, signature };
    })
    .filter((entry) => entry.version === 'v1' && entry.signature);
}

export function verifyResendWebhookSignature({
  payload,
  secret,
  svixId,
  svixTimestamp,
  svixSignature
}) {
  if (!secret || !svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  const timestamp = Number(svixTimestamp);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestamp) > WEBHOOK_TOLERANCE_SECONDS) {
    return false;
  }

  const encodedSecret = secret.startsWith('whsec_') ? secret.slice(6) : secret;
  const signingSecret = Buffer.from(encodedSecret, 'base64');
  const signedContent = `${svixId}.${svixTimestamp}.${payload}`;
  const expectedSignature = createHmac('sha256', signingSecret).update(signedContent).digest('base64');
  const candidates = parseSignatureHeader(svixSignature);

  return candidates.some(({ signature }) => {
    const expected = Buffer.from(expectedSignature, 'utf8');
    const actual = Buffer.from(signature, 'utf8');
    if (expected.length !== actual.length) {
      return false;
    }

    return timingSafeEqual(expected, actual);
  });
}

export function decodeWebhookPayload(rawPayload) {
  try {
    return JSON.parse(rawPayload);
  } catch {
    return null;
  }
}

function extractField(text, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = text.match(new RegExp(`${escapedLabel}:\\s*([\\s\\S]*?)(?=\\n[^\\n:]+:|$)`));
  return match ? match[1].trim() : '';
}

function normalizeEmailText(email) {
  return String(email?.text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/。/g, '。\n');
}

function formatStructuredContactRow({ event, email, text }) {
  return [
    'contact_request',
    event?.created_at || '',
    email?.created_at || '',
    email?.id || email?.email_id || '',
    email?.message_id || '',
    email?.subject || '',
    email?.from || '',
    Array.isArray(email?.to) ? email.to.join(', ') : '',
    Array.isArray(email?.reply_to) ? email.reply_to.join(', ') : '',
    extractField(text, 'お名前'),
    extractField(text, 'メールアドレス'),
    extractField(text, '会社名'),
    extractField(text, '電話番号'),
    extractField(text, '同意時刻'),
    extractField(text, 'お問い合わせ内容'),
    '',
    '',
    email?.html || ''
  ];
}

function formatGenericRow({ event, email, text }) {
  const attachmentNames = Array.isArray(email.attachments)
    ? email.attachments.map((attachment) => attachment.filename).filter(Boolean).join(', ')
    : '';

  return [
    'generic_email',
    event?.created_at || '',
    email?.created_at || '',
    email?.id || email?.email_id || '',
    email?.message_id || '',
    email?.subject || '',
    email?.from || '',
    Array.isArray(email?.to) ? email.to.join(', ') : '',
    Array.isArray(email?.reply_to) ? email.reply_to.join(', ') : '',
    '',
    '',
    '',
    '',
    '',
    text,
    attachmentNames,
    Array.isArray(email?.cc) ? email.cc.join(', ') : '',
    email?.html || ''
  ];
}

export function formatInboundRow({ event, email }) {
  const text = normalizeEmailText(email);
  const subject = String(email?.subject || '');

  if (subject.includes('お問い合わせフォーム')) {
    return formatStructuredContactRow({ event, email, text });
  }

  return formatGenericRow({ event, email, text });
}
