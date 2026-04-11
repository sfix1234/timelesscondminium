'use client';

import { useEffect, useMemo, useState } from 'react';

const CONSENT_COOKIE_NAME = 'ttc_cookie_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

const COPY = {
  ja: {
    title: 'COOKIE CONSENT',
    description: '本サイトでは、アクセス解析とサイト体験向上のために Cookie を使用します。詳細は Privacy Policy をご確認ください。',
    accept: '同意する',
    decline: '拒否する',
    privacy: 'Privacy Policy'
  },
  en: {
    title: 'COOKIE CONSENT',
    description: 'We use cookies to analyze traffic and improve your experience on this website. Please review our Privacy Policy for details.',
    accept: 'Accept',
    decline: 'Decline',
    privacy: 'Privacy Policy'
  },
  'zh-hans': {
    title: 'COOKIE CONSENT',
    description: '本网站使用 Cookie 以分析访问情况并提升浏览体验。详情请参阅隐私政策。',
    accept: '同意',
    decline: '拒绝',
    privacy: '隐私政策'
  },
  'zh-hant': {
    title: 'COOKIE CONSENT',
    description: '本網站使用 Cookie 以分析造訪情況並提升瀏覽體驗。詳情請參閱隱私政策。',
    accept: '同意',
    decline: '拒絕',
    privacy: '隱私政策'
  }
};

function readConsentCookie() {
  if (typeof document === 'undefined') return '';

  const cookie = document.cookie
    .split('; ')
    .find((value) => value.startsWith(`${CONSENT_COOKIE_NAME}=`));

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : '';
}

function writeConsentCookie(value) {
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

export default function CookieConsentBanner() {
  const [lang, setLang] = useState('ja');
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const updateLang = () => setLang((document.documentElement.lang || 'ja').toLowerCase());
    updateLang();

    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setConsent(readConsentCookie() || '');
  }, []);

  const copy = useMemo(() => COPY[lang] || COPY.ja, [lang]);

  if (consent === null || consent) {
    return null;
  }

  const handleConsent = (value) => {
    writeConsentCookie(value);
    setConsent(value);

    if (value === 'accepted' && typeof window !== 'undefined' && typeof window.__loadGTM === 'function') {
      window.__loadGTM();
    }
  };

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-labelledby="cookieConsentTitle">
      <div className="cookie-consent__inner">
        <div className="cookie-consent__copy">
          <p className="cookie-consent__title" id="cookieConsentTitle">{copy.title}</p>
          <p className="cookie-consent__text">
            {copy.description}{' '}
            <a href="/privacy-policy" className="cookie-consent__link">
              {copy.privacy}
            </a>
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__button cookie-consent__button--ghost" onClick={() => handleConsent('rejected')}>
            {copy.decline}
          </button>
          <button type="button" className="cookie-consent__button cookie-consent__button--solid" onClick={() => handleConsent('accepted')}>
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
