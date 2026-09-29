import { NextResponse } from 'next/server';
import { portal } from '../../../../lib/affiliate/server';
import { configured, REFERRAL_COOKIE } from '../../../../lib/affiliate/config.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  let referral = null;
  const referralCookie = request.cookies.get(REFERRAL_COOKIE)?.value;
  if (referralCookie && configured()) {
    try {
      referral = await portal().attribution(referralCookie);
    } catch (error) {
      // Keep the contact channel available if the referral database is unavailable.
      console.error('[whatsapp/start] referral unavailable', error?.code || error?.name || 'Error');
    }
  }
  const name = String(referral?.name || '').replace(/\s+/g, ' ').trim();
  const message = name
    ? `${name}様のご紹介でお問い合わせしました。\nTHE SILENCEについて詳しく伺いたいです。`
    : 'THE SILENCEについて詳しく伺いたいです。';
  const target = new URL('https://wa.me/818064569899');
  target.searchParams.set('text', message);
  const response = NextResponse.redirect(target, 302);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
