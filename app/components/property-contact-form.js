'use client';

import { useState, useTransition } from 'react';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  phoneNumber: '',
  message: '',
  agreed: false
};

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'お名前を入力してください。';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = '有効なメールアドレスを入力してください。';
  }

  if (form.phoneNumber.replace(/[^\d]/g, '').length < 8) {
    errors.phoneNumber = '有効な電話番号を入力してください。';
  }

  if (form.message.trim().length < 5) {
    errors.message = 'お問い合わせ内容を入力してください。';
  }

  if (!form.agreed) {
    errors.agreed = '同意が必要です。';
  }

  return errors;
}

export default function PropertyContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isPending, startTransition] = useTransition();

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      setStatus('');

      const response = await fetch('/api/contact/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || '送信に失敗しました。時間をおいて再度お試しください。');
        return;
      }

      setStatus('送信が完了しました。担当者より折り返しご連絡いたします。');
      setForm(INITIAL_FORM);
      setErrors({});
    });
  };

  return (
    <form className="property-contact-block__form" onSubmit={handleSubmit}>
      <label>
        お名前 *
        <input
          type="text"
          placeholder="山田 太郎"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          autoComplete="name"
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>
      <label>
        メールアドレス *
        <input
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          autoComplete="email"
        />
        {errors.email ? <small>{errors.email}</small> : null}
      </label>
      <label>
        会社名
        <input
          type="text"
          placeholder="株式会社○○"
          value={form.company}
          onChange={(event) => updateField('company', event.target.value)}
          autoComplete="organization"
        />
      </label>
      <label>
        電話番号 *
        <input
          type="tel"
          placeholder="090-1234-5678"
          value={form.phoneNumber}
          onChange={(event) => updateField('phoneNumber', event.target.value)}
          autoComplete="tel"
          inputMode="tel"
        />
        {errors.phoneNumber ? <small>{errors.phoneNumber}</small> : null}
      </label>
      <label>
        お問い合わせ内容 *
        <textarea
          placeholder="お問い合わせ内容をご記入ください"
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
        ></textarea>
        {errors.message ? <small>{errors.message}</small> : null}
      </label>
      <label className="property-contact-block__check">
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={(event) => updateField('agreed', event.target.checked)}
        />
        <span>私はプライバシーポリシーに同意します *</span>
      </label>
      {errors.agreed ? <small>{errors.agreed}</small> : null}
      {status ? <p className="property-contact-block__status">{status}</p> : null}
      <button type="submit" className="property-contact-block__submit" disabled={isPending}>
        {isPending ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
