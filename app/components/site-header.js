export default function SiteHeader({ headerClassName = '', navItems = [], centerTitle = '' }) {
  const headerClass = ['header', headerClassName].filter(Boolean).join(' ');

  return (
    <>
      <nav className="nav-overlay" id="navOverlay">
        <div className="nav-overlay__bg"></div>
        <div className="nav-overlay__inner">
          <div className="nav-overlay__accent"></div>
          <ul className="nav-overlay__list">
            {navItems.map((item) => (
              <li className="nav-overlay__item" key={`${item.labelJa}-${item.labelEn ?? item.labelJa}`}>
                <button
                  className="nav-overlay__link"
                  type="button"
                  data-target={item.target}
                  data-ja={item.labelJa}
                  data-en={item.labelEn}
                >
                  {item.labelJa}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-overlay__footer">
            <div className="nav-overlay__footer-line"></div>
            <span className="nav-overlay__footer-text">The Timeless Condominium</span>
          </div>
        </div>
      </nav>

      <header className={headerClass}>
        <div className="jpn-badge">
          <span className="jpn-badge__label" aria-label="Language">JPN</span>
          <span className="jpn-badge__line"></span>
        </div>
        {centerTitle ? <h1 className="center-block__title header__center-title">{centerTitle}</h1> : null}
        <div className="hamburger" role="button" aria-label="Menu">
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
      </header>
    </>
  );
}
