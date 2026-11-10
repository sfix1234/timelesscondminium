// Run against the isolated preview: node tests/affiliate-http.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { slugWithSuffix } from '../lib/affiliate/slug.mjs';
const base = 'http://127.0.0.1:3100';
const post = (path, body, cookie = '', origin = base) => fetch(`${base}/api/partners/${path}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, Cookie: cookie }, body: JSON.stringify(body)
});
const unauthorized = await fetch(`${base}/api/partners/state`);
assert.equal(unauthorized.status, 401);
assert.match(unauthorized.headers.get('cache-control'), /no-store/);
const csrf = await post('login', { email: 'yamada@example.test', password: 'Preview-only-account-2026!' }, '', 'https://attacker.example');
assert.equal(csrf.status, 403);
const login = await post('login', { email: 'yamada@example.test', password: 'Preview-only-account-2026!' });
assert.equal(login.status, 200);
assert.match(login.headers.get('set-cookie'), /HttpOnly/i);
assert.match(login.headers.get('set-cookie'), /SameSite=Strict/i);
const cookie = login.headers.getSetCookie().map(s => s.split(';')[0]).join('; ');
const state = await (await fetch(`${base}/api/partners/state`, { headers: { Cookie: cookie } })).json();
assert.equal(state.user.email, 'yamada@example.test');
assert.deepEqual(state.users, []);
assert.ok(state.links.every(l => l.user_id === state.user.id));
assert.equal((await post('users', { name: 'Blocked', email: 'blocked@example.test' }, cookie)).status, 403);
assert.equal((await post('links', { slug: 'csrf-blocked', label: 'blocked' }, cookie, 'https://attacker.example')).status, 403);
assert.equal((await post('links', { slug: 'yamada-kyoto', label: 'duplicate' }, cookie)).status, 409);
const referral = await fetch(`${base}/r/yamada-kyoto`, { redirect: 'manual' });
assert.equal(referral.status, 302);
assert.match(referral.headers.get('location'), /utm_medium=partner/);
assert.match(referral.headers.getSetCookie().find(s => s.startsWith('ttc_referral=')), /; HttpOnly;/);
assert.match(referral.headers.get('cache-control'), /no-store/);
const namedReferral = await fetch(`${base}/r/yamada_taro`, { redirect: 'manual' });
assert.equal(namedReferral.status, 302);
assert.equal(new URL(namedReferral.headers.get('location')).searchParams.get('utm_content'), 'yamada_taro');
assert.match(namedReferral.headers.getSetCookie().find(s => s.startsWith('ttc_referral=')), /; HttpOnly;/);
const referralCookie = namedReferral.headers.getSetCookie().find(s => s.startsWith('ttc_referral=')).split(';')[0];
const whatsapp = async (referral = '', query = '') => {
  const response = await fetch(`${base}/api/whatsapp/start${query}`, { redirect: 'manual', headers: { Cookie: referral } });
  assert.equal(response.status, 302);
  assert.match(response.headers.get('cache-control'), /private, no-store/);
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  const target = new URL(response.headers.get('location'));
  assert.equal(target.origin, 'https://wa.me');
  assert.equal(target.pathname, '/818064569899');
  return target.searchParams.get('text');
};
assert.equal(await whatsapp(referralCookie), '山田 太郎様のご紹介でお問い合わせしました。\nTHE SILENCEについて詳しく伺いたいです。');
const satoReferral = await fetch(`${base}/r/sato_hanako`, { redirect: 'manual' });
const satoCookie = satoReferral.headers.getSetCookie().find(s => s.startsWith('ttc_referral=')).split(';')[0];
assert.match(await whatsapp(satoCookie), /^佐藤 花子様のご紹介/);
assert.match(await whatsapp(referralCookie, '?name=Fake&slug=sato_hanako'), /^山田 太郎様のご紹介/);
assert.equal(await whatsapp(), 'THE SILENCEについて詳しく伺いたいです。');
assert.equal(await whatsapp('ttc_referral=invalid'), 'THE SILENCEについて詳しく伺いたいです。');
// Pass the preview credentials path printed by `npm run preview:partners`
// to also exercise administrator issuance without touching production data.
if (process.argv[2]) {
  const credentials = JSON.parse(await readFile(process.argv[2], 'utf8'));
  const adminKey = new URL(credentials.adminUrl).pathname.split('/').pop();
  const adminLogin = await post('login', { email: credentials.adminEmail, password: credentials.password, adminKey, code: credentials.recoveryCodes[0] });
  assert.equal(adminLogin.status, 200);
  const adminCookie = adminLogin.headers.getSetCookie().map(s => s.split(';')[0]).join('; ');
  const slug = slugWithSuffix(`http_urls_${Date.now()}`, 'ABC123');
  const created = await post('users', { name: '追加発行テスト担当者', email: `${slug}@example.test`, slug }, adminCookie);
  assert.equal(created.status, 200);
  const account = await created.json();
  assert.equal((await post(`users/${account.user.id}/referral`, { slug }, cookie)).status, 403);
  assert.equal((await post(`users/${account.user.id}/referral`, { slug }, adminCookie, 'https://attacker.example')).status, 403);
  for (const suffix of ['', '_2', '_3']) {
    if (suffix) {
      const issued = await post(`users/${account.user.id}/referral`, { slug, label: 'HTTP追加発行' }, adminCookie);
      assert.equal(issued.status, 200);
      const result = await issued.json();
      assert.equal(result.link.slug, `${slug}${suffix}`);
      assert.equal(result.link.user_id, account.user.id);
      assert.equal(result.referralUrl, `${base}/r/${slug}${suffix}`);
    }
    const response = await fetch(`${base}/r/${slug}${suffix}`, { redirect: 'manual' });
    assert.equal(response.status, 302);
    assert.equal(new URL(response.headers.get('location')).searchParams.get('utm_source'), account.user.code);
    const signedCookie = response.headers.getSetCookie().find(s => s.startsWith('ttc_referral=')).split(';')[0];
    assert.match(await whatsapp(signedCookie), /^追加発行テスト担当者様のご紹介/);
  }
  const adminState = await (await fetch(`${base}/api/partners/state`, { headers: { Cookie: adminCookie } })).json();
  const owner = adminState.users.find(u => u.id === account.user.id);
  assert.equal(owner.link_count, 3);
  assert.equal(owner.primary_slug, slug);
  assert.equal(owner.activated, false);
  const adminPage = await fetch(credentials.adminUrl, { headers: { Cookie: adminCookie } });
  assert.equal(adminPage.status, 200);
  assert.match(await adminPage.text(), /紹介パートナー管理/);
  await post('logout', {}, adminCookie);
  console.log('PASS: administrator repeatedly issues URLs, preserves the primary URL, rejects other partners and CSRF, and attributes every URL before login setup.');
}
const primaryLink = state.links.find(l => l.slug === 'yamada_taro');
assert.equal((await post(`links/${primaryLink.id}`, { active: false }, cookie)).status, 200);
assert.equal(await whatsapp(referralCookie), 'THE SILENCEについて詳しく伺いたいです。');
assert.equal((await post(`links/${primaryLink.id}`, { active: true }, cookie)).status, 200);
assert.equal((await fetch(`${base}/r/not-a-real-link`, { redirect: 'manual' })).status, 404);
const page = await fetch(`${base}/partners`);
assert.equal(page.headers.get('referrer-policy'), 'no-referrer');
assert.match(page.headers.get('content-security-policy'), /frame-ancestors 'none'/);
const html = await page.text();
assert.ok(!html.includes('googletagmanager.com'));
assert.ok(!html.includes('COOKIE CONSENT'));
assert.ok(!html.includes('local-preview-admin-0123456789'));
assert.equal((await fetch(`${base}/management/not-a-valid-key`)).status, 404);
const legacy = await fetch(`${base}/?utm_source=PT001&utm_medium=partner`);
assert.match(legacy.headers.get('set-cookie'), /ttc_referral=;/);
assert.match(await legacy.text(), /href="\/api\/whatsapp\/start"/);
await post('logout', {}, cookie);
assert.equal((await fetch(`${base}/api/partners/state`, { headers: { Cookie: cookie } })).status, 401);
console.log('PASS: HTTP auth, CSRF, ownership, duplicate names, signed referral redirect, personalized WhatsApp drafts, private headers, legacy attribution, logout.');
