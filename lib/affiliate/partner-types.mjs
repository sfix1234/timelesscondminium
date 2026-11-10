export const PARTNER_TYPES = [
  { code: '101', label: '仲介業者' },
  { code: '201', label: '個人' }
];

export const validPartnerType = value => PARTNER_TYPES.some(type => type.code === value);
export const partnerTypeLabel = value => {
  const type = PARTNER_TYPES.find(type => type.code === value);
  return type ? `${type.label}（${type.code}）` : '区分未設定';
};
