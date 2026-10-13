export const SITE_NAME = 'THE TIMELESS CONDOMINIUM';
export const SITE_URL = 'https://timelesscondominium.com';
export const SITE_TITLE = `${SITE_NAME}｜京都・上七軒「THE SILENCE」`;
export const SITE_DESCRIPTION = '京都・上七軒の邸宅「THE SILENCE」。隈研吾建築都市設計事務所のデザイン監修、匠の技、ARMANI / CASAの家具が織りなす空間をご紹介。日本の「美」を、千年先の世界へ紡ぎます。';

export function isSearchIndexingEnabled() {
  return process.env.VERCEL_ENV !== 'preview'
    && String(process.env.CLIENT_PREVIEW_ENABLED || '').trim().toLowerCase() !== 'true';
}
