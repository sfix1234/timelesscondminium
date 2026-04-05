export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__logo">
          <img src="/assets/images/THE%20SILENCE_Logo_white.png" alt="THE SILENCE" className="site-footer__logo-image" />
        </div>

        <nav className="site-footer__nav" aria-label="Footer Navigation">
          <a href="/" className="site-footer__link" data-ja="HOME" data-en="HOME" data-zh-hans="首页" data-zh-hant="首頁">HOME</a>
          <a href="/property" className="site-footer__link" data-ja="PROPERTY" data-en="PROPERTY" data-zh-hans="房产" data-zh-hant="房產">PROPERTY</a>
          <a href="/privacy-policy" className="site-footer__link" data-ja="PRIVACY POLICY" data-en="PRIVACY POLICY" data-zh-hans="隐私政策" data-zh-hant="隱私政策">PRIVACY POLICY</a>
          <a href="/terms" className="site-footer__link" data-ja="TERMS" data-en="TERMS" data-zh-hans="条款" data-zh-hant="條款">TERMS</a>
        </nav>

        <div className="site-footer__divider"></div>

        <p className="site-footer__copyright">&copy; FIDO INC. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
