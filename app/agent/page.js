import AgentLogin from './agent-login';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Agent Access — THE SILENCE',
  robots: { index: false, follow: false }
};

export default function AgentPage() {
  return <AgentLogin />;
}
