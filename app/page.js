import SiteBehavior from './components/site-behavior';

export default function HomePage() {
  return (
    <>
<nav className="nav-overlay" id="navOverlay">
    <div className="nav-overlay__bg"></div>
    <div className="nav-overlay__inner">
      <div className="nav-overlay__accent"></div>
      <ul className="nav-overlay__list">
        <li className="nav-overlay__item"><a href="#" className="nav-overlay__link">Concept</a></li>
        <li className="nav-overlay__item"><a href="#" className="nav-overlay__link">Design</a></li>
        <li className="nav-overlay__item"><a href="#" className="nav-overlay__link">Location</a></li>
        <li className="nav-overlay__item"><a href="#" className="nav-overlay__link">Plan</a></li>
        <li className="nav-overlay__item"><a href="#" className="nav-overlay__link">Access</a></li>
      </ul>
      <div className="nav-overlay__footer">
        <div className="nav-overlay__footer-line"></div>
        <span className="nav-overlay__footer-text">The Timeless Condominium</span>
      </div>
    </div>
  </nav>


  <section className="hero">
    <div className="hero__bg"></div>
    <div className="hero__overlay"></div>
    <div className="hero__content">
      <header className="header">
        <div className="jpn-badge">
          <span className="jpn-badge__label">JPN</span>
          <span className="jpn-badge__line"></span>
        </div>
        <div className="header__logo">
          <span className="header__logo-main">The Timeless</span>
          <span className="header__logo-sub">Condominium</span>
        </div>
        <div className="hamburger" role="button" aria-label="Menu">
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
      </header>
      <div className="center-block">
        <h1 className="center-block__title">
          The Timeless<br />Condominium
        </h1>
        <span className="center-block__number">01</span>
        <span className="center-block__line"></span>
      </div>
      <div className="bottom-logo">
        <div className="bottom-logo__main">The Timeless</div>
        <div className="bottom-logo__sub">Condominium</div>
      </div>
    </div>
  </section>


  <section className="story">
    <div className="story__bg"></div>
    <div className="story__overlay"></div>
    <div className="story__content">
      <div className="story__vertical-text">
        <span className="story__vertical-col">日本の素晴らしき物語を</span>
        <span className="story__vertical-col">一〇〇年後の世界に紡ぐ</span>
      </div>
      <div className="story__brand">
        <span className="story__brand-name">The Timeless</span>
        <span className="story__brand-condo">Condominium</span>
        <div className="story__brand-sub">
          <span className="story__brand-furnished">Furnished by</span>
          <span className="story__brand-armani">Armani/Casa</span>
        </div>
        <div className="story__divider"></div>
      </div>
    </div>
  </section>


  <section className="craftsmen">
    <div className="craftsmen__line-top"></div>
    <p className="craftsmen__heading">世界初、匠の技が結集した邸宅。</p>
    <ul className="craftsmen__list">
      <li className="craftsmen__name">Kuma Kengo</li>
      <li className="craftsmen__name">Kongo-Gumi</li>
      <li className="craftsmen__name">Armani</li>
      <li className="craftsmen__name">Nakamura Sotoji</li>
      <li className="craftsmen__name">Eri Koukei</li>
      <li className="craftsmen__name">Oniwa Ueji</li>
    </ul>
    <div className="craftsmen__line-bottom"></div>
  </section>

  <section className="craftsmen-photo">
    <figure className="craftsmen-photo__frame">
      <img src="/assets/images/craftsmen-group.jpg" alt="匠たちの集合写真" className="craftsmen-photo__img" />
    </figure>
  </section>


  <section className="stage">
    <div className="stage__inner">
      <h2 className="stage__title">THE STAGE</h2>
      <div className="stage__row">
        <p className="stage__lead">舞台は、京文化発祥の地<br />上七軒。</p>
        <nav className="stage__tabs">
          <button className="stage__tab is-active" data-tab="0">京都</button>
          <button className="stage__tab" data-tab="1">北野天満宮</button>
          <button className="stage__tab" data-tab="2">上七軒 - 旧長谷川邸</button>
          <button className="stage__tab" data-tab="3">エピソード</button>
        </nav>
      </div>
      <div className="stage__visual">
        <div className="stage__slide is-active" data-slide="0">
          <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" alt="京都" />
          <span className="stage__slide-label">京都</span>
        </div>
        <div className="stage__slide" data-slide="1">
          <img src="https://images.unsplash.com/photo-1578469645742-46cae010e5d6?auto=format&fit=crop&w=1200&q=80" alt="北野天満宮" />
          <span className="stage__slide-label">北野天満宮</span>
        </div>
        <div className="stage__slide" data-slide="2">
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80" alt="上七軒 - 旧長谷川邸" />
          <span className="stage__slide-label">上七軒 - 旧長谷川邸</span>
        </div>
        <div className="stage__slide" data-slide="3">
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80" alt="エピソード" />
          <span className="stage__slide-label">エピソード</span>
        </div>
      </div>
      <div className="stage__info">
        <div className="stage__info-block is-active" data-info="0">
          <h3 className="stage__info-title">KYOTO</h3>
          <p className="stage__info-text">千年の都・京都。日本文化の精髄がここに息づく。古の都が紡いできた美意識と伝統は、時を超えて今なお色褪せることなく、訪れる人々の心を捉え続けている。</p>
        </div>
        <div className="stage__info-block" data-info="1">
          <h3 className="stage__info-title">KITANO TENMANGU</h3>
          <p className="stage__info-text">学問の神・菅原道真公を祀る北野天満宮。天暦元年（947年）の創建以来、千年以上の歴史を誇る。梅と紅葉の名所としても名高く、四季折々の美しさが訪れる人を魅了する。</p>
        </div>
        <div className="stage__info-block" data-info="2">
          <h3 className="stage__info-title">KAMISHICHIKEN</h3>
          <p className="stage__info-text">京都最古の花街・上七軒。北野天満宮の東門前に広がるこの地に、かつて長谷川家の邸宅が佇んでいた。歴史と文化が交差するこの場所に、新たな物語が紡がれる。</p>
        </div>
        <div className="stage__info-block" data-info="3">
          <h3 className="stage__info-title">EPISODE</h3>
          <p className="stage__info-text">千利休が茶の湯を大成し、出雲阿国が歌舞伎を創始したこの地。日本文化の転換点となった数々の物語が、上七軒という舞台の上で生まれてきた。</p>
        </div>
      </div>
      <div className="stage__more">
        <a href="#" className="stage__more-link">VIEW MORE<span className="stage__more-arrow">→</span></a>
      </div>
    </div>
  </section>

  <section className="stage-photo">
    <figure className="stage-photo__frame">
      <p className="stage-photo__text">千年の美意識を、<br />現代に。</p>
      <img src="/assets/images/stage-message.jpeg" alt="千年の美意識を表現した情景" className="stage-photo__image" />
    </figure>
  </section>

  <section className="registration">
    <div className="registration__overlay"></div>
    <div className="registration__inner">
      <h2 className="registration__title">REGISTRATION</h2>
      <p className="registration__text">
        この先の内容をご覧いただくには、ご登録が必要となります。<br />
        プロジェクトの詳細や世界の匠たちが織りなす物語を、ぜひご体感ください。<br />
        ご登録は無料で承っております。
      </p>
      <a href="/property" className="registration__button">詳細を確認する</a>
    </div>
  </section>

  <section className="project-vision">
    <div className="project-vision__inner">
      <h2 className="project-vision__title">PROJECT VISION</h2>
      <a href="#" className="project-vision__media" aria-label="PROJECT VISION 動画を再生">
        <img src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80" alt="京町家の中庭" className="project-vision__image" />
        <span className="project-vision__play" aria-hidden="true"></span>
      </a>
    </div>
  </section>

  <section className="artisans-intro">
    <div className="artisans-intro__inner">
      <div className="artisans-intro__head">
        <h2 className="artisans-intro__title">ARTISANS</h2>
        <p className="artisans-intro__jp">礎の匠</p>
      </div>
      <p className="artisans-intro__lead">
        建築の礎を築き、<br />
        空間の在り方を整える美
      </p>
    </div>
  </section>

  <section className="artisans-five">
    <div className="artisans-five__inner">
      <article className="artisan-card">
        <img src="https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?auto=format&fit=crop&w=1200&q=80" alt="隈研吾" className="artisan-card__image" />
        <div className="artisan-card__overlay artisan-card__overlay--light">
          <p className="artisan-card__role">DESIGN SUPERVISOR</p>
          <p className="artisan-card__sub">世界的建築家</p>
          <h3 className="artisan-card__name">隈研吾</h3>
        </div>
      </article>

      <article className="artisan-card">
        <img src="https://images.unsplash.com/photo-1454198342508-31fe296d20f4?auto=format&fit=crop&w=1200&q=80" alt="金剛組" className="artisan-card__image" />
        <div className="artisan-card__overlay">
          <p className="artisan-card__role">MASTER BUILDER</p>
          <p className="artisan-card__sub">世界最古の企業・堂宮大工</p>
          <h3 className="artisan-card__name">金剛組</h3>
        </div>
      </article>

      <article className="artisan-card">
        <img src="https://images.unsplash.com/photo-1611403573630-938498ef95f4?auto=format&fit=crop&w=1200&q=80" alt="中村外二工務店" className="artisan-card__image" />
        <div className="artisan-card__overlay">
          <p className="artisan-card__role">SUKIYA MASTER</p>
          <p className="artisan-card__sub">日本の数寄屋大工の棟梁</p>
          <h3 className="artisan-card__name">中村外二工務店</h3>
        </div>
      </article>

      <article className="artisan-card">
        <img src="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80" alt="ARMANI/CASA" className="artisan-card__image" />
        <div className="artisan-card__overlay">
          <p className="artisan-card__role">INTERIOR DESIGN</p>
          <p className="artisan-card__sub">イタリアを代表するラグジュアリーブランド</p>
          <h3 className="artisan-card__name">ARMANI / CASA</h3>
        </div>
      </article>

      <article className="artisan-card">
        <img src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80" alt="御庭植治" className="artisan-card__image" />
        <div className="artisan-card__overlay">
          <p className="artisan-card__role">LANDSCAPE ARCHITECT</p>
          <p className="artisan-card__sub">庭の重森三玲の継承者・<br />260余年の伝統を誇る造園家</p>
          <h3 className="artisan-card__name">御庭植治</h3>
        </div>
      </article>
    </div>
  </section>

  <section className="artisans-color">
    <div className="artisans-color__inner">
      <h2 className="artisans-color__title">彩の匠</h2>
      <div className="artisans-color__gallery">
        <figure className="artisans-color__item">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="彩の匠イメージ1" className="artisans-color__image" />
        </figure>
        <figure className="artisans-color__item">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80" alt="彩の匠イメージ2" className="artisans-color__image" />
        </figure>
        <figure className="artisans-color__item">
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80" alt="彩の匠イメージ3" className="artisans-color__image" />
        </figure>
        <figure className="artisans-color__item">
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80" alt="彩の匠イメージ4" className="artisans-color__image" />
        </figure>
        <figure className="artisans-color__item">
          <img src="https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80" alt="彩の匠イメージ5" className="artisans-color__image" />
        </figure>
      </div>
    </div>
  </section>

  <section className="property-section">
    <div className="property-section__overlay"></div>
    <div className="property-section__inner">
      <h2 className="property-section__title">PROPERTY</h2>
      <p className="property-section__text">
        十の匠が結集し、歴史ある「旧 長谷川 邸」を未来へと昇華させる。<br />
        「静寂」という言葉がふさわしい上七軒の地に、このプロジェクトを
        「THE SILENCE Furnished by ARMANI/CASA」と名付けました。「日本」という至宝を
        「世界」の至光品へ。パースや間取りは、物件詳細をご覧ください。
      </p>
      <a href="/property" className="property-section__button">詳細を確認する</a>
    </div>
  </section>

  <footer className="site-footer">
    <div className="site-footer__inner">
      <nav className="site-footer__nav" aria-label="Footer Navigation">
        <a href="/" className="site-footer__link">HOME</a>
        <a href="/property" className="site-footer__link">PROPERTY</a>
        <a href="#" className="site-footer__link">PRIVACY POLICY</a>
      </nav>

      <div className="site-footer__brand">
        <p className="site-footer__furnished">FURNISHED BY</p>
        <p className="site-footer__line1">THE SILENCE</p>
        <p className="site-footer__line2">ARMANI/CASA</p>
      </div>
    </div>
  </footer>


  <div className="detail-panel" id="detailPanel">
    <div className="detail-panel__overlay"></div>
    <div className="detail-panel__body">
      <button className="detail-panel__close" id="detailClose">
        <span></span><span></span>
      </button>
      <div className="detail-panel__content" data-detail="0">
        <span className="detail-panel__label">01</span>
        <h3 className="detail-panel__title">KYOTO</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" alt="京都" />
        </div>
        <p className="detail-panel__text">千年の都・京都。日本文化の精髄がここに息づく。古の都が紡いできた美意識と伝統は、時を超えて今なお色褪せることなく、訪れる人々の心を捉え続けている。四季の移ろいとともに表情を変える街並み、そして脈々と受け継がれてきた職人の技。この地が持つ唯一無二の空気感こそが、The Timeless Condominiumの原点である。</p>
      </div>
      <div className="detail-panel__content" data-detail="1">
        <span className="detail-panel__label">02</span>
        <h3 className="detail-panel__title">KITANO TENMANGU</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="https://images.unsplash.com/photo-1578469645742-46cae010e5d6?auto=format&fit=crop&w=800&q=80" alt="北野天満宮" />
        </div>
        <p className="detail-panel__text">学問の神・菅原道真公を祀る北野天満宮。天暦元年（947年）の創建以来、千年以上の歴史を誇る。梅と紅葉の名所としても名高く、四季折々の美しさが訪れる人を魅了する。この聖域に隣接する立地が、本邸宅に比類なき格式と静謐をもたらしている。</p>
      </div>
      <div className="detail-panel__content" data-detail="2">
        <span className="detail-panel__label">03</span>
        <h3 className="detail-panel__title">KAMISHICHIKEN</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80" alt="上七軒 - 旧長谷川邸" />
        </div>
        <p className="detail-panel__text">京都最古の花街・上七軒。北野天満宮の東門前に広がるこの地に、かつて長谷川家の邸宅が佇んでいた。歴史と文化が交差するこの場所に、新たな物語が紡がれる。室町時代から続くこの花街の風情を纏いながら、現代の最高峰の住空間を実現する。</p>
      </div>
      <div className="detail-panel__content" data-detail="3">
        <span className="detail-panel__label">04</span>
        <h3 className="detail-panel__title">EPISODE</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80" alt="エピソード" />
        </div>
        <p className="detail-panel__text">千利休が茶の湯を大成し、出雲阿国が歌舞伎を創始したこの地。日本文化の転換点となった数々の物語が、上七軒という舞台の上で生まれてきた。その精神を受け継ぎ、建築・工芸・デザインの巨匠たちが再び集結し、新たな文化遺産を創造する。</p>
      </div>
    </div>
  </div>
      <SiteBehavior />
    </>
  );
}
