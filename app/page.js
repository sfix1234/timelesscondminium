import { cookies } from 'next/headers';
import SiteBehavior from './components/site-behavior';
import AccessGate from './components/access-gate';
import ProjectVisionVideo from './components/project-vision-video';
import SiteFooter from './components/site-footer';
import SiteHeader from './components/site-header';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../lib/access-control';

function VerticalRevealText({ text, colOffset = 0, ...props }) {
  return (
    <span className="story__vertical-col" style={{ '--col-offset': colOffset }} aria-label={text} {...props}>
      {Array.from(text).map((char, index) => (
        <span
          key={`${text}-${index}`}
          className="story__vertical-char"
          style={{ '--char-index': index }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

const artisanProfessionalGalleryMap = {
  '0': [
    '/assets/images/gallery/KengoKuma/kumakengo-1.jpg',
    '/assets/images/gallery/KengoKuma/kumakengo-2.jpg',
    '/assets/images/gallery/KengoKuma/kumakengo-3.jpeg',
    '/assets/images/gallery/KengoKuma/kumakengo-4.jpeg',
    '/assets/images/gallery/KengoKuma/kumakengo-5.jpeg',
  ],
  '1': [
    '/assets/images/gallery/Kongogroup/agrryuzqfhombmxbpow7.webp',
    '/assets/images/gallery/Kongogroup/c9fkjooikewdzfr985bs.webp',
    '/assets/images/gallery/Kongogroup/xzolzjek9wtoe5i9copl.webp',
    '/assets/images/gallery/Kongogroup/gfpgfqbbpravv0ghluk2.webp',
    '/assets/images/gallery/Kongogroup/jr0pu9h0lo4fz1xhkzjy.webp',
  ],
  '2': [
    '/assets/images/gallery/NakamuraSotojiConstruction/bequ3c6gjmf1lq88liix.webp',
    '/assets/images/gallery/NakamuraSotojiConstruction/pkjw9diqcsttww3rzj8h.jpg',
    '/assets/images/gallery/NakamuraSotojiConstruction/kcmscvn38g4blzzzqqr8.jpg',
    '/assets/images/gallery/NakamuraSotojiConstruction/esfkn8cx5osyy3zoymkk.webp',
    '/assets/images/gallery/NakamuraSotojiConstruction/u1oofvjajzmfjlii0r1d.webp',
  ],
  '3': [
    '/assets/images/gallery/ARMANI/ih1de8xrxwb0ukwkg9ya_sm.jpg',
    '/assets/images/gallery/ARMANI/lajktmwt8noo7lcel18e_sm.jpg',
    '/assets/images/gallery/ARMANI/2_Soggiorno_24-03-25_ARMANI CASA Ambientato0296.jpg',
    '/assets/images/gallery/ARMANI/6_Camera_24-03-25_ARMANI CASA Ambientato0477.jpg',
    '/assets/images/gallery/ARMANI/trbyw7vskzjnfsq7l3og.webp',
  ],
  '4': [
    '/assets/images/gallery/OniwaUeji/oniwa1.JPG',
    '/assets/images/gallery/OniwaUeji/oniwa2.jpg',
    '/assets/images/gallery/OniwaUeji/oniwa3.JPEG',
    '/assets/images/gallery/OniwaUeji/oniwa4.JPEG',
    '/assets/images/gallery/OniwaUeji/oniwa5.JPG',
  ],
  '5': [
    '/assets/images/gallery/KoukeiEri/erikoukei1.jpeg',
    '/assets/images/gallery/KoukeiEri/350rgb_20260206_THE SILENCE_0277.jpg',
    '/assets/images/gallery/KoukeiEri/erikoukei2.jpeg',
    '/assets/images/gallery/KoukeiEri/350rgb_20260206_THE SILENCE_0278.jpg',
    '/assets/images/gallery/KoukeiEri/350rgb_20260206_THE SILENCE_0279.jpg',
  ],
  '6': [
    '/assets/images/gallery/TomokoEri/img20170920041535349259.webp',
    '/assets/images/gallery/TomokoEri/img20171005085217408958.webp',
    '/assets/images/gallery/TomokoEri/img20171005085251911301.webp',
    '/assets/images/gallery/TomokoEri/img20171005085253462958.webp',
    '/assets/images/gallery/TomokoEri/img20171005085302409744.webp',
  ],
  '7': [
    '/assets/images/gallery/ToryoIto/P1001331.jpg',
    '/assets/images/gallery/ToryoIto/_H3I3778.jpg',
    '/assets/images/gallery/ToryoIto/P1061826.jpg',
    '/assets/images/gallery/ToryoIto/ryosokuin_250808_0194.jpg',
    '/assets/images/gallery/ToryoIto/kv-100.jpg',
  ],
  '8': [
    '/assets/images/gallery/HirotoRakusho/IMG_1554.webp',
    '/assets/images/gallery/HirotoRakusho/IMG_1555.webp',
    '/assets/images/gallery/HirotoRakusho/IMG_1561-1166x656.webp',
    '/assets/images/gallery/HirotoRakusho/IMG_1589.png',
    '/assets/images/gallery/HirotoRakusho/IMG_1567.webp',
  ],
  '9': [
    '/assets/images/gallery/IzuminokamiKanesada/imag528.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/imag529.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/toshizo4.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/toshizo3.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/toshizo5.jpg',
  ],
};

function ArtisanProfessionalsGallery({ artisanId, artisanName }) {
  const images = artisanProfessionalGalleryMap[artisanId] || [];
  if (!images.length) return null;

  return (
    <>
      <div className="artisan-detail__section">
        <p className="artisan-detail__section-title">Professionals</p>
        <div className="artisan-detail__section-line"></div>
      </div>
      <div className="artisan-detail__gallery">
        {images.map((src, index) => (
          <img
            key={`${artisanId}-${src}`}
            src={src}
            alt={`${artisanName} ${index + 1}`}
            className={`artisan-detail__gallery-image${src.includes('kv-100') ? ' artisan-detail__gallery-image--full' : ''}`}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const isClientPreview = String(process.env.CLIENT_PREVIEW_ENABLED || '').trim().toLowerCase() === 'true';
  const isUnlocked = isClientPreview || Boolean(getSessionRecord(sessionToken));
  const rightStoryText = '日本の「美」を、千年先の世界へ紡ぐ。';
  const leftStoryText = '';

  return (
    <>
  <div className="hero-story-scene">
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
            { labelJa: 'TOP', labelEn: 'TOP', target: '.hero' },
            { labelJa: 'PROPERTY', labelEn: 'PROPERTY', target: isUnlocked ? '.property-section' : '.registration' },
            { labelJa: 'CONTACT', labelEn: 'CONTACT', target: '.registration' },
            ]}
          />
      </div>
    </section>

    <div className="hero-story-scene__logo-track" aria-hidden="true">
      <div className="hero-story-scene__logo-sticky">
        <div className="floating-logo">
          <div className="center-block hero__logo-overlay">
          </div>
          <div className="floating-logo__main">
            <img src="/assets/images/THE%20SILENCE_logo.png" alt="" className="floating-logo__image" />
          </div>
        </div>
      </div>
    </div>

    <section className="story">
      <div className="story__bg"></div>
      <div className="story__overlay"></div>
      <div className="story__content">
        <div className="story__vertical-text">
          <VerticalRevealText
            text={rightStoryText}
            colOffset={0}
            data-ja={rightStoryText}
            data-en="A remarkable Japanese story"
          />
        </div>
      </div>
    </section>
  </div>


  <section className="craftsmen" data-visible-threshold="0.3">
    <div className="craftsmen__sticky">
      <p className="craftsmen__heading" data-ja="世界初、匠の技が結集した邸宅。" data-en="A world-first residence, crafted by master artisans.">世界初、匠の技が結集した邸宅。</p>
    </div>
    <div className="craftsmen__visual">
      <figure className="craftsmen-photo__frame">
        <img src="/assets/images/craftsmen-group_sm.jpg" alt="匠たちの集合写真" className="craftsmen-photo__img" />
        <div className="craftsmen-photo__labels" aria-hidden="true">
          <span
            className="craftsmen-photo__label"
            dangerouslySetInnerHTML={{ __html: 'Ueji / Kongo Gumi / Kengo Kuma / Kenji Nakamura / Kokei Eri / Nakamura Sotoji Komuten' }}
          />
        </div>
      </figure>
    </div>
  </section>


  <section className="stage">
    <div className="stage__inner">
      <h2 className="stage__title">THE STAGE</h2>
      <div className="stage__row">
        <p className="stage__lead">舞台は、京文化発祥の地上七軒。</p>
        <nav className="stage__tabs">
          <button className="stage__tab is-active" type="button" data-tab="0">京都</button>
          <button className="stage__tab" type="button" data-tab="1">北野天満宮</button>
          <button className="stage__tab" type="button" data-tab="2">上七軒 - 旧長谷川邸</button>
          <button className="stage__tab" type="button" data-tab="3">エピソード</button>
        </nav>
      </div>
      <div className="stage__visual">
        <div className="stage__slide is-active" data-slide="0">
          <img src="/assets/images/culture/kyoto_sm.jpg" alt="京都" />
        </div>
        <div className="stage__slide" data-slide="1">
          <img src="/assets/images/culture/kitanotenmangu_sm.jpg" alt="北野天満宮" />
        </div>
        <div className="stage__slide" data-slide="2">
          <img src="/assets/images/culture/kamishichiken-kyuhasegawatei_sm.jpg" alt="上七軒 - 旧長谷川邸" />
        </div>
        <div className="stage__slide" data-slide="3">
          <img src="/assets/images/culture/episodo_sm.jpg" alt="エピソード" />
        </div>
        <div className="stage__info">
          <div className="stage__info-block is-active" data-info="0">
            <h3 className="stage__info-title">KYOTO</h3>
            <div className="stage__info-body">
              <p className="stage__info-text">千年の都・京都は、宮廷文化、宗教、茶道、庭園、建築、芸能、和食など日本文化の根幹を育み、世界へ継承し続ける稀有な都市。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="1">
            <h3 className="stage__info-title">KITANO TENMANGU</h3>
            <div className="stage__info-body">
              <p className="stage__info-text">宮廷文化と信仰、茶の湯と芸能が交差し花開いた北野。北野天満宮は学問のみならず、芸事文化の源流を今に伝える特別な聖地。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="2">
            <h3 className="stage__info-title">KAMISHICHIKEN</h3>
            <div className="stage__info-body">
              <p className="stage__info-text">北野天満宮の再建余材から生まれた上七軒は、世界最古級のサステナブル精神を宿す日本最古の花街。旧長谷川邸はその象徴。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="3">
            <h3 className="stage__info-title">EPISODE</h3>
            <div className="stage__info-body">
              <p className="stage__info-text">土方歳三と水上勉、時代を超えた人物が惹かれた上七軒。剣豪と文豪の物語が、この花街の静寂と奥行きを今に伝えています。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="stage-photo-text">
    <div className="stage-photo-text__inner">
      <p className="stage-photo__text" data-ja="和の文化「静寂」という名の至光品。" data-en="Japanese culture. A supreme treasure named &ldquo;Silence.&rdquo;"><span className="stage-photo__text-top">和の文化「静寂」という名の至光品。</span></p>
    </div>
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
          <img src="/assets/images/culture/kyoto_sm.jpg" alt="京都" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">千年の都が育んだ、日本文化の集積地</h4>
          <p className="detail-panel__paragraph">八世紀末、平安京遷都以来、千年以上もの間、日本の都としてあり続けた京都。宮廷文化、仏教、神道、茶道、庭園、建築、芸能、和食 ── 日本のアイデンティティの根幹を成すさまざまな要素はこの地で磨かれ、体系化され、現代へと受け継がれています。</p>
          <p className="detail-panel__paragraph">国宝・重要文化財に指定される社寺や庭園、町家建築の多くは「古都京都の文化財」として世界文化遺産にも登録されており、街そのものが貴重な歴史文化とひとつになった、大変稀有な存在です。</p>
          <p className="detail-panel__paragraph">また京都は、和食文化の中心地としても知られています。四季折々の食材を生かし、繊細な味と美しい盛り付けとともに、おもてなしの心を伝える京料理は、日本の歴史や芸術性を雅やかに体現。その価値は、京都にミシュランの星付き店が数多くあることからも見て取れます。</p>
          <p className="detail-panel__paragraph">このように、歴史・文化・景観・食が高い次元で融合する京都は、世界的な観光都市ランキングにおいても常に高い評価を受け続けています。京都は、日本の美意識と精神性が最も凝縮された、唯一無二の都市なのです。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="1">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="1">
        <span className="detail-panel__label">02</span>
        <h3 className="detail-panel__title">KITANO TENMANGU</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kitanotenmangu_sm.jpg" alt="北野天満宮" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">芸能文化が息づく、<br />特別な聖地</h4>
          <p className="detail-panel__paragraph">平安京の北に広がる地「北野」ー 北野は、天皇の住まう内裏に近く、宮廷の遊興の地として繁栄してきました。九世紀には天地の全ての神々・天神地祇（てんじんちぎ）が、十世紀初頭には雷神が、同じく十世紀中頃には学問の神・菅原道真公が祀られました。</p>
          <p className="detail-panel__paragraph">これらがやがてひとつにまとまり、「北野天満宮」という大社に発展し、現在では日本全国の天満宮・天神社約一万二千社の総本社として広く信仰を集めています。</p>
          <p className="detail-panel__paragraph">十六世紀、北野の地をこよなく愛した時の天下人・豊臣秀吉がこの地で催した「北野大茶湯」では、後の芸事文化の源流となる女性芸能者・出雲阿国が招聘され、現代の歌舞伎の基礎となる「かぶき踊り」を披露しました。これらは、茶の湯のみならず、芸事文化が一体となって花開いた象徴的な出来事としても知られています。こうした歴史的背景から、北野天満宮は学問の神として、また“芸事文化の発祥地”として、広く親しまれるようになりました。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="2">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="2">
        <span className="detail-panel__label">03</span>
        <h3 className="detail-panel__title">KAMISHICHIKEN</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kamishichiken-kyuhasegawatei_sm.jpg" alt="上七軒 - 旧長谷川邸" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">世界最古のサステナブルな花街</h4>
          <p className="detail-panel__paragraph">北野の地に創られた街・上七軒 ー 北野天満宮は、その歴史の中で幾度もの火災や地震に見舞われ、十五世紀中頃の大災では、社殿などの貴重な文化財が焼失してしまいました。その再建工事の際に生じた余材は、北野天満宮の東門前に創建された、参拝客の休み処となる七軒の茶屋建築の資材として使用されました。それこそが「上七軒」という、世界最古のサステナブル精神に基づいて創られた街の始まりと考えられています。</p>
          <p className="detail-panel__paragraph">十七世紀以降、芸舞妓の演舞を愛でながら食事やお酒を楽しむお茶屋遊びが流行したことで、上七軒は優雅な宮廷文化の流れを汲んだ “日本最古の花街” として、また織物の街・西陣の奥座敷として、繁栄に拍車をかけていきました。</p>
          <p className="detail-panel__paragraph">その街に佇むのが「旧 長谷川邸」という一邸です。上七軒のお茶屋の中でも北野天満宮に最も近い場所に佇み、一際広い敷地を有する格式高い邸宅として、二百年から三百年もの間賑わっていたと伝えられています。木造建築でありながら現代にその姿を残している、極めて歴史的価値の高い奇跡の邸宅です。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="3">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="3">
        <span className="detail-panel__label">04</span>
        <h3 className="detail-panel__title">EPISODE</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/episodo_sm.jpg" alt="エピソード" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead">偉人たちが愛した<br />上七軒・旧 長谷川邸</h4>
          <p className="detail-panel__paragraph">幕末と呼ばれる十九世紀半ばに、新選組副長として京都の治安を担ったのが、「ラスト・サムライ」の一人といわれる、土方歳三です。激動の時代を駆け抜けた彼もまた、上七軒を訪れていたと伝えられており、上七軒の舞妓との儚くも悲しい物語は、今もなお語り継がれています。剣と死が常に隣り合わせの日常で、この静かな花街に身を委ねるひとときは、土方にとってかけがえのない心の安らぎであったのかもしれません。しかし、近代化（大政奉還）の波に呑まれ、彼は京都を離れ戊辰戦争へと向かい、三十五歳の若さで武士としての生涯を遂げました。</p>
          <p className="detail-panel__paragraph">やがて時は下り、二十世紀半ば、上七軒・旧 長谷川邸に深い関心を寄せていたのが、日本の近代文学を代表する直木賞作家・水上勉です。著書『雁の宿』には、上七軒を舞台とした情景が描かれており、独特の視点と豊かな表現で数々の作品を世に送り出しています。</p>
          <p className="detail-panel__paragraph">上七軒、そして旧 長谷川邸は、多くの偉人、賢人、文化人たちに愛され、幾多の人生に寄り添ってきました。その歴史の面影は、今もなおこの地に息づいています。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="0">最初に戻る</button>
      </div>
    </div>
  </div>

  <AccessGate initialUnlocked={isUnlocked} isClientPreview={isClientPreview} isProduction={!isClientPreview && process.env.NODE_ENV === 'production'}>
  <>
  <section className="project-vision">
    <div className="project-vision__inner">
      <h2 className="project-vision__title">THE HISTORY MOVIE</h2>
      <ProjectVisionVideo />
      <p className="project-vision__subcopy">Story of “THE SILENCE - Furnished by ARMANI / CASA”</p>
    </div>
  </section>

  <section className="artisans-intro">
    <div className="artisans-intro__inner">
      <div className="artisans-intro__head">
        <h2 className="artisans-intro__title">
          <span className="artisans-intro__title-word">THE</span>
          <span className="artisans-intro__number">10</span>
          <span className="artisans-intro__title-word">MASTERS</span>
        </h2>
      </div>
      <div className="artisans-intro__copy-row">
        <p className="artisans-intro__jp">礎の匠</p>
        <p className="artisans-intro__lead">普遍の美と、<br />現代の技を融合。</p>
      </div>
    </div>
  </section>

  <section className="artisans-five">
    <div className="artisans-five__inner">
      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="0" aria-label="隈研吾の詳細を開く">
          <img src="/assets/images/artisans/kengokuma.webp" alt="隈研吾" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay artisan-card__overlay--light">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">Design Supervision</p>
            <h3 className="artisan-card__name">隈研吾</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="0" aria-label="隈研吾の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="1" aria-label="金剛組の詳細を開く">
          <img src="/assets/images/artisans/photo_1_sm.jpg" alt="金剛組" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">Construction</p>
            <h3 className="artisan-card__name">金剛組</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="1" aria-label="金剛組の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="2" aria-label="中村外二工務店の詳細を開く">
          <img src="/assets/images/artist_photo/photo_2.jpg" alt="中村外二工務店" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">Tea Room Construction</p>
            <h3 className="artisan-card__name">中村外二工務店</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="2" aria-label="中村外二工務店の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="4" aria-label="御庭植治の詳細を開く">
          <img src="/assets/images/artist_photo/onniwaueji_sm.jpg" alt="御庭植治" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">Landscape Design</p>
            <h3 className="artisan-card__name">御庭植治</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="4" aria-label="御庭植治の詳細">+</button>
        </div>
      </article>

      <article className="artisan-card">
        <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="3" aria-label="ARMANI / CASAの詳細を開く">
          <img src="/assets/images/artisans/armani:casa_sm.jpg" alt="ARMANI / CASA" className="artisan-card__image" />
        </button>
        <div className="artisan-card__overlay">
          <div className="artisan-card__copy">
            <p className="artisan-card__role">Furniture / Accessories</p>
            <h3 className="artisan-card__name">ARMANI / CASA</h3>
          </div>
          <button className="artisan-card__more" type="button" data-artisan="3" aria-label="ARMANI / CASAの詳細">+</button>
        </div>
      </article>
    </div>
  </section>

  <section className="artisans-color">
    <div className="artisans-color__inner">
      <h2 className="artisans-color__eyebrow">
        <span className="artisans-intro__title-word">THE</span>
        <span className="artisans-intro__number">10</span>
        <span className="artisans-intro__title-word">MASTERS</span>
      </h2>
      <div className="artisans-color__head">
        <h2 className="artisans-color__title">彩の匠</h2>
        <p className="artisans-color__lead">芸術という技で、<br />邸宅に至高の美を。</p>
      </div>
      <div className="artisans-color__gallery">
        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="5" aria-label="江里康慧の詳細を開く">
            <img src="/assets/images/artist_photo/koukei02-1_sm.jpg" alt="江里康慧" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay artisan-card__overlay--light">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Buddhist Sculptor</p>
              <h3 className="artisan-card__name">江里康慧</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="5" aria-label="江里康慧の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="6" aria-label="江里朋子の詳細を開く">
            <img src="/assets/images/artist_photo/tomoko_sm.jpg" alt="江里朋子" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Kirikane Artist</p>
              <h3 className="artisan-card__name">江里朋子</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="6" aria-label="江里朋子の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="7" aria-label="伊藤東凌の詳細を開く">
            <img src="/assets/images/artist_photo/toryo.jpg" alt="伊藤東凌" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role artisan-card__role--compact">Vice-Abbot of Ryosokuin Temple</p>
              <h3 className="artisan-card__name">伊藤東凌</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="7" aria-label="伊藤東凌の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="8" aria-label="裕人 礫翔の詳細を開く">
            <img src="/assets/images/artist_photo/IMG_1555.jpg" alt="裕人 礫翔" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Master Craftsman</p>
              <h3 className="artisan-card__name">裕人 礫翔</h3>
            </div>
            <button className="artisan-card__more" type="button" data-artisan="8" aria-label="裕人 礫翔の詳細">+</button>
          </div>
        </article>

        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="9" aria-label="和泉守兼定の詳細を開く">
            <img src="/assets/images/gallery/IzuminokamiKanesada/IZUMINOKAMIKANESADA.jpg" alt="和泉守兼定" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay artisan-card__overlay--light">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Japanese Sword</p>
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
      <div className="property-section__body">
        <h2 className="property-section__title">PROPERTY</h2>
        <p className="property-section__text">
          「日本」という至宝を「世界」の至光品へ。 <br />完成予想図および間取りの詳細は、物件詳細ページにてご覧ください。
        </p>
        <div className="property-section__buttons">
          <a href={isUnlocked ? '/property' : '#contact'} className="property-section__button">詳細を確認する</a>
          <a href={isUnlocked ? '/property#property-contact' : '#contact'} className="property-section__button property-section__button--contact">お問い合わせ</a>
        </div>
      </div>

      <SiteFooter />
    </div>
  </section>
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
            <p className="artisan-detail__role">Design Supervision</p>
            <p className="artisan-detail__jp">隈研吾 / 隈研吾建築都市設計事務所</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          1954年生まれ。1990年に隈研吾建築都市設計事務所を設立。慶應義塾大学教授、東京大学教授などを歴任し、現在は東京大学にて特別教授・名誉教授を務めるほか、多くの機関で教育・研究活動を推進。日本芸術院会員。
        </p>
        <p className="artisan-detail__text">
          木や石などの素材が持つ力や光の表情を繊細に引き出し、土地の記憶と工芸性を現代へとつなぐデザインを基軸に、住宅から文化施設、都市スケールのプロジェクトまで多彩に展開。自然・技術・人間の新しい関係を切り開く建築を世界へ問い続けている。
        </p>
        <p className="artisan-detail__text">
          事務所には国内外合わせて数百名に及ぶ設計のプロフェッショナルが所属し、それぞれの才能が30カ国以上で新たな潮流を生み出している。近年では室内装飾や食器・家具・インテリアなどのデザイン開発へと活動領域をさらに広げ、現在も数百を超えるプロジェクトがグローバルで進行中。これまでに50か国以上で手がけた建築群は、世界建築界の最高峰を象徴する存在として高い評価を受けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>根津美術館</li>
          <li>バンヤンツリー・東山京都</li>
          <li>V&amp;A Dundee</li>
          <li>梼原・木橋ミュージアム（高知県梼原町）</li>
          <li>UCCA 陶美術館</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="0" artisanName="KENGO KUMA" />
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
            <p className="artisan-detail__role">Construction</p>
            <p className="artisan-detail__jp">金剛組</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          西暦578年創業。千四百年以上にわたり日本の社寺建築を支えてきた、国宝級の技術を有する世界最古の企業。<br />
          その起源は、聖徳太子の命を受けて百済から招かれた三人の宮大工にあり、その中の一人、金剛重光が創業者とされている。日本初の官寺である四天王寺の建立を皮切りに、法隆寺や五重塔など、日本社寺建築の原点となる建造物を数多く手がけてきた。<br /><br />
          創業以来、金剛組は「社寺の造形美を形にし、建物を護り、後世に引き継ぐ」ことを使命とし、幾多の戦火や災禍に見舞われた社寺の再建に尽力。木の仕口や継ぎ手といった高度な伝統技法を継承・発展させてきた。<br /><br />
          現在も、永く建物を護持し、時代を超えて誇りを持てる仕事をするという理念のもと、文化財の修復や寺社仏閣の建造に関わり、日本建築の伝統を未来へと繋ぎ続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>四天王寺（国宝・重要文化財）</li>
          <li>法隆寺（国宝・世界遺産）※昭和大修理</li>
          <li>住吉大社（国宝）</li>
          <li>四天王寺五重塔（昭和再建）</li>
          <li>身延山久遠寺五重塔</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="1" artisanName="KONGO GUMI" />
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
            <p className="artisan-detail__role">Tea Room Construction</p>
            <p className="artisan-detail__jp">中村外二工務店</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          1931年創業。数寄屋大工の第一人者である棟梁・中村外二が創業した、京都を拠点とする伝統建築の工房。木肌がなめらかで材質に優れた北山磨き丸太などを用いた日本建築様式「数寄屋造り」を得意としている。<br /><br />
          中村外二は、裏千家御用達の作事方大工として伊勢神宮の茶室や海外の著名な茶室建築に携わり、材木への深い探求と精緻な仕事を融合させて独自の美意識を築き上げた。数寄屋建築の継承と発展に尽力したその精神は、現代の職人にも脈々と受け継がれている。<br /><br />
          現在も、京都迎賓館をはじめ、数々の料亭・旅館、さらには空港施設や住宅建築に至るまで、本物の素材が持つ質感と空間美を活かした作品を手がけている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>伊勢神宮茶室「霽月」</li>
          <li>ロックフェラー邸</li>
          <li>俵屋旅館（登録有形文化財）※改修・増築</li>
          <li>鶴屋吉信 本店「菓遊茶屋」</li>
          <li>松下幸之助邸茶室</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="2" artisanName="NAKAMURA SOTOJI" />
      </article>

      <article className="artisan-detail__content" data-artisan-detail="3">
        <img src="/assets/images/gallery/ARMANI/yirc2ihypiizkbj6mqpg.webp" alt="ARMANI / CASA" className="artisan-detail__portrait artisan-detail__portrait--wide" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">Furniture / Accessories</p>
            <p className="artisan-detail__jp">ARMANI / CASA</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          2000年にスタート。ジョルジオ・アルマーニの哲学が息づくインテリアホームコレクション。家具からホームアクセサリーに至るまで、ジョルジオ・アルマーニが築いた美意識が反映された幅広いラインナップを展開し、洗練された生活空間をグローバルな視点から提案している。<br /><br />
          建築物のコンセプトや住まう人の上質な暮らしに寄り添うかたちで、家具やホームアクセサリー、照明、そしてエクスクルーシブなファブリックまでを一貫してデザイン。空間全体を統合的に演出することで、スタイリッシュでエレガントなクリエイティブ空間を創出している。<br /><br />
          現在も、世界各国の高級レジデンスやホテル、プライベート空間のインテリアを手がけ、ライフスタイルそのものを提案するコレクションとして展開を続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>アルマーニホテル（ミラノ、ドバイ）</li>
          <li>世界各国の高級レジデンス</li>
          <li>プライベートヨット インテリア</li>
          <li>高級ブティックホテル</li>
          <li>プレミアムマンション インテリア監修</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="3" artisanName="ARMANI / CASA" />
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
            <p className="artisan-detail__role">Landscape Design</p>
            <p className="artisan-detail__jp">御庭植治</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          19世紀後半から20世紀初頭にかけて近代日本庭園の礎を築いた、京都の作庭家・庭師一門。七代目・小川治兵衛（1860–1933）は、比叡山や東山、琵琶湖疏水といった周辺の自然景観を庭園構成に取り込み、地形や水の流れを生かした自然主義的な庭園様式を確立し、近代日本庭園の発展に大きな影響を与えた。<br /><br />
          無鄰菴、平安神宮神苑、円山公園、南禅寺界隈の別邸庭園など、今日の京都の景観形成に深く関わる数多くの名庭を手がけ、その一部は庭園分野で最高位とされる国指定名勝に認定されている。<br /><br />
          現在も、十一代目当主・小川治兵衛（雅史氏）のもと、次期十二代として御庭植治株式会社代表取締役を務める小川勝章氏を中心に、国指定名勝をはじめとする文化財庭園の修復・維持管理、ならびに歴史的建築と調和する庭園の作庭に尽力し、京都の庭園文化を継承する存在として活動を続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>無鄰菴（国指定名勝）</li>
          <li>平安神宮 神苑（国指定名勝）</li>
          <li>旧古河庭園（国指定名勝）</li>
          <li>円山公園（国指定名勝）</li>
          <li>清風荘（国指定重要文化財）</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="4" artisanName="ONNIWA UEJI" />
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
            <p className="artisan-detail__role">Buddhist Sculptor</p>
            <p className="artisan-detail__jp">江里康慧</p>
          </div>
          <p className="artisan-detail__en">KOKEI ERI</p>
        </div>
        <p className="artisan-detail__text">
          1943年生まれ。仏師・江里宗平の長男として京都に生まれた、仏像彫刻の第一人者。現代の仏師の中で、人間国宝に最も近い人物の一人と称されている。伝統的な木彫技法に現代的な感性を融合させ、独創性と精神性の高い作品を制作している。<br /><br />
          「仏は彫る前からすでに木の中にいらっしゃる。仏師は周りの余分な部分を払いのけるだけだ」という信条と、「仏師は修行者であり続ける」という思想のもと活動を続け、国内外から高い評価を受けている。<br /><br />
          1989年に三千院より大仏師号を賜り、2003年には妻・截金師の江里佐代子とともに京都府文化賞功労賞を、2007年には第41回仏教伝道文化賞を受賞。著書に『仏師という生き方』『京都の仏師が語る　眼福の仏像』などがある。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>釈迦如来三尊像</li>
          <li>夢窓国師頂相像</li>
          <li>京都迎賓館 仏像彫刻</li>
          <li>中尊寺 奉納仏像（世界遺産関連）</li>
          <li>平安仏所における仏像制作活動</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="5" artisanName="KOKEI ERI" />
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
            <p className="artisan-detail__role">Kirikane Artist</p>
            <p className="artisan-detail__jp">江里朋子</p>
          </div>
          <p className="artisan-detail__en">ERI TOMOKO</p>
        </div>
        <p className="artisan-detail__text">
          1972年生まれ。截金師。人間国宝・江里佐代子の長女として京都に生まれ、母より伝統的な截金技法を継承した工芸作家。京都芸術短期大学で日本画を学んだのち、母・佐代子のもとで截金の手ほどきを受け、その精緻な技を習得。2011年の第58回日本伝統工芸展では日本工芸会新人賞を受賞し、2015年には日本工芸会正会員に認定されるなど、実力派の工芸作家として広く認められている。<br /><br />
          金箔・銀箔・プラチナ箔を数枚焼き合わせ、竹刀で極細の線状や幾何学形に切り出した截金を、筆先で丁寧に貼り重ねることで文様を描き出す。仏像に施す荘厳の技として受け継がれてきたこの技法を、飾筥や棗、香合といった茶道具・工芸品へと応用展開し、静謐で荘厳な輝きを現代の生活空間へと繋いでいる。<br /><br />
          現在も、父・仏師江里康慧とともに、仏教美術の伝統を次世代へと繋ぐ活動に取り組んでいる。
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
        <ArtisanProfessionalsGallery artisanId="6" artisanName="ERI TOMOKO" />
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
            <p className="artisan-detail__role artisan-detail__role--compact">Vice-Abbot of Ryosokuin Temple</p>
            <p className="artisan-detail__jp">伊藤東凌</p>
          </div>
          <p className="artisan-detail__en">ITO TORYO</p>
        </div>
        <p className="artisan-detail__text">
          1980年生まれ。建仁寺僧堂にて修行後、2008年両足院の副住職に就任。これまで伝統文化に現代美術やマインドフルネスを組み合わせ、新しい仏教の表現を提案してきた。<br /><br />
          海外での活動も多く、米国Meta(旧Facebook)本社などで禅指導を行う。国内では任天堂創業家による山内財団の評議員ほか、企業エグゼクティブへ向けたコーチングも担当。<br /><br />
          ホテルの空間デザイン、アパレルブランドなどの監修も手がける。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li>両足院 坐禅指導</li>
          <li>InTrip 瞑想アプリ</li>
          <li>著書『月曜瞑想』</li>
          <li>Forbes JAPAN「NEXT100」（2023年）選出</li>
          <li>Newsweek「世界が尊敬する日本人100」</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="7" artisanName="ITO TORYO" />
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
            <p className="artisan-detail__role">Master Craftsman</p>
            <p className="artisan-detail__jp">裕人 礫翔</p>
          </div>
          <p className="artisan-detail__en">HIROTO RAKUSHO</p>
        </div>
        <p className="artisan-detail__text">
          1962年、京都・西陣生まれ。経済産業省認定 伝統工芸士、箔アーティスト。父であり京都市伝統産業技術功労者の西山治作氏に師事し、箔工芸技術を学ぶ。2002年に自身のブランド「裕人礫翔」を設立。<br /><br />
          独自の特許技術により、経年劣化した金箔や文化財の質感を再現する手法を確立。国宝「風神雷神図屏風」（建仁寺）、南禅寺、妙心寺、二条城、名古屋城などの障壁画の複製を手掛ける。<br /><br />
          さらに、従来引き立て役とされてきた金・銀・プラチナなどの金属箔を主役に用いた空間デザインや工芸美術などのアート作品を創造し、日本のみならずニューヨーク、パリ、上海、クウェートなどで国際的に活動。各方面から高い評価を受けている。ルーブル美術館、G8洞爺湖サミット、上海万博などでも展示の実績がある。
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
        </ul>
        <ArtisanProfessionalsGallery artisanId="8" artisanName="HIROTO RAKUSHO" />
      </article>

      <article className="artisan-detail__content" data-artisan-detail="9">
        <img src="/assets/images/gallery/IzuminokamiKanesada/IZUMINOKAMIKANESADA.jpg" alt="和泉守兼定" className="artisan-detail__portrait artisan-detail__portrait--wide" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">Japanese Sword</p>
            <p className="artisan-detail__jp">和泉守兼定</p>
          </div>
        </div>
        <p className="artisan-detail__text">
          十一代 和泉守兼定幕末期（19世紀中頃）室町後期の名工・二代目兼定（之定）を祖とする系譜に連なる刀工の名跡とされる。十一代目にあたる会津兼定は、会津藩主・松平容保に仕えた刀工として知られ、新選組副長・土方歳三の佩刀を打ったと伝えられている。<br /><br />
          一方で、その刀は実戦で用いられることがなかったともされ、人を斬っていない刀として語られることがある。この点において、極めて稀少な存在と考えられている。<br /><br />
          ある刀剣関連書籍では、「実戦を経ていないその刃は、純粋な造形美としての価値を今に伝える」といった趣旨の記述も見られる。<br /><br />
          こうした背景から、機能性だけでなく、美術工芸としての側面においても高い評価を受け、観賞・展示用途においても特異な価値を有する刀とされている。
        </p>
        <ArtisanProfessionalsGallery artisanId="9" artisanName="日本刀" />
      </article>
    </div>
  </div>
  </>
  </AccessGate>
      <SiteBehavior />
    </>
  );
}
