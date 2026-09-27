import { notFound } from 'next/navigation';
import { configured, getConfig } from '../../../lib/affiliate/config.mjs';
import { equal } from '../../../lib/affiliate/crypto.mjs';
import { currentActor } from '../../../lib/affiliate/server';
import { Login, Dashboard, Unavailable } from '../../partners/portal-client';
export const dynamic = 'force-dynamic';
export const metadata = { title: '管理者専用 | TIMELESS', robots: { index: false, follow: false } };
export default async function ManagementPage({ params }) {
  const { key } = await params;
  if (!configured() || !equal(key, getConfig().adminPath)) notFound();
  let actor;
  try { actor = await currentActor(); } catch { return <Unavailable />; }
  return actor?.role === 'admin' ? <Dashboard user={actor} adminKey={key} /> : <Login adminKey={key} />;
}
