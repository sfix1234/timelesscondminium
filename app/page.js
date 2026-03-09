import { cookies } from 'next/headers';
import SiteBehavior from './components/site-behavior';
import AccessGate from './components/access-gate';
import ProjectVisionVideo from './components/project-vision-video';
import SiteFooter from './components/site-footer';
import SiteHeader from './components/site-header';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../lib/access-control';

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const isUnlocked = Boolean(getSessionRecord(sessionToken));

  return (
    <>
  <section className="hero">
    <div className="hero__bg hero__bg--video">
      <iframe
        className="hero__video"
        src="https://player.vimeo.com/video/1171460733?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        loading="eager"
        title="THESILENCE_LPtop"
      ></iframe>
    </div>
    <div className="hero__overlay"></div>
    <div className="hero-intro" aria-hidden="true">
      <div className="hero-intro__veil hero-intro__veil--left"></div>
      <div className="hero-intro__veil hero-intro__veil--center"></div>
      <div className="hero-intro__veil hero-intro__veil--right"></div>
      <div className="hero-intro__flare"></div>
      <div className="hero-intro__mark">
        <span className="hero-intro__mark-ring"></span>
        <img src="/assets/images/THE%20SILENCE_logo.png" alt="" className="hero-intro__mark-logo" />
      </div>
    </div>
    <div className="hero__content">
      <SiteHeader
        navItems={[
          { labelJa: '構想', labelEn: 'Concept' },
          { labelJa: '設計', labelEn: 'Design' },
          { labelJa: '立地', labelEn: 'Location' },
          { labelJa: '間取り', labelEn: 'Plan' },
          { labelJa: 'アクセス', labelEn: 'Access' },
        ]}
      />
      <div className="center-block">
        <h1 className="center-block__title">
          The Timeless<br />Condominium
        </h1>
        <span className="center-block__number">01</span>
        <span className="center-block__line"></span>
      </div>
      <div className="bottom-logo">
        <div className="bottom-logo__main">
          <img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" className="bottom-logo__image" />
        </div>
      </div>
    </div>
  </section>


  <section className="story">
    <div className="story__bg"></div>
    <div className="story__overlay"></div>
    <div className="story__content">
      <div className="story__vertical-text">
        <span className="story__vertical-col" data-ja="日本の素晴らしき物語を" data-en="A remarkable Japanese story">日本の素晴らしき物語を</span>
        <span className="story__vertical-col" data-ja="一〇〇年後の世界に紡ぐ" data-en="Woven into the world 100 years from now">一〇〇年後の世界に紡ぐ</span>
      </div>
      <div className="story__brand">
        <span className="story__brand-name">
          <img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" className="story__brand-logo" />
        </span>
        <div className="story__divider"></div>
      </div>
    </div>
  </section>


  <section className="craftsmen">
    <div className="craftsmen__sticky">
      <div className="craftsmen__line-top"></div>
      <p className="craftsmen__heading" data-ja="世界初、<br />匠の技が結集した邸宅。" data-en="A world-first residence,<br />crafted by master artisans.">世界初、<br />匠の技が結集した邸宅。</p>
      <ul className="craftsmen__list">
        <li className="craftsmen__name">Kuma Kengo</li>
        <li className="craftsmen__name">Kongo-Gumi</li>
        <li className="craftsmen__name">Armani</li>
        <li className="craftsmen__name">Nakamura Sotoji</li>
        <li className="craftsmen__name">Eri Koukei</li>
        <li className="craftsmen__name">Oniwa Ueji</li>
      </ul>
      <div className="craftsmen__line-bottom"></div>
    </div>
    <div className="craftsmen__visual">
      <figure className="craftsmen-photo__frame">
        <img src="/assets/images/craftsmen-group.jpg" alt="匠たちの集合写真" className="craftsmen-photo__img" />
      </figure>
    </div>
  </section>


  <section className="stage">
    <div className="stage__inner">
      <h2 className="stage__title">THE STAGE</h2>
      <div className="stage__row">
        <p className="stage__lead">舞台は、<br />京文化発祥の地<br />上七軒。</p>
        <nav className="stage__tabs">
          <button className="stage__tab is-active" type="button" data-tab="0">京都</button>
          <button className="stage__tab" type="button" data-tab="1">北野天満宮</button>
          <button className="stage__tab" type="button" data-tab="2">上七軒 - 旧長谷川邸</button>
          <button className="stage__tab" type="button" data-tab="3">エピソード</button>
        </nav>
      </div>
      <div className="stage__visual">
        <div className="stage__slide is-active" data-slide="0">
          <img src="/assets/images/culture/kyoto.jpg" alt="京都" />
          <span className="stage__slide-label stage__slide-label--center">京都</span>
        </div>
        <div className="stage__slide" data-slide="1">
          <img src="/assets/images/culture/kitanotenmangu.jpg" alt="北野天満宮" />
          <span className="stage__slide-label stage__slide-label--center">北野天満宮</span>
        </div>
        <div className="stage__slide" data-slide="2">
          <img src="/assets/images/culture/kamishichiken-kyuhasegawatei.jpg" alt="上七軒 - 旧長谷川邸" />
          <span className="stage__slide-label stage__slide-label--center">上七軒 - 旧長谷川邸</span>
        </div>
        <div className="stage__slide" data-slide="3">
          <img src="/assets/images/culture/episodo.jpg" alt="エピソード" />
          <span className="stage__slide-label stage__slide-label--center">エピソード</span>
        </div>
      </div>
      <div className="stage__info">
        <div className="stage__info-block is-active" data-info="0">
          <h3 className="stage__info-title">KYOTO</h3>
          <p className="stage__info-text">千年の都・京都は、宮廷文化、宗教、茶道、庭園、建築、芸能、和食など日本文化の根幹を育み、世界へ継承し続ける稀有な都市。</p>
        </div>
        <div className="stage__info-block" data-info="1">
          <h3 className="stage__info-title">KITANO TENMANGU</h3>
          <p className="stage__info-text">宮廷文化と信仰、茶の湯と芸能が交差し花開いた北野。北野天満宮は学問のみならず、芸事文化の源流を今に伝える特別な聖地。</p>
        </div>
        <div className="stage__info-block" data-info="2">
          <h3 className="stage__info-title">KAMISHICHIKEN</h3>
          <p className="stage__info-text">北野天満宮の再建余材から生まれた上七軒は、世界最古級のサステナブル精神を宿す日本最古の花街。旧長谷川邸はその象徴。</p>
        </div>
        <div className="stage__info-block" data-info="3">
          <h3 className="stage__info-title">EPISODE</h3>
          <p className="stage__info-text">土方歳三と水上勉、時代を超えた人物が惹かれた上七軒。剣豪と文豪の物語が、この花街の静寂と奥行きを今に伝えています。</p>
        </div>
      </div>
      <div className="stage__more">
        <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
      </div>
    </div>
  </section>

  <section className="stage-photo">
    <figure className="stage-photo__frame">
      <p className="stage-photo__text" data-ja="千年の美意識を、<br />現代に。" data-en="A millennium of aesthetics,<br />reimagined for today.">千年の美意識を、<br />現代に。</p>
      <img src="/assets/images/stage-message.jpeg" alt="千年の美意識を表現した情景" className="stage-photo__image" />
    </figure>
  </section>

  <div className="detail-panel" id="detailPanel">
    <div className="detail-panel__overlay"></div>
    <div className="detail-panel__body">
      <button className="detail-panel__close" id="detailClose" type="button">
        <span></span><span></span>
      </button>
      <div className="detail-panel__content" data-detail="0">
        <span className="detail-panel__label">01</span>
        <h3 className="detail-panel__title">KYOTO</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kyoto.jpg" alt="京都" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">千年の都が育んだ、日本文化の集積地</h4>
          <p className="detail-panel__paragraph">8世紀末、平安京遷都以来、千年以上もの間、日本の都としてあり続けた京都。宮廷文化、仏教、神道、茶道、庭園、建築、芸能、和食 ── 日本のアイデンティティの根幹を成す要素は、多くがこの地で磨かれ、体系化され、現代へと受け継がれています。</p>
          <p className="detail-panel__paragraph">国宝・重要文化財に指定される社寺や庭園、町家建築の多くは「古都京都の文化財」として世界文化遺産にも登録されており、街そのものが貴重な歴史文化とひとつになった、大変稀有な存在です。</p>
          <p className="detail-panel__paragraph">また京都は、和食文化の中心地としても知られています。四季折々の食材を生かし、繊細な味と美しい盛り付けとともに、おもてなしの心を伝える京料理は、日本の歴史や芸術性を雅やかに体現しています。その価値は、京都がミシュランの星付き店が世界有数の街であることからも見て取れます。</p>
          <p className="detail-panel__paragraph">このように、歴史・文化・景観・食が高い次元で融合する京都は、世界的な観光都市ランキングにおいても常に高い評価を受け続けています。京都は、日本の美意識と精神性が最も凝縮された唯一無二の都市なのです。</p>
        </div>
      </div>
      <div className="detail-panel__content" data-detail="1">
        <span className="detail-panel__label">02</span>
        <h3 className="detail-panel__title">KITANO TENMANGU</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kitanotenmangu.jpg" alt="北野天満宮" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">芸能文化が息づく、特別な聖地</h4>
          <p className="detail-panel__paragraph">平安京の北に広がる地「北野」ー 北野は、天皇の住まう内裏に近く、宮廷の遊興の地として繁栄してきました。九世紀には天地の全ての神々・天神地祇（てんじんちぎ）が、十世紀初頭には雷神が、同じく十世紀中頃には学問の神・菅原道真公が祀られました。</p>
          <p className="detail-panel__paragraph">これらがやがてひとつにまとまり、「北野天満宮」という大社に発展し、現在では日本全国の天満宮・天神社一万二千社の総本社として広く信仰を集めています。</p>
          <p className="detail-panel__paragraph">十六世紀、北野の地をこよなく愛した時の天下人・豊臣秀吉がこの地で催した「北野大茶湯」では、後の芸事文化の源流となる女性芸能者・出雲阿国が招聘され、現代の歌舞伎の基礎となる「かぶき踊り」を披露しました。これらは、茶の湯のみならず、芸事文化が一体となって花開いた象徴的な出来事としても知られています。こうした歴史的背景から、北野天満宮は学問の神としてのみならず、“芸事文化の発祥地”としても、広く親しまれるようになりました。</p>
        </div>
      </div>
      <div className="detail-panel__content" data-detail="2">
        <span className="detail-panel__label">03</span>
        <h3 className="detail-panel__title">KAMISHICHIKEN</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kamishichiken-kyuhasegawatei.jpg" alt="上七軒 - 旧長谷川邸" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">世界最古のサステナブルな花街</h4>
          <p className="detail-panel__paragraph">北野の地に創られた街・上七軒ー 北野天満宮は、その歴史の中で幾度もの火災や地震に見舞われ、十五世紀中頃の大災では、社殿などの貴重な文化財が焼失してしまいました。その再建工事の際に生じた余材は、北野天満宮の東門前に創建された、参拝客の休み処となる七軒の茶屋に使用されました。それこそが「上七軒」という、世界最古のサステナブル精神に基づいて創られた街の始まりと考えられています。</p>
          <p className="detail-panel__paragraph">十七世紀以降、芸舞妓の演舞を愛でながら食事やお酒を楽しむお茶屋遊びが流行したことで、上七軒は優雅な宮廷文化の流れを汲んだ “日本最古の花街” として、また織物の街・西陣の奥座敷として、繁栄に拍車をかけていきました。</p>
          <p className="detail-panel__paragraph">その街に佇むのが「旧 長谷川邸」という一邸です。上七軒のお茶屋の中でも北野天満宮に最も近い場所に佇み、一際広い敷地を有する格式高い邸宅として、二〜三百年もの間賑わっていたといわれています。木造建築でありながら、現代にその姿を残している極めて歴史的価値の高い奇跡の邸宅です。</p>
        </div>
      </div>
      <div className="detail-panel__content" data-detail="3">
        <span className="detail-panel__label">04</span>
        <h3 className="detail-panel__title">EPISODE</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/episodo.jpg" alt="エピソード" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">剣豪・土方歳三と、文豪・水上勉</h4>
          <p className="detail-panel__paragraph">幕末と呼ばれる19世紀半ばに、新選組副長として京都の治安を担ったのが土方歳三という「ラスト・サムライ」の一人です。激動の時代を駆け抜けた彼もまた、上七軒を訪れていたと伝えられており、上七軒の舞妓との儚くも悲しい物語は、今もなお現代に語り継がれています。剣と死が常に隣り合わせの日常で、この静かな花街に身を委ねるひとときは、土方にとってかけがえのない心の安らぎであったのかもしれません。しかし、近代化（大政奉還）の波に呑まれ、彼は京都を離れ戊辰戦争へと向かい、三十五歳の若さでその生涯を遂げました。</p>
          <p className="detail-panel__paragraph">やがて時は下り、20世紀半ば、上七軒・旧 長谷川邸に深い関心を寄せていたのが、日本の近代文学を代表する直木賞作家・水上勉です。著書『雁の宿』では、上七軒を舞台とした情景が描かれており、独特の視点と豊かな表現で、他にも数々の作品を送り出しました。</p>
          <p className="detail-panel__paragraph">上七軒・旧 長谷川邸は、多くの偉人、賢人、文化人たちに愛され、幾多の人生に寄り添ってきました。その歴史の面影を、今もなお感じさせています。</p>
        </div>
      </div>
    </div>
  </div>

  <AccessGate initialUnlocked={isUnlocked}>
  {isUnlocked ? (
  <>

  <section className="project-vision">
    <div className="project-vision__inner">
      <h2 className="project-vision__title">PROJECT VISION</h2>
      <ProjectVisionVideo />
    </div>
  </section>

  <section className="artisans-intro">
    <div className="artisans-intro__inner">
      <div className="artisans-intro__head">
        <h2 className="artisans-intro__title">ARTISANS</h2>
        <p className="artisans-intro__count">十の匠</p>
      </div>
      <div className="artisans-intro__copy-row">
        <p className="artisans-intro__lead">
          建築の礎を築き、<br />
          空間の在り方を整える美
        </p>
        <p className="artisans-intro__jp">礎の匠</p>
      </div>
    </div>
  </section>

  <section className="artisans-five">
    <div className="artisans-five__inner">
      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="0" aria-label="隈研吾の詳細を開く">
          <img src="/assets/images/artist_photo/KENGOKUMA.jpg" alt="隈研吾" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay artisan-card__overlay--light">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">DESIGN SUPERVISOR</p>
            <p className="artisan-card__sub">KUMA KENGO</p>
            <h3 className="artisan-card__name">隈研吾</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="0" aria-label="隈研吾の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="1" aria-label="金剛組の詳細を開く">
          <img src="/assets/images/artist_photo/KONGOGUMI.jpg" alt="金剛組" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">MASTER BUILDER</p>
            <p className="artisan-card__sub">KONGO GUMI</p>
            <h3 className="artisan-card__name">金剛組</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="1" aria-label="金剛組の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="2" aria-label="中村外二工務店の詳細を開く">
          <img src="/assets/images/artist_photo/NAKAMURASOTOJI.jpg" alt="中村外二工務店" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">SUKIYA MASTER</p>
            <p className="artisan-card__sub">NAKAMURA SOTOJI BUILDER</p>
            <h3 className="artisan-card__name">中村外二工務店</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="2" aria-label="中村外二工務店の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="3" aria-label="ARMANI CASAの詳細を開く">
          <img src="/assets/images/artisans/armani:casa.jpg" alt="ARMANI/CASA" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">INTERIOR DESIGN</p>
            <p className="artisan-card__sub">ARMANI / CASA</p>
            <h3 className="artisan-card__name">ARMANI / CASA</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="3" aria-label="ARMANI CASAの詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="4" aria-label="御庭植治の詳細を開く">
          <img src="/assets/images/artist_photo/ONIWAUEJI.jpg" alt="御庭植治" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">LANDSCAPE ARCHITECT</p>
            <p className="artisan-card__sub">ONIWA UEJI</p>
            <h3 className="artisan-card__name">御庭植治</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="4" aria-label="御庭植治の詳細">+</button>
        </div>
      </article>
    </div>
  </section>

  <section className="artisans-color">
    <div className="artisans-color__inner">
      <div className="artisans-color__head">
        <h2 className="artisans-color__title">彩の匠</h2>
        <p className="artisans-color__lead">空間や作品に彩りを添え<br />品格を際立たせる華</p>
      </div>
      <div className="artisans-color__gallery">
        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="5" aria-label="江里康慧の詳細を開く">
            <img src="/assets/images/artist_photo/ERIKOUKEI.jpg" alt="江里康慧" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay artisan-card__overlay--light">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">BUDDHIST SCULPTOR</p>
              <p className="artisan-card__sub">仏像彫刻の第一人者</p>
              <h3 className="artisan-card__name">江里康慧</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="5" aria-label="江里康慧の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="6" aria-label="江里朋子の詳細を開く">
            <img src="/assets/images/artist_photo/ERITOMOKO.jpg" alt="江里朋子" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">KIRIKANE ARTIST</p>
              <p className="artisan-card__sub">截金師</p>
              <h3 className="artisan-card__name">江里朋子</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="6" aria-label="江里朋子の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="7" aria-label="伊藤東凌の詳細を開く">
            <img src="/assets/images/artist_photo/ITOTOURYO.webp" alt="伊藤東凌" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Vice-Abbot of Ryosokuin Temple</p>
              <p className="artisan-card__sub">禅と現代文化の実践者</p>
              <h3 className="artisan-card__name">伊藤東凌</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="7" aria-label="伊藤東凌の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="8" aria-label="裕人 礫翔の詳細を開く">
            <img src="/assets/images/artist_photo/HIROTORAKUSHO.jpg" alt="裕人 礫翔" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">MASTER CRAFTSMAN</p>
              <p className="artisan-card__sub">箔アーティスト</p>
              <h3 className="artisan-card__name">裕人 礫翔</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="8" aria-label="裕人 礫翔の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="9" aria-label="和泉守兼定の詳細を開く">
            <img src="/assets/images/culture/episodo.jpg" alt="和泉守兼定" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">JAPANESE SWORD / 日本刀</p>
              <p className="artisan-card__sub">最上大業物と称される名刀</p>
              <h3 className="artisan-card__name">和泉守兼定</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="9" aria-label="和泉守兼定の詳細">+</button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section className="property-section">
    <div className="property-section__overlay"></div>
    <div className="property-section__inner">
      <h2 className="property-section__title">PROPERTY</h2>
      <p className="property-section__text">
        十の匠が結集し、歴史ある「旧 長谷川 邸」を未来へと昇華させる。<br />
        「静寂」という言葉がふさわしい上七軒の地に、<br />
        このプロジェクトを「THE SILENCE Furnished by ARMANI/CASA」と名付けました。<br />
        「日本」という至宝を「世界」の至光品へ。<br />
        パースや間取りは、物件詳細をご覧ください。
      </p>
      <a href="/property" className="property-section__button">詳細を確認する</a>
    </div>
  </section>

  <SiteFooter />
  <div className="artisan-detail" id="artisanDetail">
    <div className="artisan-detail__overlay"></div>
    <div className="artisan-detail__sheet">
      <button className="artisan-detail__close" id="artisanDetailClose" type="button" aria-label="Close artisan detail">
        <span></span><span></span>
      </button>

      <article className="artisan-detail__content" data-artisan-detail="0">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493260?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_KengoKuma"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">DESIGN SUPERVISOR</p>
            <p className="artisan-detail__jp">隈研吾</p>
          </div>
          <p className="artisan-detail__en">KUMA KENGO</p>
        </div>
        <p className="artisan-detail__text">
          1954年生まれ。1990年に隈研吾建築都市設計事務所を設立。慶應義塾大学教授、東京大学教授などを歴任し、現在は東京大学にて特別教授・名誉教授を務めるほか、多くの機関で教育・研究活動を推進。日本芸術院会員。世界50か国以上でプロジェクトを展開し、自然・技術・人間の新しい関係を切り開く建築を提案している。主な著書に『隈研吾 オノマトペ 建築 接地性』（エクスナレッジ）、『日本の建築』（岩波新書）、『全仕事』（大和書房）、『点・線・面』（岩波書店）、『負ける建築』（岩波書店）、『自然な建築』、『小さな建築』（岩波新書）、ほか多数。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">隈研吾建築都市設計事務所</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <p className="artisan-detail__text">
          1990年に創設された、隈研吾氏率いる建築設計事務所。国内外合わせて数百名に及ぶ設計のプロフェッショナルが所属し、それぞれの才能が世界30カ国以上で新たな潮流を生み出している。木や石などの素材が持つ力や光の表情を繊細に引き出し、土地の記憶と工芸性を現代へとつなぐデザインで、住宅から文化施設、都市スケールのプロジェクトまで多彩に展開。これまでに50か国以上で作品を手がけ、その建築群は世界建築界の最高峰を象徴する存在として高い評価を受けている。近年では室内装飾や食器・家具・インテリアなどのデザイン開発など活動領域をさらに広げ、数百を超えるプロジェクトがグローバルで進行中。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>新国立競技場（東京）</li>
          <li>雲の上のギャラリー / 木橋ミュージアム（高知県梼原町）</li>
          <li>登米町伝統芸能伝承館（森の舞台）</li>
          <li>V&amp;Aダンディー（スコットランド） ほか多数</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="1">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493310?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_Kongogumi"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">MASTER BUILDER</p>
            <p className="artisan-detail__jp">金剛組</p>
          </div>
          <p className="artisan-detail__en">KONGO GUMI</p>
        </div>
        <p className="artisan-detail__text">
          西暦578年の創業から、千四百年以上にわたり日本の社寺建築を支えてきた、国宝級の技術を有する世界最古の企業。その起源は、聖徳太子の命を受けて百済から招かれた三人の宮大工にあり、その中の一人、金剛重光が創業者となる。日本初の官寺である四天王寺の建立を皮切りに、法隆寺や五重塔など、日本社寺建築の原点となる建造物を続々と完成させていった。創業以来、金剛組は「社寺の造形美を形にし、建物を護り、後世に引き継ぐ」ことを使命とし、幾多の戦火や災禍に見舞われた社寺の再建に尽力。木の仕口や継ぎ手といった高度な伝統技法を継承・発展させてきた。現在も、永く建物を護持し、時代を超えて誇りを持てる仕事をするという理念のもと、文化財の修復や寺社仏閣の建造に関わり、日本建築の伝統を未来へと繋ぎ続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>寝屋川市 大阪成田山不動尊開創90周年記念事業新山門建立工事（2024年竣工）</li>
          <li>大阪市 和宗総本山四天王寺金堂再建工事（昭和34年施工）</li>
          <li>高野山真言宗 補陀洛山総持寺包丁式殿（開山堂）新築工事（平成18年）</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="2">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493390?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_SotojiNakamura"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">SUKIYA MASTER</p>
            <p className="artisan-detail__jp">中村外二工務店</p>
          </div>
          <p className="artisan-detail__en">NAKAMURA SOTOJI BUILDER</p>
        </div>
        <p className="artisan-detail__text">
          1931年、数寄屋大工の第一人者である棟梁・中村外二が創業した、京都を拠点とする伝統建築の工房。木肌がなめらかで材質に優れた北山磨き丸太などを用いた日本建築様式「数寄屋造り」を得意としている。中村氏は、裏千家御用達の作事方大工として伊勢神宮の茶室や海外の著名な茶室建築に携わり、材木への深い探求と精緻な仕事を融合させて独自の美意識を築き上げた。数寄屋建築の継承と発展に尽力したその精神は現代の職人にも脈々と受け継がれ、京都迎賓館をはじめ、数々の料亭・旅館、さらには空港施設や住宅建築に至るまで、本物の素材が持つ質感と空間美を活かした作品を手掛けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>京都迎賓館 茶室「夕映の間」（2005年）</li>
          <li>裏千家今日庵 茶室（修復）</li>
          <li>大徳寺塔頭 茶室（新築・修復）</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="3">
        <img src="/assets/images/artisans/armani:casa.jpg" alt="ARMANI CASA" className="artisan-detail__portrait" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">INTERIOR DESIGN</p>
            <p className="artisan-detail__jp">ARMANI / CASA</p>
          </div>
          <p className="artisan-detail__en">ARMANI / CASA</p>
        </div>
        <p className="artisan-detail__text">
          2000年からスタートしたARMANI / CASAは、ジョルジオ・アルマーニの哲学が息づくインテリアホームコレクションブランド。ジョルジオ氏自身のこだわりのスタイルが生きる、家具からホームアクセサリーに至るまでの幅広いラインナップで、洗練された生活空間をグローバルな視点から提案している。建築物のコンセプトや住まう人の上質な暮らしにフィットする、さまざまなアイテムが揃っており、家具やホームアクセサリー、照明、そしてエクスクルーシブなファブリックまで、あらゆるプレゼンテーションが可能。スタイリッシュでエレガンスなクリエイティブ空間を創り上げることができる。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>アルマーニホテル（ミラノ、ドバイ、東京）</li>
          <li>世界各国の高級レジデンス</li>
          <li>プライベートヨット インテリア</li>
          <li>高級ブティックホテル</li>
          <li>プレミアムマンション インテリア監修</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="4">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493340?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_OnniwaUeji"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">LANDSCAPE ARCHITECT</p>
            <p className="artisan-detail__jp">御庭植治</p>
          </div>
          <p className="artisan-detail__en">ONIWA UEJI</p>
        </div>
        <p className="artisan-detail__text">
          近代日本庭園の礎を築いた作庭家・七代目 小川治兵衛（1860‒1933）の系譜を継ぐ、京都の庭園造園家・庭師一門。七代目・小川治兵衛は、比叡山や東山、琵琶湖疏水といった周辺の自然景観を庭園構成に取り込み、地形や水の流れを生かした「写景式庭園」を確立。近代日本庭園の発展に大きな影響を与えた。無鄰菴、平安神宮神苑、円山公園、南禅寺界隈の別邸庭園など、今日の京都の景観形成に深く関わる数多くの名庭を手がけ、作品のいくつかは、庭園分野で最高位とされる国指定名勝に認定されている。現在は、小川治兵衛家の直系である小川勝章氏を中心に、国指定名勝をはじめとする文化財庭園の修復・維持管理、ならびに歴史的建築と調和する庭園の作庭に尽力し、京都の庭園文化を正統に継承する存在として活動を続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>北野天満宮 風月殿庭園</li>
          <li>平安神宮神苑</li>
          <li>金地院庭園</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="5">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493286?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_KokeiEri"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">BUDDHIST SCULPTOR</p>
            <p className="artisan-detail__jp">江里康慧</p>
          </div>
          <p className="artisan-detail__en">ERI KOUKEI</p>
        </div>
        <p className="artisan-detail__text">
          1943年、仏師・江里宗平の長男として京都に生まれる。現代の仏師の中で人間国宝に最も近い人物の一人と称される、仏像彫刻の第一人者。伝統的な木彫技法に現代的な感性を融合させた、独創性と精神性の高い作品を制作。師匠から説かれた「仏は彫る前からすでに木の中にいらっしゃる。仏師は周りの余分な部分を払いのけるだけだ」という教えと、「仏師は修行者であり続ける」という思いのもとに活動を続け、国内外から高い評価を受けている。1989年に三千院から大仏師号を賜り、2003年には京都府文化功労賞、2007年には第41回仏教伝道文化賞を受賞。著書に「仏師という生き方」や「京都の仏師が語る　眼福の仏像」など。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>薬師寺 仏像（修復）</li>
          <li>東大寺 仏像（修復）</li>
          <li>個人コレクション 仏像（制作）</li>
          <li>寺院 仏像（新作・修復 多数）</li>
          <li>美術館 展示作品（多数）</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="6">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493425?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_TomokoEri"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">KIRIKANE ARTIST</p>
            <p className="artisan-detail__jp">江里朋子</p>
          </div>
          <p className="artisan-detail__en">ERI TOMOKO</p>
        </div>
        <p className="artisan-detail__text">
          京都を拠点とする截金師（きりかねし）。同じく截金師であった人間国宝・江里佐代子の娘として、母から伝統的な截金技法を継承。金箔を貼り合わせた金紙を細微に切断して金の糸を作り、仏像に貼り付けて絵柄を描くといった精緻な装飾技術により、仏像や工芸品に荘厳な輝きを添えている。父・江里康慧とともに、仏教美術の伝統を次世代へと繋ぐ活動に尽力している。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>重要文化財 仏像（截金修復）</li>
          <li>寺院 仏像装飾（多数）</li>
          <li>伝統工芸展 出品作品（多数）</li>
          <li>截金技法 継承・指導活動</li>
          <li>京都伝統工芸大学校 講師</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="7">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493456?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_ToryoIto"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">Vice-Abbot of Ryosokuin Temple</p>
            <p className="artisan-detail__jp">伊藤東凌</p>
          </div>
          <p className="artisan-detail__en">ITO TORYO</p>
        </div>
        <p className="artisan-detail__text">
          1980年生まれ。建仁寺僧堂にて修行後、2008年両足院の副住職に就任。これまで伝統文化に現代美術やマインドフルネスを組み合わせ、新しい仏教の表現を提案してきた。海外での活動も多く、米国Meta(旧Facebook)本社などで禅指導を行う。国内では任天堂創業家による山内財団の評議員ほか、企業エグゼクティブへ向けたコーチングも担当。ホテルの空間デザイン、アパレルブランドなどの監修も手がける。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>両足院 副住職として15万人以上に坐禅指導</li>
          <li>Forbes JAPAN「NEXT100」選出（2023年）</li>
          <li>Newsweek「世界が尊敬する日本人100人」選出</li>
          <li>禅アプリ「InTrip」開発・リリース</li>
          <li>グローバルメディテーションコミュニティ「雲是」主宰</li>
          <li>Meta本社での禅セミナー開催</li>
          <li>著書：『忘我思考』『月曜瞑想』等</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="8">
        <div className="artisan-detail__portrait artisan-detail__portrait--video">
          <iframe
            className="artisan-detail__portrait-embed"
            src="about:blank"
            data-src="https://player.vimeo.com/video/1171493359?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="THESILENCE_Interview_RakushoHiroto"
          ></iframe>
        </div>
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">MASTER CRAFTSMAN</p>
            <p className="artisan-detail__jp">裕人 礫翔</p>
          </div>
          <p className="artisan-detail__en">HIROTO RAKUSHO</p>
        </div>
        <p className="artisan-detail__text">
          1962年、京都・西陣生まれ。経済産業省認定 伝統工芸士、箔アーティスト。父であり京都市伝統産業技術功労者の西山治作氏に師事し、箔工芸技術を学ぶ。2002年に自身のブランド「裕人礫翔」を設立。独自の特許技術により、経年劣化した金箔や文化財の質感を再現する手法を確立。国宝「風神雷神図屏風」（建仁寺）、南禅寺、妙心寺、二条城、名古屋城などの障壁画の複製を手掛ける。さらに、従来引き立て役とされてきた金・銀・プラチナなどの金属箔を主役に用いてた空間デザインや工芸美術などのアート作品を創造し、日本のみならずニューヨーク、パリ、上海、クウェートなどで国際的に活動。各方面から高い評価を受けている。ルーブル美術館、G8洞爺湖サミット、上海万博などでも展示の実績がある。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>国宝「風神雷神図屏風」複製（建仁寺）</li>
          <li>南禅寺、妙心寺、二条城、名古屋城 障壁画複製</li>
          <li>シアトル美術館、メトロポリタン美術館 作品複製協力</li>
          <li>Ralph Rucci、GIVENCHY、片岡鶴太郎 コラボレーション</li>
          <li>ルーブル美術館、G8サミット、上海万博 展示</li>
          <li>ニューヨーク Bergdorf Goodman 個展・作品所蔵</li>
          <li>パリ市庁舎 作品所蔵</li>
        </ul>
      </article>

      <article className="artisan-detail__content" data-artisan-detail="9">
        <img src="/assets/images/culture/episodo.jpg" alt="和泉守兼定" className="artisan-detail__portrait" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">JAPANESE SWORD / 日本刀</p>
            <p className="artisan-detail__jp">和泉守兼定</p>
          </div>
          <p className="artisan-detail__en">IZUMINOKAMI KANESADA</p>
        </div>
        <p className="artisan-detail__text">
          和泉守兼定という名前は、19世紀後半の幕末を代表する刀工の個人名であり、同氏が手がけた新選組副長・土方歳三が愛用した刀の名称でもある。その類い稀な切れ味と美しさから「最上大業物（さいじょうおおわざもの）」として極めて高く評価され、名だたる武将たちに絶賛された。鋭利な刃文と力強い姿が特徴で、実戦刀としての機能性と美術品としての価値を兼ね備えている。現代においても、日本刀の最高峰の一つとして多くの刀剣愛好家や歴史研究者から敬愛されている、比類なき名刀。
        </p>
      </article>
    </div>
  </div>
  </>
  ) : null}
  </AccessGate>
      <SiteBehavior />
    </>
  );
}
