export default function SiteHeader({ headerClassName = '', navItems = [], centerTitle = '', scrolledTitle = '' }) {
  const headerClass = ['header', headerClassName].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="jpn-badge">
          <button className="jpn-badge__label" id="langToggle" type="button" aria-label="Switch language">JA</button>
          <span className="jpn-badge__line"></span>
          <div className="jpn-badge__menu" id="langMenu">
            <button className="jpn-badge__menu-item" type="button" data-lang="ja">JA</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="en">EN</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="zh-hans">ZH-CN</button>
            <button className="jpn-badge__menu-item" type="button" data-lang="zh-hant">ZH-TW</button>
          </div>
        </div>
        {centerTitle ? <h1 className="center-block__title header__center-title">{centerTitle}</h1> : null}
        {scrolledTitle ? <p className="header__scrolled-title">{scrolledTitle}</p> : null}
      </header>
    </>
  );
}
