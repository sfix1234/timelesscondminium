export default function SiteHeader({ headerClassName = '', navItems = [], centerTitle = '', scrolledTitle = '' }) {
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
          <button className="jpn-badge__label" id="langToggle" type="button" aria-label="Switch language">JPN</button>
          <span className="jpn-badge__line"></span>
          <div className="jpn-badge__menu" id="langMenu">
            <button className="jpn-badge__menu-item" type="button" data-lang="ja">JPN</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="en">ENG</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="koto">江東語</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="yue">広東語</button>
          </div>
        </div>
        {centerTitle ? <h1 className="center-block__title header__center-title">{centerTitle}</h1> : null}
        {scrolledTitle ? <p className="header__scrolled-title">{scrolledTitle}</p> : null}
        <div className="hamburger" role="button" aria-label="Menu">
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
      </header>
    </>
  );
}
