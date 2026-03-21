import { createHmac, timingSafeEqual } from 'node:crypto';

const WEBHOOK_TOLERANCE_SECONDS = 300;

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

export function formatInboundRow({ event, email }) {
  const attachmentNames = Array.isArray(email.attachments)
    ? email.attachments.map((attachment) => attachment.filename).filter(Boolean).join(', ')
    : '';

  return [
    new Date().toISOString(),
    event?.created_at || '',
    email?.created_at || '',
    email?.email_id || '',
    email?.message_id || '',
    email?.from || '',
    Array.isArray(email?.to) ? email.to.join(', ') : '',
    Array.isArray(email?.cc) ? email.cc.join(', ') : '',
    email?.subject || '',
    email?.text || '',
    email?.html || '',
    attachmentNames
  ];
}
