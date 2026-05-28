import { cookies } from 'next/headers';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../../lib/access-control';
import HomePage from '../page';
import AgentLogin from './agent-login';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Agent Access — THE SILENCE',
  robots: { index: false, follow: false }
};

export default async function AgentPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const isAuthenticated = Boolean(getSessionRecord(sessionToken));

  if (isAuthenticated) {
    return <HomePage />;
  }

  return <AgentLogin />;
}
