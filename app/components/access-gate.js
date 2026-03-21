'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const COUNTRY_CODES = [
  { value: '+81', label: 'JP +81' },
  { value: '+1', label: 'US +1' },
  { value: '+852', label: 'HK +852' },
  { value: '+86', label: 'CN +86' },
  { value: '+65', label: 'SG +65' },
  { value: '+971', label: 'UAE +971' }
];

const WEALTH_OPTIONS = [
  { value: '0-100000000', label: '1億円未満' },
  { value: '100000000-500000000', label: '1億円〜5億円' },
  { value: '500000000-1000000000', label: '5億円〜10億円' },
  { value: '1000000000-5000000000', label: '10億円〜50億円' },
  { value: '5000000000+', label: '50億円以上' }
];

const INITIAL_FORM = {
  name: '',
  email: '',
  countryCode: '+81',
  phoneNumber: '',
  wealthBand: ''
};

function validateClient(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'お名前を入力してください。';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = '有効なメールアドレスを入力してください。';
  if (form.phoneNumber.replace(/[^\d]/g, '').length < 8) errors.phoneNumber = '有効な電話番号を入力してください。';
  if (!form.wealthBand) errors.wealthBand = '資産額を選択してください。';
  return errors;
}

export default function AccessGate({ children, initialUnlocked = false }) {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('form');
  const [form, setForm] = useState(INITIAL_FORM);
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [requestMessage, setRequestMessage] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsUnlocked(initialUnlocked);
  }, [initialUnlocked]);

  const openModal = () => {
    setIsOpen(true);
    setStep('form');
    setFormErrors({});
    setVerifyError('');
    setRequestMessage('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setVerifyError('');
  };

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFormErrors((current) => ({ ...current, [key]: '' }));
  };

  const handleRequestAccess = () => {
    const errors = validateClient(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    startTransition(async () => {
      setRequestMessage('');
      setVerifyError('');
      setDevPassword('');

      const response = await fetch('/api/access/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setFormErrors(data.errors || {});
        setRequestMessage(data.message || '送信に失敗しました。');
        return;
      }

      setStep('verify');
      setPassword('');
      setRequestMessage('確認メールを送信しました。メールに記載された認証パスワードを入力してください。');
      if (data.devPassword) {
        setDevPassword(data.devPassword);
      }
    });
  };

  const handleVerify = () => {
    if (!password.trim()) {
      setVerifyError(step === 'verify' ? '認証パスワードを入力してください。' : 'パスワードを入力してください。');
      return;
    }

    startTransition(async () => {
      setVerifyError('');

      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setVerifyError(data.message || '認証に失敗しました。');
        return;
      }

      setIsUnlocked(true);
      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <section className="registration">
        <div className="registration__overlay"></div>
        <div className="registration__inner">
          <h2 className="registration__title">REGISTRATION</h2>
          <p className="registration__text">
            この先の内容をご覧いただくには、ご登録が必要となります。<br />
            プロジェクトの詳細や世界の匠たちが織りなす物語を、ぜひご体感ください。<br />
            ご登録は無料で承っております。
          </p>
          <button type="button" className="registration__button" onClick={openModal}>
            詳細を確認する
          </button>
        </div>
      </section>

      <div
        className={`access-gate__content ${isUnlocked ? 'is-unlocked' : 'is-locked'}`}
        aria-hidden={!isUnlocked}
      >
        {children}
      </div>

      {isOpen ? (
        <div className="access-modal" role="dialog" aria-modal="true" aria-labelledby="accessModalTitle">
          <div className="access-modal__backdrop" onClick={closeModal}></div>
          <div className="access-modal__panel">
            <button type="button" className="access-modal__close" onClick={closeModal} aria-label="閉じる">
              <span></span>
              <span></span>
            </button>

            <p className="access-modal__eyebrow">Exclusive Registration</p>
            <h3 className="access-modal__title" id="accessModalTitle">
              匠の情報をご覧いただくには、以下の情報をご入力ください
            </h3>

            {step === 'form' ? (
              <>
                <div className="access-modal__grid">
                  <label className="access-modal__field">
                    <span>お名前 *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      autoComplete="name"
                    />
                    {formErrors.name ? <small>{formErrors.name}</small> : null}
                  </label>

                  <label className="access-modal__field">
                    <span>メールアドレス *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      autoComplete="email"
                    />
                    {formErrors.email ? <small>{formErrors.email}</small> : null}
                  </label>

                  <div className="access-modal__field">
                    <span>電話番号 *</span>
                    <div className="access-modal__phone">
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
                        value={form.phoneNumber}
                        onChange={(event) => updateField('phoneNumber', event.target.value)}
                        autoComplete="tel-national"
                        inputMode="tel"
                      />
                    </div>
                    {formErrors.phoneNumber ? <small>{formErrors.phoneNumber}</small> : null}
                  </div>

                  <label className="access-modal__field">
                    <span>資産額 *</span>
                    <div className="access-modal__select-wrap">
                      <select
                        value={form.wealthBand}
                        onChange={(event) => updateField('wealthBand', event.target.value)}
                      >
                        <option value="">選択してください</option>
                        {WEALTH_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formErrors.wealthBand ? <small>{formErrors.wealthBand}</small> : null}
                  </label>
                </div>

                <p className="access-modal__note">フォーム送信後、アクセス情報を含む確認メールが届きます。</p>
                {requestMessage ? <p className={`access-modal__message${formErrors && Object.keys(formErrors).length ? ' is-error' : ''}`}>{requestMessage}</p> : null}

                <button type="button" className="access-modal__submit" onClick={handleRequestAccess} disabled={isPending}>
                  {isPending ? '送信中...' : '続ける'}
                </button>
              </>
            ) : (
              <>
                <p className="access-modal__note">
                  確認メールに記載された認証パスワードをご入力ください。
                </p>

                <label className="access-modal__field">
                  <span>認証パスワード *</span>
                  <input
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="one-time-code"
                  />
                </label>

                {verifyError ? <p className="access-modal__message is-error">{verifyError}</p> : null}
                {devPassword ? (
                  <p className="access-modal__message">
                    開発環境用パスワード: <strong>{devPassword}</strong>
                  </p>
                ) : null}

                <div className="access-modal__actions">
                  <button type="button" className="access-modal__ghost" onClick={() => setStep('form')}>
                    戻る
                  </button>
                  <button type="button" className="access-modal__submit" onClick={handleVerify} disabled={isPending}>
                    {isPending ? '認証中...' : '認証して閲覧する'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
