import { createHash, randomBytes } from 'node:crypto';

export const ACCESS_SESSION_COOKIE = 'the_silence_access';

const PASSWORD_TTL_MS = 60 * 60 * 1000;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getStore() {
  if (!globalThis.__theSilenceAccessStore) {
    globalThis.__theSilenceAccessStore = {
      requests: new Map(),
      sessions: new Map()
    };
  }

  return globalThis.__theSilenceAccessStore;
}

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
  const store = getStore();
  const password = createPassword(8);
  const email = normalizeEmail(payload.email);
  const now = Date.now();

  store.requests.set(email, {
    ...payload,
    email,
    passwordHash: hashValue(password),
    passwordExpiresAt: now + PASSWORD_TTL_MS,
    sessionTokenHash: null,
    sessionExpiresAt: null,
    createdAt: now
  });

  return {
    password,
    expiresAt: now + PASSWORD_TTL_MS
  };
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

export function verifyAccessPassword(email, password) {
  const store = getStore();
  const normalizedEmail = normalizeEmail(email);
  const record = store.requests.get(normalizedEmail);

  if (!record) {
    return { ok: false, reason: 'not_found' };
  }

  if (Date.now() > record.passwordExpiresAt) {
    store.requests.delete(normalizedEmail);
    return { ok: false, reason: 'expired' };
  }

  if (hashValue(String(password || '').trim().toUpperCase()) !== record.passwordHash) {
    return { ok: false, reason: 'invalid' };
  }

  const sessionToken = randomBytes(24).toString('hex');
  const sessionTokenHash = hashValue(sessionToken);
  const sessionExpiresAt = Date.now() + SESSION_TTL_MS;

  if (record.sessionTokenHash) {
    store.sessions.delete(record.sessionTokenHash);
  }

  record.sessionTokenHash = sessionTokenHash;
  record.sessionExpiresAt = sessionExpiresAt;
  store.sessions.set(sessionTokenHash, normalizedEmail);

  return {
    ok: true,
    sessionToken,
    sessionExpiresAt
  };
}

export function getSessionRecord(sessionToken) {
  if (!sessionToken) return null;

  const store = getStore();
  const sessionTokenHash = hashValue(sessionToken);
  const email = store.sessions.get(sessionTokenHash);
  if (!email) return null;

  const record = store.requests.get(email);
  if (!record || record.sessionTokenHash !== sessionTokenHash) {
    store.sessions.delete(sessionTokenHash);
    return null;
  }

  if (!record.sessionExpiresAt || Date.now() > record.sessionExpiresAt) {
    store.sessions.delete(sessionTokenHash);
    record.sessionTokenHash = null;
    record.sessionExpiresAt = null;
    return null;
  }

  return record;
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
