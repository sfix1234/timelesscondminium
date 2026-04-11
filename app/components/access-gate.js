'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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

const WEALTH_OPTIONS = [
  { value: '500000000-1000000000', label: '5億円〜10億円 / $3.5M〜$6.5M' },
  { value: '1000000000-3000000000', label: '10億円〜30億円 / $6.5M〜$20M' },
  { value: '3000000000-5000000000', label: '30億円〜50億円 / $20M〜$35M' },
  { value: '5000000000-10000000000', label: '50億円〜100億円 / $35M〜$65M' },
  { value: '10000000000-50000000000', label: '100億円〜500億円 / $65M〜$335M' },
  { value: '50000000000-100000000000', label: '500億円〜1,000億円 / $335M〜$665M' },
  { value: '100000000000+', label: '1,000億円以上 / Over $665M' }
];

const TRANSLATIONS = {
  ja: {
    registrationText: 'この先の内容をご覧いただくには、ご登録が必要となります。\nプロジェクトの詳細や世界の匠たちが織りなす物語を、ぜひご体感ください。\nご登録は無料で承っております。',
    viewDetails: '詳細を確認する',
    eyebrow: 'Exclusive Registration',
    modalTitle: '匠の情報をご覧いただくには、以下の情報をご入力ください',
    name: 'お名前 *',
    email: 'メールアドレス *',
    phone: '電話番号 *',
    phoneAriaLabel: '国際番号',
    wealth: '資産額 *',
    wealthPlaceholder: '選択してください',
    note: 'フォーム送信後、アクセス情報を含む確認メールが届きます。',
    submit: '続ける',
    submitting: '送信中...',
    sendFailed: '送信に失敗しました。',
    sentConfirmation: '確認メールを送信しました。メールに記載された認証パスワードを入力してください。',
    verifyNote: '確認メールに記載された認証パスワードをご入力ください。',
    verifyLabel: '認証パスワード *',
    verifyFailed: '認証に失敗しました。',
    verifyEnterPassword: '認証パスワードを入力してください。',
    enterPassword: 'パスワードを入力してください。',
    back: '戻る',
    verifySubmit: '認証して閲覧する',
    verifying: '認証中...',
    devPassword: '開発環境用パスワード',
    close: '閉じる',
    errName: 'お名前を入力してください。',
    errEmail: '有効なメールアドレスを入力してください。',
    errPhone: '有効な電話番号を入力してください。',
    errWealth: '資産額を選択してください。',
  },
  en: {
    registrationText: 'Registration is required to view the content ahead.\nExplore the project details and the stories woven by master artisans from around the world.\nRegistration is free of charge.',
    viewDetails: 'View Details',
    eyebrow: 'Exclusive Registration',
    modalTitle: 'Please enter your information to view artisan details',
    name: 'Name *',
    email: 'Email Address *',
    phone: 'Phone Number *',
    phoneAriaLabel: 'Country code',
    wealth: 'Total Assets *',
    wealthPlaceholder: 'Please select',
    note: 'After submitting the form, you will receive a confirmation email with access information.',
    submit: 'Continue',
    submitting: 'Submitting...',
    sendFailed: 'Submission failed.',
    sentConfirmation: 'A confirmation email has been sent. Please enter the verification password included in the email.',
    verifyNote: 'Please enter the verification password from the confirmation email.',
    verifyLabel: 'Verification Password *',
    verifyFailed: 'Verification failed.',
    verifyEnterPassword: 'Please enter the verification password.',
    enterPassword: 'Please enter a password.',
    back: 'Back',
    verifySubmit: 'Verify & View',
    verifying: 'Verifying...',
    devPassword: 'Dev password',
    close: 'Close',
    errName: 'Please enter your name.',
    errEmail: 'Please enter a valid email address.',
    errPhone: 'Please enter a valid phone number.',
    errWealth: 'Please select your total assets.',
  },
  'zh-hans': {
    registrationText: '查看后续内容需要注册。\n请体验项目详情及世界匠人们编织的故事。\n注册免费。',
    viewDetails: '查看详情',
    eyebrow: 'Exclusive Registration',
    modalTitle: '请输入以下信息以查看匠人详情',
    name: '姓名 *',
    email: '电子邮箱 *',
    phone: '电话号码 *',
    phoneAriaLabel: '国家代码',
    wealth: '资产总额 *',
    wealthPlaceholder: '请选择',
    note: '提交表单后，您将收到包含访问信息的确认邮件。',
    submit: '继续',
    submitting: '提交中...',
    sendFailed: '提交失败。',
    sentConfirmation: '确认邮件已发送。请输入邮件中的验证密码。',
    verifyNote: '请输入确认邮件中的验证密码。',
    verifyLabel: '验证密码 *',
    verifyFailed: '验证失败。',
    verifyEnterPassword: '请输入验证密码。',
    enterPassword: '请输入密码。',
    back: '返回',
    verifySubmit: '验证并查看',
    verifying: '验证中...',
    devPassword: '开发环境密码',
    close: '关闭',
    errName: '请输入您的姓名。',
    errEmail: '请输入有效的电子邮箱。',
    errPhone: '请输入有效的电话号码。',
    errWealth: '请选择资产总额。',
  },
  'zh-hant': {
    registrationText: '查看後續內容需要註冊。\n請體驗項目詳情及世界匠人們編織的故事。\n註冊免費。',
    viewDetails: '查看詳情',
    eyebrow: 'Exclusive Registration',
    modalTitle: '請輸入以下資訊以查看匠人詳情',
    name: '姓名 *',
    email: '電子郵箱 *',
    phone: '電話號碼 *',
    phoneAriaLabel: '國家代碼',
    wealth: '資產總額 *',
    wealthPlaceholder: '請選擇',
    note: '提交表單後，您將收到包含訪問資訊的確認郵件。',
    submit: '繼續',
    submitting: '提交中...',
    sendFailed: '提交失敗。',
    sentConfirmation: '確認郵件已發送。請輸入郵件中的驗證密碼。',
    verifyNote: '請輸入確認郵件中的驗證密碼。',
    verifyLabel: '驗證密碼 *',
    verifyFailed: '驗證失敗。',
    verifyEnterPassword: '請輸入驗證密碼。',
    enterPassword: '請輸入密碼。',
    back: '返回',
    verifySubmit: '驗證並查看',
    verifying: '驗證中...',
    devPassword: '開發環境密碼',
    close: '關閉',
    errName: '請輸入您的姓名。',
    errEmail: '請輸入有效的電子郵箱。',
    errPhone: '請輸入有效的電話號碼。',
    errWealth: '請選擇資產總額。',
  },
};

