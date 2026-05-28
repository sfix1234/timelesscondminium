'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password.trim()) {
      setError('パスワードを入力してください。');
      return;
    }

    startTransition(async () => {
      setError('');
      const response = await fetch('/api/access/agent-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || '認証に失敗しました。');
        return;
      }
      router.push('/agent');
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', serif",
      padding: '2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '360px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: '#888',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}>
          Agent Access
        </p>
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.1rem',
          fontWeight: 400,
          letterSpacing: '0.25em',
          color: '#e8e0d4',
          textTransform: 'uppercase',
          marginBottom: '3rem'
        }}>
          THE SILENCE
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="パスワード"
              autoComplete="current-password"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #444',
                color: '#e8e0d4',
                fontSize: '1rem',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.1em',
                padding: '0.75rem 0',
                outline: 'none',
                textAlign: 'center'
              }}
            />
          </div>

          {error && (
            <p style={{
              color: '#c0796a',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              marginBottom: '1.25rem'
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid #555',
              color: '#c8b89a',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              padding: '0.9rem 2rem',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.6 : 1,
              transition: 'border-color 0.2s, color 0.2s'
            }}
          >
            {isPending ? '認証中...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
