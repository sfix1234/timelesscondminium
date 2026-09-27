import { Activate } from '../portal-client';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'アカウント初期設定 | TIMELESS', robots: { index: false, follow: false } };
export default function ActivatePage() { return <Activate />; }
