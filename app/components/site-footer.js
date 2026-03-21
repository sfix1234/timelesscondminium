export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__nav" aria-label="Footer Navigation">
          <a href="/" className="site-footer__link">HOME</a>
          <a href="/property" className="site-footer__link">PROPERTY</a>
          <a href="/privacy-policy" className="site-footer__link">PRIVACY POLICY</a>
          <a href="/terms" className="site-footer__link">TERMS</a>
        </nav>

        <div className="site-footer__brand">
          <img src="/assets/images/THE%20SILENCE_logo_black.png" alt="THE SILENCE" className="site-footer__furnished-logo" />
        </div>
      </div>
    </footer>
  );
}
