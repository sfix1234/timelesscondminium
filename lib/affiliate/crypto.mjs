import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual, createCipheriv, createDecipheriv } from 'node:crypto';
import { promisify } from 'node:util';
import * as OTPAuth from 'otpauth';

const derive = promisify(scrypt);
const COST = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
export const token = () => randomBytes(32).toString('base64url');
export const digest = value => createHash('sha256').update(String(value)).digest('hex');
export const mac = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');
export function equal(a, b) {
  const x = Buffer.from(String(a)); const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await derive(password, salt, 64, COST);
  return `scrypt-v1:${salt}:${hash.toString('hex')}`;
}
export async function checkPassword(password, stored) {
  const [version, salt, hash] = String(stored || '').split(':');
  // Run the same expensive operation for an unknown account as for a real one.
  const candidate = await derive(password, salt || '00000000000000000000000000000000', 64, COST);
  return version === 'scrypt-v1' && equal(candidate.toString('hex'), hash || '');
}
const encryptionKey = secret => createHash('sha256').update(`affiliate:mfa:${secret}`).digest();
export function encrypt(value, secret) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(secret), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), encrypted].map(b => b.toString('base64url')).join('.');
}
export function decrypt(value, secret) {
  const [iv, tag, encrypted] = value.split('.').map(p => Buffer.from(p, 'base64url'));
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(secret), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
export const newMfaSecret = () => new OTPAuth.Secret({ size: 20 }).base32;
export const totp = (secret, email = '') => new OTPAuth.TOTP({ issuer: 'TIMELESS Partners', label: email, algorithm: 'SHA1', digits: 6, period: 30, secret });
export function verifyTotp(secret, code) {
  if (!/^\d{6}$/.test(code)) return null;
  const now = Date.now();
  const delta = totp(secret).validate({ token: code, window: 1, timestamp: now });
  return delta === null ? null : Math.floor(now / 30000) + delta;
}
export function signReferral(linkId, secret, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ linkId, exp: now + 90 * 86400000 })).toString('base64url');
  return `${payload}.${mac(`referral:${payload}`, secret)}`;
}
export function readReferral(value, secret) {
  try {
    const parts = String(value || '').split('.');
    if (parts.length !== 2 || !equal(parts[1], mac(`referral:${parts[0]}`, secret))) return null;
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    return /^[0-9a-f-]{36}$/.test(data.linkId) && Number.isFinite(data.exp) && data.exp > Date.now() ? data : null;
  } catch { return null; }
}
