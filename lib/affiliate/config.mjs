export const SESSION_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-ttc_partner_session' : 'ttc_partner_session';
export const REFERRAL_COOKIE = 'ttc_referral';
export const LEGACY_CODES = new Set(['PT001', 'PT002', 'PT003', 'PT004', 'PT005', 'PT006', 'PT007', 'PT008', 'PT009', 'PT010', 'PT011', 'PT999']);
export function configured() {
  return Boolean(process.env.PARTNER_DATABASE_URL && process.env.PARTNER_SECRET?.length >= 43 && /^[a-zA-Z0-9_-]{24,80}$/.test(process.env.PARTNER_ADMIN_PATH || ''));
}
export function getConfig() {
  if (!configured()) throw new Error('Partner portal configuration is incomplete');
  const origin = new URL(process.env.PARTNER_ORIGIN || 'https://timelesscondominium.com').origin;
  if (process.env.NODE_ENV === 'production' && !origin.startsWith('https://')) throw new Error('Production requires HTTPS');
  if (!origin.startsWith('https://') && !['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) throw new Error('HTTPS is required');
  return { secret: process.env.PARTNER_SECRET, adminPath: process.env.PARTNER_ADMIN_PATH, origin };
}
