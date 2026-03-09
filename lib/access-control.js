import { createHash, createHmac, randomBytes } from 'node:crypto';

export const ACCESS_SESSION_COOKIE = 'the_silence_access';
export const ACCESS_REQUEST_COOKIE = 'the_silence_access_request';

const PASSWORD_TTL_MS = 60 * 60 * 1000;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function hashValue(value) {
  return createHash('sha256').update(value).digest('hex');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createMailError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function createAuthError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function getAccessCookieSecret() {
  const value = process.env.ACCESS_COOKIE_SECRET || process.env.SERVER_ONLY_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === 'production') return null;
  return 'dev-only-access-cookie-secret';
}

function requireAccessCookieSecret() {
  const secret = getAccessCookieSecret();
  if (secret) return secret;
  throw createAuthError('auth_config_missing', 'ACCESS_COOKIE_SECRET is required in production.');
}

function signTokenPayload(payloadBase64Url, secret) {
  return createHmac('sha256', secret).update(payloadBase64Url).digest('base64url');
}

function encodeTokenPayload(payload) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function decodeToken(token) {
  const [payloadPart, signaturePart] = String(token || '').split('.');
  if (!payloadPart || !signaturePart) return null;
  const secret = getAccessCookieSecret();
  if (!secret) return null;

  const expectedSignature = signTokenPayload(payloadPart, secret);
  if (signaturePart !== expectedSignature) return null;

  try {
    const json = Buffer.from(payloadPart, 'base64url').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function issueSignedToken(payload) {
  const secret = requireAccessCookieSecret();
  const payloadPart = encodeTokenPayload(payload);
  const signaturePart = signTokenPayload(payloadPart, secret);
  return `${payloadPart}.${signaturePart}`;
}

function createPassword(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(length);

  return Array.from(bytes, (byte) => chars[byte % chars.length]).join('');
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function sanitizePhoneNumber(phoneNumber) {
  return String(phoneNumber || '').replace(/[^\d()+\-\s]/g, '').trim();
}

export function validateAccessPayload(payload) {
  const errors = {};
  const name = String(payload.name || '').trim();
  const email = normalizeEmail(payload.email);
  const countryCode = String(payload.countryCode || '').trim();
  const phoneNumber = sanitizePhoneNumber(payload.phoneNumber);
  const wealthBand = String(payload.wealthBand || '').trim();

  if (name.length < 2) {
    errors.name = 'お名前を入力してください。';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }

  if (!countryCode) {
    errors.countryCode = '国番号を選択してください。';
  }

  if (phoneNumber.replace(/[^\d]/g, '').length < 8) {
    errors.phoneNumber = '有効な電話番号を入力してください。';
  }

  if (!wealthBand) {
    errors.wealthBand = '資産額を選択してください。';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    clean: {
      name,
      email,
      countryCode,
      phoneNumber,
      wealthBand
    }
  };
}

export function issueAccessRequest(payload) {
  const password = createPassword(8);
  const now = Date.now();

  return {
    password,
    expiresAt: now + PASSWORD_TTL_MS
  };
}

export function createPendingAccessToken({ email, password, expiresAt }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '').trim().toUpperCase();
  return issueSignedToken({
    type: 'access_request',
    email: normalizedEmail,
    passwordHash: hashValue(normalizedPassword),
    exp: Number(expiresAt || 0)
  });
}

async function sendResendEmail({ apiKey, from, to, subject, html, replyTo }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw createMailError('mail_delivery_failed', `Email delivery failed: ${response.status} ${text}`);
  }

  return response.json();
}

export function verifyAccessPassword(email, password, pendingAccessToken) {
  const normalizedEmail = normalizeEmail(email);
  const payload = decodeToken(pendingAccessToken);

  if (!payload || payload.type !== 'access_request' || payload.email !== normalizedEmail) {
    return { ok: false, reason: 'not_found' };
  }

  if (Date.now() > Number(payload.exp || 0)) {
    return { ok: false, reason: 'expired' };
  }

  if (hashValue(String(password || '').trim().toUpperCase()) !== payload.passwordHash) {
    return { ok: false, reason: 'invalid' };
  }

  const sessionExpiresAt = Date.now() + SESSION_TTL_MS;
  const sessionToken = issueSignedToken({
    type: 'access_session',
    email: normalizedEmail,
    exp: sessionExpiresAt,
    nonce: randomBytes(16).toString('hex')
  });

  return {
    ok: true,
    sessionToken,
    sessionExpiresAt
  };
}

export function getSessionRecord(sessionToken) {
  if (!sessionToken) return null;
  const payload = decodeToken(sessionToken);
  if (!payload || payload.type !== 'access_session') {
    return null;
  }

  if (Date.now() > Number(payload.exp || 0)) {
    return null;
  }

  return {
    email: payload.email,
    sessionExpiresAt: payload.exp
  };
}

export async function sendAccessEmail({ email, name, password, expiresAt }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ACCESS_FROM_EMAIL;
  const adminEmail = normalizeEmail(process.env.ACCESS_ADMIN_EMAIL);
  const isProduction = process.env.NODE_ENV === 'production';
  const expiresAtText = new Date(expiresAt).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const cleanName = escapeHtml(name);
  const cleanEmail = escapeHtml(email);
  const cleanPassword = escapeHtml(password);

  if (!resendApiKey || !fromEmail) {
    if (isProduction) {
      throw createMailError('mail_config_missing', 'RESEND_API_KEY and ACCESS_FROM_EMAIL are required in production.');
    }

    console.info(`[access-mail:dev] ${email} password=${password}`);
    return {
      delivered: false,
      mode: 'development',
      devPassword: password
    };
  }

  const tasks = [];

  tasks.push(
    sendResendEmail({
      apiKey: resendApiKey,
      from: fromEmail,
      to: email,
      subject: '【自動返信】THE SILENCE 閲覧用パスワードのご案内',
      html: `
        <div style="font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif; color: #111; line-height: 1.8;">
          <p>${cleanName} 様</p>
          <p>この度はお問い合わせありがとうございます。THE SILENCE の限定コンテンツ閲覧用パスワードをお送りします。</p>
          <p style="font-size: 24px; letter-spacing: 0.18em; font-weight: 700;">${cleanPassword}</p>
          <p>有効期限: ${expiresAtText}</p>
        </div>
      `
    })
  );

  if (adminEmail) {
    tasks.push(
      sendResendEmail({
        apiKey: resendApiKey,
        from: fromEmail,
        to: adminEmail,
        subject: '【通知】THE SILENCE アクセス申請を受信しました',
        replyTo: email,
        html: `
          <div style="font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif; color: #111; line-height: 1.8;">
            <p>新しいアクセス申請を受信しました。</p>
            <p>氏名: ${cleanName}</p>
            <p>メール: ${cleanEmail}</p>
            <p>発行パスワード: ${cleanPassword}</p>
            <p>有効期限: ${expiresAtText}</p>
          </div>
        `
      })
    );
  }

  await Promise.all(tasks);

  return {
    delivered: true,
    mode: 'resend'
  };
}
