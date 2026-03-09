export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__nav" aria-label="Footer Navigation">
          <a href="/" className="site-footer__link">HOME</a>
          <a href="/property" className="site-footer__link">PROPERTY</a>
          <button className="site-footer__link site-footer__link--button" type="button">PRIVACY POLICY</button>
        </nav>

        <div className="site-footer__brand">
          <img src="/assets/images/THE%20SILENCE_logo-color2.png" alt="THE SILENCE" className="site-footer__furnished-logo" />
        </div>
      </div>
    </footer>
  );
}
