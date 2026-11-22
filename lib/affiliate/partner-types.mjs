export const PARTNER_TYPES = [
  { code: '101', label: '仲介業者', prefix: '100' },
  { code: '201', label: '個人紹介', prefix: '200' }
];

export const validPartnerType = value => PARTNER_TYPES.some(type => type.code === value);
export const partnerUrlPrefix = value => PARTNER_TYPES.find(type => type.code === value)?.prefix || '';
export const partnerTypeLabel = value => {
  const type = PARTNER_TYPES.find(type => type.code === value);
  return type ? `${type.label}（${type.prefix}x）` : '区分未設定';
};

export function partnerReferralSlug(type, suffix = '') {
  const prefix = partnerUrlPrefix(type);
  const extra = String(suffix || '').trim().toLowerCase();
  if (!prefix || !/^[a-z0-9]*$/.test(extra)) return '';
  return `${prefix}${extra || '1'}`;
}
