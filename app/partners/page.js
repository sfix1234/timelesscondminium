import { configured } from '../../lib/affiliate/config.mjs';
import { currentActor } from '../../lib/affiliate/server';
import { Login, Dashboard, Unavailable } from './portal-client';
export const dynamic = 'force-dynamic';
export const metadata = { title: '担当者ログイン・紹介リンク管理 | TIMELESS', robots: { index: false, follow: false } };
export default async function PartnersPage() {
  if (!configured()) return <Unavailable />;
  let actor;
  try { actor = await currentActor(); } catch { return <Unavailable />; }
  return actor?.role === 'partner' ? <Dashboard user={actor} /> : <Login />;
}
