import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../../lib/access-control';
import AgentLogin from './agent-login';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Agent Access — THE SILENCE',
  robots: { index: false, follow: false }
};

export default async function AgentPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const session = getSessionRecord(sessionToken);

  if (session) {
    redirect('/');
  }

  return <AgentLogin />;
}
