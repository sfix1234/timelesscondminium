'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('パスワードを入力してください。');
      return;
    }

    startTransition(async () => {
      setError('');
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || 'パスワードが正しくありません。');
        return;
      }

      router.replace('/');
    });
  };

  return (
    <div className="login-gate">
      <div className="login-gate__inner">
        <h1 className="login-gate__title">THE TIMELESS<br />CONDOMINIUM</h1>
        <p className="login-gate__subtitle">Exclusive Access</p>

        <form className="login-gate__form" onSubmit={handleSubmit}>
          <label className="login-gate__field">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter Password"
              autoComplete="current-password"
              autoFocus
            />
          </label>

          {error ? <p className="login-gate__error">{error}</p> : null}

          <button type="submit" className="login-gate__submit" disabled={isPending}>
            {isPending ? '認証中...' : 'ENTER'}
          </button>
        </form>
      </div>
    </div>
  );
}