function getT(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS['en'] || TRANSLATIONS['ja'];
}

const INITIAL_FORM = {
  name: '',
  email: '',
  countryCode: '+81',
  phoneNumber: '',
  wealthBand: ''
};

function validateClient(form, t) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = t.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = t.errEmail;
  if (form.phoneNumber.replace(/[^\d]/g, '').length < 8) errors.phoneNumber = t.errPhone;
  if (!form.wealthBand) errors.wealthBand = t.errWealth;
  return errors;
}

export default function AccessGate({ children, initialUnlocked = false, isClientPreview = false }) {
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
  const [lang, setLang] = useState('ja');

  const t = getT(lang);

  useEffect(() => {
    const updateLang = () => {
      const htmlLang = (document.documentElement.lang || 'ja').toLowerCase();
      const mapped = htmlLang.startsWith('zh-han') ? htmlLang.replace('-', '-') : htmlLang;
      setLang(mapped === 'zh-hans' || mapped === 'zh-hant' ? mapped : htmlLang.split('-')[0] === 'zh' ? 'zh-hans' : htmlLang);
    };
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const registered = document.cookie.split('; ').some((c) => c.startsWith('the_silence_registered=1'));
    if (registered) setIsUnlocked(true);
  }, []);

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
    const errors = validateClient(form, t);
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
        setRequestMessage(data.message || t.sendFailed);
        return;
      }

      setStep('verify');
      setPassword('');
      setRequestMessage(t.sentConfirmation);
      if (data.devPassword) {
        setDevPassword(data.devPassword);
      }
    });
  };

  const handleVerify = () => {
    if (!password.trim()) {
      setVerifyError(step === 'verify' ? t.verifyEnterPassword : t.enterPassword);
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
        setVerifyError(data.message || t.verifyFailed);
        return;
      }

      document.cookie = 'the_silence_registered=1; path=/; max-age=86400';
      setIsUnlocked(true);
      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      {!isUnlocked ? (
        <section id="contact" className="registration" data-visible-threshold="0" data-visible-root-margin="0px 0px -5% 0px">
          <div className="registration__overlay"></div>
          <div className="registration__inner">
            <div className="registration__gate-line" aria-hidden="true">
              <span className="registration__gate-lock">
                <span className="registration__gate-lock-shackle"></span>
                <span className="registration__gate-lock-body"></span>
              </span>
            </div>
            <h2 className="registration__title">REGISTRATION</h2>
                <p className="registration__text" style={{ whiteSpace: 'pre-line' }}>
                  {t.registrationText}
                </p>
                <button type="button" className="registration__button" onClick={openModal}>
                  {t.viewDetails}
                </button>
          </div>
        </section>
      ) : null}

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
            <button type="button" className="access-modal__close" onClick={closeModal} aria-label={t.close}>
              <span></span>
              <span></span>
            </button>

            <p className="access-modal__eyebrow">{t.eyebrow}</p>
                <h3 className="access-modal__title" id="accessModalTitle">
                  {t.modalTitle}
                </h3>

                {step === 'form' ? (
                  <>
                    <div className="access-modal__grid">
                      <label className="access-modal__field">
                        <span>{t.name}</span>
                        <input type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" />
                        {formErrors.name ? <small>{formErrors.name}</small> : null}
                      </label>
                      <label className="access-modal__field">
                        <span>{t.email}</span>
                        <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" />
                        {formErrors.email ? <small>{formErrors.email}</small> : null}
                      </label>
                      <div className="access-modal__field">
                        <span>{t.phone}</span>
                        <div className="access-modal__phone">
                          <select value={form.countryCode} onChange={(event) => updateField('countryCode', event.target.value)} aria-label={t.phoneAriaLabel}>
                            {COUNTRY_CODES.map((country) => (
                              <option key={country.value} value={country.value}>{country.label}</option>
                            ))}
                          </select>
                          <input type="tel" value={form.phoneNumber} onChange={(event) => updateField('phoneNumber', event.target.value)} autoComplete="tel-national" inputMode="tel" />
                        </div>
                        {formErrors.phoneNumber ? <small>{formErrors.phoneNumber}</small> : null}
                      </div>
                      <label className="access-modal__field">
                        <span>{t.wealth}</span>
                        <div className="access-modal__select-wrap">
                          <select value={form.wealthBand} onChange={(event) => updateField('wealthBand', event.target.value)}>
                            <option value="">{t.wealthPlaceholder}</option>
                            {WEALTH_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                        {formErrors.wealthBand ? <small>{formErrors.wealthBand}</small> : null}
                      </label>
                    </div>
                    <p className="access-modal__note">{t.note}</p>
                    {requestMessage ? <p className={`access-modal__message${Object.keys(formErrors).length ? ' is-error' : ''}`}>{requestMessage}</p> : null}
                    <button type="button" className="access-modal__submit" onClick={handleRequestAccess} disabled={isPending}>
                      {isPending ? t.submitting : t.submit}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="access-modal__note">{t.verifyNote}</p>
                    <label className="access-modal__field">
                      <span>{t.verifyLabel}</span>
                      <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="one-time-code" />
                    </label>
                    {verifyError ? <p className="access-modal__message is-error">{verifyError}</p> : null}
                    {devPassword ? <p className="access-modal__message">{t.devPassword}: <strong>{devPassword}</strong></p> : null}
                    <div className="access-modal__actions">
                      <button type="button" className="access-modal__ghost" onClick={() => setStep('form')}>{t.back}</button>
                      <button type="button" className="access-modal__submit" onClick={handleVerify} disabled={isPending}>
                        {isPending ? t.verifying : t.verifySubmit}
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
