'use client';

import { useState, useTransition } from 'react';

const COUNTRY_CODES = [
  { value: '+81', label: 'JP +81' },
  { value: '+1', label: 'US/CA +1' },
  { value: '+44', label: 'UK +44' },
  { value: '+33', label: 'FR +33' },
  { value: '+49', label: 'DE +49' },
  { value: '+39', label: 'IT +39' },
  { value: '+34', label: 'ES +34' },
  { value: '+41', label: 'CH +41' },
  { value: '+31', label: 'NL +31' },
  { value: '+46', label: 'SE +46' },
  { value: '+47', label: 'NO +47' },
  { value: '+45', label: 'DK +45' },
  { value: '+358', label: 'FI +358' },
  { value: '+43', label: 'AT +43' },
  { value: '+32', label: 'BE +32' },
  { value: '+351', label: 'PT +351' },
  { value: '+353', label: 'IE +353' },
  { value: '+48', label: 'PL +48' },
  { value: '+420', label: 'CZ +420' },
  { value: '+36', label: 'HU +36' },
  { value: '+30', label: 'GR +30' },
  { value: '+7', label: 'RU +7' },
  { value: '+380', label: 'UA +380' },
  { value: '+90', label: 'TR +90' },
  { value: '+86', label: 'CN +86' },
  { value: '+852', label: 'HK +852' },
  { value: '+853', label: 'MO +853' },
  { value: '+886', label: 'TW +886' },
  { value: '+82', label: 'KR +82' },
  { value: '+65', label: 'SG +65' },
  { value: '+60', label: 'MY +60' },
  { value: '+66', label: 'TH +66' },
  { value: '+84', label: 'VN +84' },
  { value: '+62', label: 'ID +62' },
  { value: '+63', label: 'PH +63' },
  { value: '+91', label: 'IN +91' },
  { value: '+92', label: 'PK +92' },
  { value: '+880', label: 'BD +880' },
  { value: '+94', label: 'LK +94' },
  { value: '+977', label: 'NP +977' },
  { value: '+61', label: 'AU +61' },
  { value: '+64', label: 'NZ +64' },
  { value: '+971', label: 'UAE +971' },
  { value: '+966', label: 'SA +966' },
  { value: '+974', label: 'QA +974' },
  { value: '+973', label: 'BH +973' },
  { value: '+968', label: 'OM +968' },
  { value: '+965', label: 'KW +965' },
  { value: '+972', label: 'IL +972' },
  { value: '+20', label: 'EG +20' },
  { value: '+27', label: 'ZA +27' },
  { value: '+234', label: 'NG +234' },
  { value: '+254', label: 'KE +254' },
  { value: '+212', label: 'MA +212' },
  { value: '+55', label: 'BR +55' },
  { value: '+52', label: 'MX +52' },
  { value: '+54', label: 'AR +54' },
  { value: '+56', label: 'CL +56' },
  { value: '+57', label: 'CO +57' },
  { value: '+51', label: 'PE +51' },
  { value: '+507', label: 'PA +507' },
  { value: '+506', label: 'CR +506' },
  { value: '+855', label: 'KH +855' },
  { value: '+856', label: 'LA +856' },
  { value: '+95', label: 'MM +95' },
  { value: '+976', label: 'MN +976' },
  { value: '+993', label: 'TM +993' },
  { value: '+998', label: 'UZ +998' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  countryCode: '+81',
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
      <div className="property-contact-block__field">
        電話番号 *
        <div className="property-contact-block__phone">
          <select
            value={form.countryCode}
            onChange={(event) => updateField('countryCode', event.target.value)}
            aria-label="国際番号"
          >
            {COUNTRY_CODES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="090-1234-5678"
            value={form.phoneNumber}
            onChange={(event) => updateField('phoneNumber', event.target.value)}
            autoComplete="tel-national"
            inputMode="tel"
          />
        </div>
        {errors.phoneNumber ? <small>{errors.phoneNumber}</small> : null}
      </div>
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
