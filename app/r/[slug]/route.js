import { NextResponse } from 'next/server';
import { portal } from '../../../lib/affiliate/server';
import { configured, getConfig, REFERRAL_COOKIE } from '../../../lib/affiliate/config.mjs';
import { signReferral } from '../../../lib/affiliate/crypto.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(request, context) {
  const unavailable = (status = 404) => new NextResponse(`<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>紹介リンクの確認</title><body style="margin:0;background:#f6f4ef;color:#242721;font-family:system-ui;display:grid;place-items:center;min-height:100svh"><main style="padding:32px;max-width:520px"><p>THE TIMELESS CONDOMINIUM</p><h1 style="font-size:24px">${status === 503 ? 'ただいま確認できません' : 'この紹介リンクは利用できません'}</h1><p>${status === 503 ? '時間をおいて、同じリンクから再度お試しください。' : 'URLをご確認いただくか、紹介担当者へお問い合わせください。'}</p><a href="/">サイトのトップへ</a></main></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
  if (!configured()) return unavailable(503);
  try {
    const { slug } = await context.params;
    const link = await portal().publicLink(slug);
    if (!link) return unavailable();
    const config = getConfig();
    const target = new URL('/', config.origin);
    target.searchParams.set('utm_source', link.code);
    target.searchParams.set('utm_medium', 'partner');
    target.searchParams.set('utm_campaign', 'property_lp');
    target.searchParams.set('utm_content', link.slug);
    const response = NextResponse.redirect(target, 302);
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    const options = { path: '/', sameSite: 'lax', secure: config.origin.startsWith('https://'), maxAge: 90 * 86400 };
    response.cookies.set(REFERRAL_COOKIE, signReferral(link.id, config.secret), { ...options, httpOnly: true });
    response.cookies.set('ttc_partner', link.code, options);
    return response;
  } catch (error) {
    console.error('[partner-link] unavailable', error?.code || error?.name || 'Error');
    return unavailable(503);
  }
}
