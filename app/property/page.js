export default function PropertyPage() {
  return (
    <div className="property-page">
      <header className="property-page__header">
        <a href="/" className="property-page__home">HOME</a>
        <span className="property-page__brand">THE SILENCE</span>
      </header>

      <main>
        <section className="property-hero">
          <div className="property-hero__overlay"></div>
          <div className="property-hero__inner">
            <p className="property-hero__kicker">THE SILENCE Furnished by ARMANI/CASA</p>
            <h1 className="property-hero__title">PROPERTY</h1>
            <p className="property-hero__lead">上七軒の静寂に佇む、旧長谷川邸の記憶を継ぐ邸宅。</p>
          </div>
        </section>

        <section className="property-detail">
          <div className="property-detail__inner">
            <h2 className="property-detail__title">物件概要</h2>
            <dl className="property-detail__list">
              <div className="property-detail__row"><dt>所在地</dt><dd>京都市上京区上七軒（旧 長谷川邸）</dd></div>
              <div className="property-detail__row"><dt>用途</dt><dd>高級分譲コンドミニアム</dd></div>
              <div className="property-detail__row"><dt>設計監修</dt><dd>隈研吾（Kuma Kengo）</dd></div>
              <div className="property-detail__row"><dt>施工</dt><dd>金剛組（Kongo-Gumi）</dd></div>
              <div className="property-detail__row"><dt>インテリア</dt><dd>ARMANI / CASA</dd></div>
            </dl>
          </div>
        </section>

        <section className="property-visual">
          <img src="/assets/images/stage-message.jpeg" alt="邸宅イメージ" className="property-visual__image" />
        </section>

        <section className="property-contact">
          <h2 className="property-contact__title">お問い合わせ</h2>
          <p className="property-contact__text">物件詳細・販売スケジュールは下記フォームよりお問い合わせください。</p>
          <a href="https://fido-co.com/contact/" className="property-contact__button">CONTACT</a>
        </section>
      </main>
    </div>
  );
}
