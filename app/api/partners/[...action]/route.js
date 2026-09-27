import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { portal } from '../../../../lib/affiliate/server';
import { configured, getConfig, SESSION_COOKIE } from '../../../../lib/affiliate/config.mjs';
import { PortalError } from '../../../../lib/affiliate/service.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const json = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
const errorResponse = error => {
  if (error instanceof PortalError) return json({ error: error.message }, error.status);
  // Never put database URLs, query parameters, invite tokens or passwords in logs.
  console.error('[partners] request failed', error?.code || error?.name || 'Error');
  return json({ error: '現在この操作を完了できません。時間をおいて再度お試しください。' }, 503);
};
export async function GET(request, context) {
  try {
    if (!configured()) return json({ error: '管理機能は現在準備中です。' }, 503);
    const { action } = await context.params;
    if (action.join('/') !== 'state') return json({ error: '見つかりません。' }, 404);
    const service = portal();
    const actor = await service.getActor(request.cookies.get(SESSION_COOKIE)?.value);
    if (!actor) return json({ error: 'ログインしてください。' }, 401);
    return json(await service.dashboard(actor));
  } catch (error) { return errorResponse(error); }
}
export async function POST(request, context) {
  try {
    if (!configured()) return json({ error: '管理機能は現在準備中です。' }, 503);
    // All state-changing operations require the canonical origin, including login.
    const config = getConfig();
    if (request.headers.get('origin') !== config.origin || request.headers.get('sec-fetch-site') === 'cross-site') return json({ error: 'このリクエストは許可されていません。' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'JSON形式で送信してください。' }, 415);
    if (Number(request.headers.get('content-length') || 0) > 8192) return json({ error: '送信内容が長すぎます。' }, 413);
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 8192) return json({ error: '送信内容が長すぎます。' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: '送信内容を確認してください。' }, 400); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: '送信内容を確認してください。' }, 400);
    const { action } = await context.params;
    const path = action.join('/');
    const service = portal();
    const value = request.cookies.get(SESSION_COOKIE)?.value;
    const ip = process.env.VERCEL ? (request.headers.get('x-real-ip') || 'unknown') : 'local';
    let result;
    if (path === 'login') result = await service.login(body, ip);
    else if (path === 'invite') {
      result = await service.inviteInfo(String(body.token || ''), ip);
      if (result.setup) result.setup.qr = await QRCode.toDataURL(result.setup.uri, { width: 220, margin: 2 });
    } else if (path === 'activate') result = await service.activate(body, ip);
    else if (path === 'logout') { await service.logout(value); result = { ok: true }; }
    else {
      const actor = await service.getActor(value);
      if (!actor) return json({ error: 'ログインしてください。' }, 401);
      await service.limit('mutation', actor.id, 80, 60);
      if (path === 'users') result = await service.createUser(actor, body);
      else if (action.length === 2 && action[0] === 'users') result = await service.updateUser(actor, action[1], body);
      else if (action.length === 3 && action[0] === 'users' && action[2] === 'invite') result = await service.reissue(actor, action[1]);
      else if (path === 'links') result = await service.createLink(actor, body);
      else if (action.length === 2 && action[0] === 'links') result = await service.updateLink(actor, action[1], body);
      else return json({ error: '見つかりません。' }, 404);
    }
    const { session, ...publicResult } = result;
    const response = json(publicResult);
    if (session || path === 'logout') response.cookies.set(SESSION_COOKIE, session?.value || '', {
      httpOnly: true, secure: config.origin.startsWith('https://'), sameSite: 'strict', path: '/', maxAge: session?.seconds || 0
    });
    return response;
  } catch (error) { return errorResponse(error); }
}
