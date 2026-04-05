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
    '/assets/images/gallery/ARMANI/passadddasda.png',
    '/assets/images/gallery/ARMANI/lajktmwt8noo7lcel18e_sm.jpg',
    '/assets/images/gallery/ARMANI/yirc2ihypiizkbj6mqpg.webp',
  ],
  '4': [
    '/assets/images/gallery/OniwaUeji/oniwa2.jpg',
    '/assets/images/gallery/OniwaUeji/oniwa3.JPEG',
    '/assets/images/gallery/OniwaUeji/oniwa1.JPG',
    '/assets/images/gallery/OniwaUeji/oniwa4.JPEG',
    '/assets/images/gallery/OniwaUeji/oniwa5.JPG',
  ],
  '5': [
    '/assets/images/gallery/KoukeiEri/4koukei.jpg',
    '/assets/images/gallery/KoukeiEri/3koukei.JPG',
    '/assets/images/gallery/KoukeiEri/5koukei.jpg',
    '/assets/images/gallery/KoukeiEri/1koukei.jpg',
  ],
  '6': [
    '/assets/images/gallery/TomokoEri/2TomokoEri.jpg',
    '/assets/images/gallery/TomokoEri/5TomokoEri.jpg',
    '/assets/images/gallery/TomokoEri/4TomokoEri.jpg',
  ],
  '7': [
    '/assets/images/gallery/ToryoIto/P1001331.jpg',
    '/assets/images/gallery/ToryoIto/_H3I3778.jpg',
    '/assets/images/gallery/ToryoIto/P1061826.jpg',
    '/assets/images/gallery/ToryoIto/ryosokuin_250808_0194.jpg',
    '/assets/images/gallery/ToryoIto/kv-100.jpg',
  ],
  '8': [
    '/assets/images/gallery/HirotoRakusho/IMG_1554.jpg',
    '/assets/images/gallery/HirotoRakusho/IMG_1555.webp',
    '/assets/images/gallery/HirotoRakusho/IMG_1561-1166x656.webp',
    '/assets/images/gallery/HirotoRakusho/IMG_1589.png',
    '/assets/images/gallery/HirotoRakusho/IMG_1567.webp',
  ],
  '9': [
    '/assets/images/gallery/IzuminokamiKanesada/toshizo0.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/imag528.jpg',
    '/assets/images/gallery/IzuminokamiKanesada/i-img1097x1184-17732096951202lsfbxs9610-2.jpg',
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
            className={`artisan-detail__gallery-image${src.includes('kv-100') ? ' artisan-detail__gallery-image--full' : ''}${src.includes('toshizo0') ? ' artisan-detail__gallery-image--portrait' : ''}`}
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
  const rightStoryTextEn = 'Weaving the beauty of Japan into the world a thousand years from now.';
  const rightStoryTextZhHans = '将日本之「美」，织就于千年后的世界。';
  const rightStoryTextZhHant = '將日本之「美」，織就於千年之後的世界。';
  const leftStoryText = '';

  return (
    <>
  <div className="top-fixed-header">
    <SiteHeader
      navItems={[
      { labelJa: 'TOP', labelEn: 'TOP', target: '.hero' },
      { labelJa: 'PROPERTY', labelEn: 'PROPERTY', target: isUnlocked ? '.property-section' : '.registration' },
      { labelJa: 'CONTACT', labelEn: 'CONTACT', target: '.registration' },
      ]}
    />
  </div>
  <div className="hero-story-scene">
    <section className="hero">
      <div className="hero__bg hero__bg--video">
        <iframe
          className="hero__video hero__video--desktop"
          src="https://player.vimeo.com/video/1171460733?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          loading="eager"
          title="THESILENCE_LPtop_desktop"
        ></iframe>
        <iframe
          className="hero__video hero__video--mobile"
          src="https://player.vimeo.com/video/1180212166?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          loading="eager"
          title="THESILENCE_LPtop_mobile"
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
          <img src="/assets/images/THE%20SILENCE_Logo_white.png" alt="" className="hero-intro__mark-logo" />
        </div>
      </div>
      <div className="hero__center-title-wrap">
        <span className="hero__center-title-text">THE TIMELESS CONDOMINIUM</span>
      </div>
    </section>

    <div className="hero-story-scene__logo-track" aria-hidden="true">
      <div className="hero-story-scene__logo-sticky">
        <div className="floating-logo">
          <div className="center-block hero__logo-overlay">
          </div>
          <div className="floating-logo__main">
            <img src="/assets/images/THE%20SILENCE_Logo_white.png" alt="" className="floating-logo__image" />
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
            data-en={rightStoryTextEn} data-zh-hans={rightStoryTextZhHans} data-zh-hant={rightStoryTextZhHant}
          />
        </div>
      </div>
    </section>
  </div>


  <section className="craftsmen" data-visible-threshold="0.3">
    <div className="craftsmen__sticky">
      <p className="craftsmen__heading" data-ja="世界初、匠の技が結集した邸宅。" data-en="The world&#39;s first residence, where master craftsmanship converges." data-zh-hans="世界首创，汇聚匠心技艺之邸宅。" data-zh-hant="世界首創，匠心技藝薈萃之邸宅。">世界初、匠の技が結集した邸宅。</p>
    </div>
    <div className="craftsmen__visual">
      <figure className="craftsmen-photo__frame">
        <img src="/assets/images/craftsmen-group_sm.jpg" alt="匠たちの集合写真" className="craftsmen-photo__img" />
        <div className="craftsmen-photo__labels" aria-hidden="true">
          <span className="craftsmen-photo__label">Ueji</span>
          <span className="craftsmen-photo__label">Kongo Gumi</span>
          <span className="craftsmen-photo__label">Kengo Kuma</span>
          <span className="craftsmen-photo__label">Kenji Nakamura</span>
          <span className="craftsmen-photo__label">Kokei Eri</span>
          <span className="craftsmen-photo__label">Nakamura Sotoji Komuten</span>
        </div>
      </figure>
    </div>
  </section>


  <section className="stage">
    <div className="stage__inner">
      <h2 className="stage__title">THE STAGE</h2>
      <div className="stage__row">
        <p className="stage__lead" data-ja="舞台は、京文化発祥の地、上七軒。" data-en="The stage: Kamishichiken, the birthplace of Kyoto&#39;s cultural heritage." data-zh-hans="舞台，落于京文化肇始之地——上七轩（Kamishichiken）。" data-zh-hant="舞台，落於京文化肇始之地——上七軒（Kamishichiken）。">舞台は、京文化発祥の地、上七軒。</p>
        <nav className="stage__tabs">
          <button className="stage__tab is-active" type="button" data-tab="0" data-ja="京都" data-en="Kyoto" data-zh-hans="关于京都" data-zh-hant="京都">京都</button>
          <button className="stage__tab" type="button" data-tab="1" data-ja="北野天満宮" data-en="Kitano Tenmangu" data-zh-hans="关于北野天满宫" data-zh-hant="關於北野天滿宮">北野天満宮</button>
          <button className="stage__tab" type="button" data-tab="2" data-ja="上七軒" data-en="Kamishichiken" data-zh-hans="关于上七轩" data-zh-hant="關於上七軒">上七軒</button>
          <button className="stage__tab" type="button" data-tab="3" data-ja="エピソード" data-en="Episode" data-zh-hans="故事" data-zh-hant="記">エピソード</button>
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
              <p className="stage__info-text" data-ja="千年の都・京都は、宮廷文化、宗教、茶道、庭園、建築、芸能、和食など日本文化の根幹を育み、世界へ継承し続ける稀有な都市。" data-en="Kyoto, the ancient capital of a thousand years, has cultivated the essence of Japanese culture, from courtly traditions and spirituality to tea ceremony, gardens, architecture, performing arts, and cuisine, continuing to share its legacy with the world as a city unlike any other." data-zh-hans="千年古都京都，孕育了宫廷文化、宗教信仰、茶道、庭园、建筑、艺能与和食等日本文化之根脉，并恒久流转于世界，独成其境。" data-zh-hant="千年古都京都，孕育宮廷文化、宗教信仰、茶道、庭園、建築、藝能與和食等日本文化之根脈，並恆久流轉於世界，獨成其境。">千年の都・京都は、宮廷文化、宗教、茶道、庭園、建築、芸能、和食など日本文化の根幹を育み、世界へ継承し続ける稀有な都市。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="1">
            <h3 className="stage__info-title">KITANO TENMANGU</h3>
            <div className="stage__info-body">
              <p className="stage__info-text" data-ja="宮廷文化と信仰、茶の湯と芸能が交差し花開いた北野。北野天満宮は学問のみならず、芸事文化の源流を今に伝える特別な聖地。" data-en="In Kitano, where courtly culture meets devotion, tea and the performing arts blossom in harmony. Kitano Tenmangu stands as a sacred legacy, preserving not only the pursuit of learning, but the very roots of Japan&#39;s artistic traditions." data-zh-hans="宫廷文化与信仰、茶道与艺能在北野交汇而盛。北野天满宫（Kitano Tenmangu Shrine）不仅是学问所归之地，亦承载艺能文化之源流，延续至今。" data-zh-hant="宮廷文化與信仰、茶道與藝能於北野交匯而盛。北野天滿宮（Kitano Tenmangu Shrine），不僅為學問所歸之地，亦承載藝能文化之源流，延續至今。">宮廷文化と信仰、茶の湯と芸能が交差し花開いた北野。北野天満宮は学問のみならず、芸事文化の源流を今に伝える特別な聖地。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="2">
            <h3 className="stage__info-title">KAMISHICHIKEN</h3>
            <div className="stage__info-body">
              <p className="stage__info-text" data-ja="北野天満宮の再建余材から生まれた上七軒は、世界最古級のサステナブル精神を宿す日本最古の花街。旧長谷川邸はその象徴。" data-zh-hans="由北野天满宫重建剩余木材孕育而生的上七轩（Kamishichiken），承载世界最古老可持续发展精神，为日本最古之花街（Hanamachi，历史艺伎街区）。旧长谷川邸（Former Hasegawa Residence），正是这一精神的象征。" data-zh-hant="由北野天滿宮重建餘材所生的上七軒，承載世界最古層級的可持續精神，為日本最古之花街。舊長谷川邸，為其象徵。" data-en={"Emerging from the salvaged timbers of Kitano Tenmangu\u2019s reconstruction, Kamishichiken is Japan\u2019s oldest hanamachi (geisha district) imbued with a spirit of sustainability ahead of its time. The former Hasegawa Residence remains in its timeless emblem."}>北野天満宮の再建余材から生まれた上七軒は、世界最古級のサステナブル精神を宿す日本最古の花街。旧長谷川邸はその象徴。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
          <div className="stage__info-block" data-info="3">
            <h3 className="stage__info-title">EPISODE</h3>
            <div className="stage__info-body">
              <p className="stage__info-text" data-ja="土方歳三と水上勉、時代を超えた人物が惹かれた上七軒。剣豪と文豪の物語が、この花街の静寂と奥行きを今に伝えています。" data-en="Kamishichiken, where figures across the ages, from the swordsman Toshizo Hijikata to the literary master Tsutomu Mizukami, have found inspiration. Their legacies, of blade and of words, still echo through the stillness and profound depth of this hanamachi." data-zh-hans="土方岁三（Hijikata Toshizo）与水上勉（Mizukami Tsutomu）——跨越时代的两位人物，皆为上七轩所吸引。剑与文的叙事，至今仍诉说着这座花街的静谧与深邃。" data-zh-hant="土方歲三（Hijikata Toshizo）與水上勉（Mizukami Tsutomu）——跨越時代的兩位人物，皆為上七軒所吸引。劍與文的敘事，至今映照著這座花街的靜謐與深遠。">土方歳三と水上勉、時代を超えた人物が惹かれた上七軒。剣豪と文豪の物語が、この花街の静寂と奥行きを今に伝えています。</p>
              <button className="stage__more-link" type="button">VIEW MORE<span className="stage__more-arrow">→</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="stage-photo-text">
    <div className="stage-photo-text__inner">
      <p className="stage-photo__text" data-ja="和の文化「静寂」という名の至光品。" data-en={'Japanese culture. A supreme treasure named \u201CSilence.\u201D'} data-zh-hans="和之文化，名为「静寂」的至光之品。" data-zh-hant="和之文化——名為「寂靜」的至臻之境"><span className="stage-photo__text-top">和の文化「静寂」という名の至光品。</span></p>
    </div>
  </section>

  <div className="registration-popup" id="registrationPopup">
    <div className="registration-popup__overlay" data-registration-close></div>
    <div className="registration-popup__body">
      <button className="registration-popup__close" type="button" data-registration-close aria-label="閉じる">
        <span></span><span></span>
      </button>
      <div className="registration-popup__inner">
        <h2 className="registration__title">REGISTRATION</h2>
        <p className="registration__text">
          この先の内容をご覧いただくには、ご登録が必要となります。<br />
          プロジェクトの詳細や世界の匠たちが織りなす物語を、ぜひご体感ください。<br />
          ご登録は無料で承っております。
        </p>
        <a href="/property" className="registration__button" data-ja="詳細を確認する" data-en="View Details" data-zh-hans="查看详情" data-zh-hant="查看詳情">詳細を確認する</a>
      </div>
    </div>
  </div>

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
          <h4 className="detail-panel__lead" data-ja="千年の都が育んだ、日本文化の集積地" data-en="The ancient capital that nurtured Japanese culture" data-zh-hans="千年所聚，日本文化之境" data-zh-hant="千年所聚，日本文化之境">千年の都が育んだ、日本文化の集積地</h4>
          <p className="detail-panel__paragraph" data-ja="八世紀末、平安京遷都以来、千年以上もの間、日本の都としてあり続けた京都。宮廷文化、仏教、神道、茶道、庭園、建築、芸能、和食 ── 日本のアイデンティティの根幹を成すさまざまな要素はこの地で磨かれ、体系化され、現代へと受け継がれています。" data-zh-hans="自八世纪末平安京迁都以来，京都作为日本首都绵延千年。宫廷文化、佛教、神道、茶道、庭园、建筑、艺能、和食——构成日本民族精神核心的诸多元素，皆于此淬炼、成形，并延续至今。" data-zh-hant="自八世紀末平安京遷都以來，京都作為日本首都綿延千年。宮廷文化、佛教、神道、茶道、庭園、建築、藝能、和食——構成日本民族精神核心的諸多元素，皆於此淬鍊、成形，並延續至今。" data-en="Since the founding of Heian-kyo in the late eighth century, Kyoto has endured as Japan&#39;s capital for over a millennium. Here, the essence of Japanese identity, courtly culture, Buddhism, Shinto, tea ceremony, gardens, architecture, performing arts, and cuisine was cultivated, refined, and woven into a legacy that continues to this day.">八世紀末、平安京遷都以来、千年以上もの間、日本の都としてあり続けた京都。宮廷文化、仏教、神道、茶道、庭園、建築、芸能、和食 ── 日本のアイデンティティの根幹を成すさまざまな要素はこの地で磨かれ、体系化され、現代へと受け継がれています。</p>
          <p className="detail-panel__paragraph" data-ja="国宝・重要文化財に指定される社寺や庭園、町家建築の多くは「古都京都の文化財」として世界文化遺産にも登録されており、街そのものが貴重な歴史文化とひとつになった、大変稀有な存在です。" data-zh-hans="众多被指定为国宝或重要文化财的社寺、庭园及町家建筑，已作为『古都京都的文化财』列入联合国教科文组织（UNESCO）世界文化遗产名录。整座城市与历史浑然一体，举世罕有。" data-zh-hant="眾多被指定為國寶或重要文化財的社寺、庭園及町家建築，已作為「古都京都的文化財」列入聯合國教科文組織（UNESCO）世界文化遺產名錄。整座城市與歷史渾然一體，舉世罕有。" data-en={'Shrines and temples, gardens, and machiya architecture, many designated as National Treasures and Important Cultural Properties are inscribed as part of the UNESCO World Heritage \u201CHistoric Monuments of Ancient Kyoto.\u201D Here, the city itself becomes a rare existence, where living history and culture are woven into one.'}>国宝・重要文化財に指定される社寺や庭園、町家建築の多くは「古都京都の文化財」として世界文化遺産にも登録されており、街そのものが貴重な歴史文化とひとつになった、大変稀有な存在です。</p>
          <p className="detail-panel__paragraph" data-ja="また京都は、和食文化の中心地としても知られています。四季折々の食材を生かし、繊細な味と美しい盛り付けとともに、おもてなしの心を伝える京料理は、日本の歴史や芸術性を雅やかに体現。その価値は、京都にミシュランの星付き店が数多くあることからも見て取れます。" data-en="Kyoto is celebrated as the epicenter of kyo-ryori Japanese culinary culture. Embracing the seasons, Kyoto cuisine conveys a spirit of hospitality omotenashi through exquisite flavors and elegant presentation, gracefully embodying the history and artistry of Japan. This distinction is evident in the city&#39;s remarkable number of Michelin-starred restaurants." data-zh-hans="京都亦为和食文化之核心所在。京料理顺应四时之味，以细腻滋味与雅致呈现，传递待客之心，含蓄展现日本的历史深度与艺术气韵。其价值，从京都汇聚众多米其林（Michelin）星级餐厅，亦可见一斑。" data-zh-hant="京都亦為和食文化之核心所在。京料理順應四時之味，以細膩滋味與雅致呈現，傳遞待客之心，含蓄展現日本的歷史深度與藝術氣韻。其價值，從京都匯聚眾多米其林（Michelin）星級餐廳，亦可見一斑。">また京都は、和食文化の中心地としても知られています。四季折々の食材を生かし、繊細な味と美しい盛り付けとともに、おもてなしの心を伝える京料理は、日本の歴史や芸術性を雅やかに体現。その価値は、京都にミシュランの星付き店が数多くあることからも見て取れます。</p>
          <p className="detail-panel__paragraph" data-ja="このように、歴史・文化・景観・食が高い次元で融合する京都は、世界的な観光都市ランキングにおいても常に高い評価を受け続けています。京都は、日本の美意識と精神性が最も凝縮された、唯一無二の都市なのです。" data-en="Where history, culture, landscape, and cuisine exist in perfect harmony, Kyoto continues to be celebrated among the world&#39;s leading destinations. A city unlike any other, it embodies the very essence of Japan&#39;s aesthetic and spiritual identity." data-zh-hans="历史、文化、景观与饮食于高维交融的京都，始终在全球城市评价中备受推崇。京都，是日本美学与精神最为凝练之地，亦是无可替代的存在。" data-zh-hant="歷史、文化、景觀與飲食於高維交融的京都，始終於全球城市評價中備受推崇。京都，是日本美學與精神最為凝鍊之地，亦是無可替代的存在。">このように、歴史・文化・景観・食が高い次元で融合する京都は、世界的な観光都市ランキングにおいても常に高い評価を受け続けています。京都は、日本の美意識と精神性が最も凝縮された、唯一無二の都市なのです。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="1" data-ja="次のセクションへ" data-en="Next Section" data-zh-hans="下一章节" data-zh-hant="前往下一個章節">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="1">
        <span className="detail-panel__label">02</span>
        <h3 className="detail-panel__title">KITANO TENMANGU</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kitanotenmangu_sm.jpg" alt="北野天満宮" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead" data-ja="芸能文化が息づく、特別な聖地" data-en="A sacred realm where the legacy of the performing arts endures." data-zh-hans="艺能流转之地，静谧而深远" data-zh-hant="藝能流轉之地，靜謐而深遠">芸能文化が息づく、<br />特別な聖地</h4>
          <p className="detail-panel__paragraph" data-ja="平安京の北に広がる地「北野」ー 北野は、天皇の住まう内裏に近く、宮廷の遊興の地として繁栄してきました。九世紀には天地の全ての神々・天神地祇（てんじんちぎ）が、十世紀初頭には雷神が、同じく十世紀中頃には学問の神・菅原道真公が祀られました。" data-en="North of Heian-kyo unfolds Kitano, a land that prospered as a refined retreat of the court, near the Imperial Palace. Here, the deities of heaven and earth were first enshrined in the ninth century, followed by the god of thunder in the early tenth century, and later Sugawara no Michizane, the revered patron of learning, in the mid-tenth century." data-zh-hans="『北野』，坐落于平安京以北，因毗邻天皇御所，自古即为宫廷游兴之地。九世纪，天地诸神（天神地祇）在此受祀；十世纪初，雷神亦被供奉；同世纪中叶，学问之神菅原道真公（Sugawara no Michizane）亦于此安奉。" data-zh-hant="「北野」，坐落於平安京以北。因毗鄰天皇御所，自古即為宮廷遊興之地。九世紀，天地諸神（天神地祇）於此受祀；十世紀初，雷神亦被供奉；同世紀中葉，學問之神菅原道真公（Sugawara no Michizane）亦於此安奉。">平安京の北に広がる地「北野」ー 北野は、天皇の住まう内裏に近く、宮廷の遊興の地として繁栄してきました。九世紀には天地の全ての神々・天神地祇（てんじんちぎ）が、十世紀初頭には雷神が、同じく十世紀中頃には学問の神・菅原道真公が祀られました。</p>
          <p className="detail-panel__paragraph" data-ja="これらがやがてひとつにまとまり、「北野天満宮」という大社に発展し、現在では日本全国の天満宮・天神社約一万二千社の総本社として広く信仰を集めています。" data-en="In time, these sacred elements converged into the great shrine of Kitano Tenmangu, now revered as the head of 12,000 Tenmangu and Tenjin shrines throughout Japan, and a place of enduring devotion." data-zh-hans="诸神信仰由此汇流，渐成「北野天满宫」这一大社。时至今日，作为日本约一万二千座天满宫、天神社之总本社，信仰绵延不绝。" data-zh-hant="諸神信仰由此匯流，漸成「北野天滿宮」這一大社。時至今日，作為日本約一萬二千座天滿宮、天神社之總本社，信仰綿延不絕。">これらがやがてひとつにまとまり、「北野天満宮」という大社に発展し、現在では日本全国の天満宮・天神社約一万二千社の総本社として広く信仰を集めています。</p>
          <p className="detail-panel__paragraph" data-ja="十六世紀、北野の地をこよなく愛した時の天下人・豊臣秀吉がこの地で催した「北野大茶湯」では、後の芸事文化の源流となる女性芸能者・出雲阿国が招聘され、現代の歌舞伎の基礎となる「かぶき踊り」を披露しました。これらは、茶の湯のみならず、芸事文化が一体となって花開いた象徴的な出来事としても知られています。こうした歴史的背景から、北野天満宮は学問の神として、また「芸事文化の発祥地」として、広く親しまれるようになりました。" data-en="In the sixteenth century, the warlord Hideyoshi Toyotomi, then the most powerful figure in Japan and a devoted patron of Kitano, held the legendary Kitano Grand Tea Gathering here. Invited to perform was Izumo no Okuni, a pioneering female entertainer who introduced kabuki odori, the precursor to modern Kabuki. This moment has come to symbolize a rare convergence, where the tea ceremony and the performing arts blossomed as one. From this extraordinary heritage, Kitano Tenmangu Shrine has come to be revered not only as a guardian of scholarship, but as the sacred birthplace of Japan&#39;s arts and performance culture." data-zh-hans="十六世纪，钟爱北野之地的天下人丰臣秀吉（Toyotomi Hideyoshi）在此举办『北野大茶汤』。其间，艺能文化之源的女性艺人出云阿国（Izumo no Okuni）应召献艺，演绎的『歌舞伎踊（かぶき踊り）』，为后世歌舞伎之滥觞。由此深厚历史渊源，北野天满宫既为学问之所归，亦被视为『艺能文化发祥之地』。" data-zh-hant="十六世紀，鍾愛北野之地的天下人豐臣秀吉（Toyotomi Hideyoshi）於此舉行「北野大茶湯」。其間，藝能文化之源的女性藝人出雲阿國（Izumo no Okuni）應召獻藝，演繹「歌舞伎踊（かぶき踊り）」，為後世歌舞伎之濫觴。由此深厚歷史淵源，北野天滿宮既為學問之所歸，亦被視為「藝能文化發祥之地」。">十六世紀、北野の地をこよなく愛した時の天下人・豊臣秀吉がこの地で催した「北野大茶湯」では、後の芸事文化の源流となる女性芸能者・出雲阿国が招聘され、現代の歌舞伎の基礎となる「かぶき踊り」を披露しました。これらは、茶の湯のみならず、芸事文化が一体となって花開いた象徴的な出来事としても知られています。こうした歴史的背景から、北野天満宮は学問の神として、また"芸事文化の発祥地"として、広く親しまれるようになりました。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="2" data-ja="次のセクションへ" data-en="Next Section" data-zh-hans="下一章节" data-zh-hant="前往下一個章節">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="2">
        <span className="detail-panel__label">03</span>
        <h3 className="detail-panel__title">KAMISHICHIKEN</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/kamishichiken-kyuhasegawatei_sm.jpg" alt="上七軒 - 旧長谷川邸" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead" data-ja="世界最古のサステナブルな花街" data-en={"The World\u2019s Most Ancient Sustainable Hanamachi"} data-zh-hans="世界最古可持续发展花街" data-zh-hant="世界最古可持續花街">世界最古のサステナブルな花街</h4>
          <p className="detail-panel__paragraph" data-ja="北野の地に創られた街・上七軒 ー 北野天満宮は、その歴史の中で幾度もの火災や地震に見舞われ、十五世紀中頃の大災では、社殿などの貴重な文化財が焼失してしまいました。その再建工事の際に生じた余材は、北野天満宮の東門前に創建された、参拝客の休み処となる七軒の茶屋建築の資材として使用されました。それこそが「上七軒」という、世界最古のサステナブル精神に基づいて創られた街の始まりと考えられています。" data-en="Kamishichiken, born of Kitano&#39;s very essence, emerged from an act of quiet renewal. Through centuries of fire and earthquakes, Kitano Tenmangu stood resilient; yet in the mid-fifteenth century, flames claimed many of its sacred forms. From what remained, timber was reborn as seven teahouses at the shrine&#39;s eastern gate, welcoming pilgrims with grace. Thus began Kamishichiken: a place shaped by renewal, carrying within it one of the world&#39;s earliest expressions of sustainability." data-zh-hans="上七轩，生于北野之地。北野天满宫历经火灾与地震侵袭，十五世纪中叶一场大灾，社殿等珍贵文化财尽毁。其后重建所遗余材，被用于东门前七间茶屋之建，为参拜者所设歇息之所。上七轩，正由此而始——一处以可持续精神为源的街区。" data-zh-hant="上七軒，生於北野之地。北野天滿宮歷經火災與地震侵襲，十五世紀中葉一場大災，社殿等珍貴文化財盡毀。其後重建所遺餘材，被用於東門前七間茶屋之建，為參拜者所設歇息之所。上七軒，正由此而始——一處以可持續精神為源的街區。">北野の地に創られた街・上七軒 ー 北野天満宮は、その歴史の中で幾度もの火災や地震に見舞われ、十五世紀中頃の大災では、社殿などの貴重な文化財が焼失してしまいました。その再建工事の際に生じた余材は、北野天満宮の東門前に創建された、参拝客の休み処となる七軒の茶屋建築の資材として使用されました。それこそが「上七軒」という、世界最古のサステナブル精神に基づいて創られた街の始まりと考えられています。</p>
          <p className="detail-panel__paragraph" data-ja={'十七世紀以降、芸舞妓の演舞を愛でながら食事やお酒を楽しむお茶屋遊びが流行したことで、上七軒は優雅な宮廷文化の流れを汲んだ \u201C日本最古の花街\u201D として、また織物の街・西陣の奥座敷として、繁栄に拍車をかけていきました。'} data-en={"From the seventeenth century, as the art of ochaya gatherings, where one dines and drinks in the presence of geiko and maiko came into vogue, Kamishichiken blossomed. Rooted in the grace of courtly culture, it rose to prominence as Japan&#39;s oldest hanamachi and as the refined inner sanctuary of Nishijin, the famed weaving district of Kyoto."} data-zh-hans="十七世纪以降，伴随「茶屋宴游」之兴，人们于此观艺舞妓之舞，品馔饮酒。上七轩承袭宫廷文化之雅，既为日本最古之花街，亦为西阵织物之奥座，渐臻繁盛。" data-zh-hant="十七世紀以降，伴隨「茶屋宴遊」之興，人們於此觀藝舞妓之舞，品饌飲酒。上七軒承襲宮廷文化之雅，既為日本最古之花街，亦為西陣織物之奧座，漸臻繁盛。">十七世紀以降、芸舞妓の演舞を愛でながら食事やお酒を楽しむお茶屋遊びが流行したことで、上七軒は優雅な宮廷文化の流れを汲んだ "日本最古の花街" として、また織物の街・西陣の奥座敷として、繁栄に拍車をかけていきました。</p>
          <p className="detail-panel__paragraph" data-ja="その街に佇むのが「旧 長谷川邸」という一邸です。上七軒のお茶屋の中でも北野天満宮に最も近い場所に佇み、一際広い敷地を有する格式高い邸宅として、二百年から三百年もの間賑わっていたと伝えられています。木造建築でありながら現代にその姿を残している、極めて歴史的価値の高い奇跡の邸宅です。" data-en="Within this storied district stands the Former Hasegawa Residence. Positioned nearest to Kitano Tenmangu among the ochaya of Kamishichiken, and set upon an unusually generous estate, it is said to have prospered for two to three centuries as a residence of distinction. That such a wooden structure remains to this day is nothing short of extraordinary, a rare and invaluable testament to history." data-zh-hans="伫立其间的，正是『旧长谷川邸』。于上七轩众多茶屋之中，此邸最邻北野天满宫，占地开阔，据传作为格调高雅的宅邸，二至三百年间，门庭兴盛不绝。木构之身，延续至今，静然存世。" data-zh-hant="佇立其間的，正是「舊長谷川邸」。於上七軒眾多茶屋之中，此邸最鄰北野天滿宮，占地開闊。相傳二至三百年間，門庭興盛不絕。木構之身，延續至今，靜然存世。">その街に佇むのが「旧 長谷川邸」という一邸です。上七軒のお茶屋の中でも北野天満宮に最も近い場所に佇み、一際広い敷地を有する格式高い邸宅として、二百年から三百年もの間賑わっていたと伝えられています。木造建築でありながら現代にその姿を残している、極めて歴史的価値の高い奇跡の邸宅です。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="3" data-ja="次のセクションへ" data-en="Next Section" data-zh-hans="下一章节" data-zh-hant="前往下一個章節">次のセクションへ</button>
      </div>
      <div className="detail-panel__content" data-detail="3">
        <span className="detail-panel__label">04</span>
        <h3 className="detail-panel__title">EPISODE</h3>
        <div className="detail-panel__line"></div>
        <div className="detail-panel__img">
          <img src="/assets/images/culture/episodo_sm.jpg" alt="エピソード" />
        </div>
        <div className="detail-panel__text">
          <h4 className="detail-panel__lead" data-ja="偉人たちが愛した 上七軒・旧 長谷川邸" data-en={"The Former Hasegawa Residence, A Legacy Admired by History\u2019s Greats."} data-zh-hans="为名士所钟爱的上七轩・旧长谷川邸" data-zh-hant="為名士所鍾愛的上七軒・舊長谷川邸">偉人たちが愛した<br />上七軒・旧 長谷川邸</h4>
          <p className="detail-panel__paragraph" data-ja="幕末と呼ばれる十九世紀半ばに、新選組副長として京都の治安を担ったのが、「ラスト・サムライ」の一人といわれる、土方歳三です。激動の時代を駆け抜けた彼もまた、上七軒を訪れていたと伝えられており、上七軒の舞妓との儚くも悲しい物語は、今もなお語り継がれています。剣と死が常に隣り合わせの日常で、この静かな花街に身を委ねるひとときは、土方にとってかけがえのない心の安らぎであったのかもしれません。しかし、近代化（大政奉還）の波に呑まれ、彼は京都を離れ戊辰戦争へと向かい、三十五歳の若さで武士としての生涯を遂げました。" data-en="In the turbulent mid-nineteenth century of the Bakumatsu, Toshizo Hijikata, hailed as one of the last samurai, served as Vice-Commander of the Shinsengumi, safeguarding Kyoto. Drawn to Kamishichiken, he became part of a fleeting and bittersweet tale with a maiko of the district, one that still lingers in memory, quietly retold through time. In a world where blade and death were constant companions, the stillness of this hanamachi may have been Hijikata&#39;s only refuge. But as the tides of history turned with the Meiji Restoration, he departed Kyoto for the Boshin War, meeting his end at just thirty-five, his life as a samurai complete." data-zh-hans="十九世纪中叶的幕末时代，以新选组副长之身担负京都治安的，正是被誉为『最后的武士』之一的土方岁三。据传，奔走于动荡乱世的他亦曾造访上七轩，与舞妓之间那段短暂而哀婉的故事，至今仍被低声传述。在剑与死亡如影随形的日常中，片刻寄身于这静谧花街，或许正是他难得的安宁。然而，时代更迭之潮席卷而来，他离开京都，奔赴戊辰战争，以武士之身，在三十五岁的盛年，了却武士一生。" data-zh-hant="十九世紀中葉的幕末之際，以新選組副長之身守護京都治安的，正是被譽為「最後的武士」之一的土方歲三。據傳，行走於動盪時代的他亦曾造訪上七軒，與舞妓之間那段短暫而哀婉的故事，至今仍被低聲傳述。在劍與死亡相伴的日常中，片刻寄身於這靜謐花街，或許正是他難得的安寧。然而，時代更迭之潮席捲而來，他終離京都，奔赴戊辰之戰，於三十五歲之年，了卻武士一生。">幕末と呼ばれる十九世紀半ばに、新選組副長として京都の治安を担ったのが、「ラスト・サムライ」の一人といわれる、土方歳三です。激動の時代を駆け抜けた彼もまた、上七軒を訪れていたと伝えられており、上七軒の舞妓との儚くも悲しい物語は、今もなお語り継がれています。剣と死が常に隣り合わせの日常で、この静かな花街に身を委ねるひとときは、土方にとってかけがえのない心の安らぎであったのかもしれません。しかし、近代化（大政奉還）の波に呑まれ、彼は京都を離れ戊辰戦争へと向かい、三十五歳の若さで武士としての生涯を遂げました。</p>
          <p className="detail-panel__paragraph" data-ja="やがて時は下り、二十世紀半ば、上七軒・旧 長谷川邸に深い関心を寄せていたのが、日本の近代文学を代表する直木賞作家・水上勉です。著書『雁の宿』には、上七軒を舞台とした情景が描かれており、独特の視点と豊かな表現で数々の作品を世に送り出しています。" data-en="In the mid-twentieth century, Tsutomu Mizukami, Naoki Prize winning author and a leading voice of modern Japanese literature, found profound inspiration in Kamishichiken and the Former Hasegawa Residence. In his novel The Wild Geese&#39;s Lodging, the atmosphere of this hanamachi is delicately rendered, his unique perspective and lyrical prose giving rise to a body of work that continues to resonate." data-zh-hans="时至二十世纪中叶，日本近代文学的重要作家、直木奖得主水上勉，将目光投向上七轩与旧长谷川邸。其著作《雁宿》，以此地为背景，铺陈出独特视角下的人世风景。" data-zh-hant="時至二十世紀中葉，日本近代文學的重要作家、直木獎得主水上勉，將目光投向上七軒與舊長谷川邸。其著作《雁宿》，以此地為背景，鋪陳出獨特視角下的人世風景。">やがて時は下り、二十世紀半ば、上七軒・旧 長谷川邸に深い関心を寄せていたのが、日本の近代文学を代表する直木賞作家・水上勉です。著書『雁の宿』には、上七軒を舞台とした情景が描かれており、独特の視点と豊かな表現で数々の作品を世に送り出しています。</p>
          <p className="detail-panel__paragraph" data-ja="上七軒、そして旧 長谷川邸は、多くの偉人、賢人、文化人たちに愛され、幾多の人生に寄り添ってきました。その歴史の面影は、今もなおこの地に息づいています。" data-en="Kamishichiken, and the Former Hasegawa Residence within it, have been cherished by great men and women of vision, wisdom, and art across the ages, bearing witness to countless lives. The echoes of that history still breathe within this place." data-zh-hans="上七轩，连同旧长谷川邸，为诸多名士所钟爱，亦与无数人生交织相伴。往昔之影，至今仍在此地流转未息。" data-zh-hant="上七軒，連同舊長谷川邸，為諸多名士所鍾愛，亦與無數人生交織相伴。往昔之影，至今仍在此地流轉未息。">上七軒、そして旧 長谷川邸は、多くの偉人、賢人、文化人たちに愛され、幾多の人生に寄り添ってきました。その歴史の面影は、今もなおこの地に息づいています。</p>
        </div>
        <button className="detail-panel__next" type="button" data-next-detail="0" data-ja="最初に戻る" data-en="Back to Top" data-zh-hans="返回顶部" data-zh-hant="返回最上方">最初に戻る</button>
      </div>
    </div>
  </div>

  <AccessGate initialUnlocked={isUnlocked} isClientPreview={isClientPreview}>
  <>
  <section className="project-vision">
    <div className="project-vision__inner">
      <h2 className="project-vision__title">THE HISTORY MOVIE</h2>
      <ProjectVisionVideo />
      <p className="project-vision__subcopy">Story of "THE SILENCE - Furnished by ARMANI / CASA"</p>
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
        <p className="artisans-intro__jp" data-ja="礎の匠" data-en="Master Craftsmen of Foundations" data-zh-hans="基石之匠" data-zh-hant="基石之匠">礎の匠</p>
        <p className="artisans-intro__lead" data-ja="普遍の美と、現代の技を融合。" data-en="Where timeless beauty meets the artistry of the contemporary craftsmanship." data-zh-hans="融合永恒之美与现代之技。" data-zh-hant="融合永恆之美與現代之技。">普遍の美と、<br />現代の技を融合。</p>
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
            <h3 className="artisan-card__name" data-ja="隈研吾" data-en="Kengo Kuma &amp; Associates" data-zh-hans="隈研吾" data-zh-hant="隈研吾">隈研吾</h3>
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
            <h3 className="artisan-card__name" data-ja="金剛組" data-en="Kongo Gumi Co. Ltd." data-zh-hans="金剛組" data-zh-hant="金剛組">金剛組</h3>
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
            <h3 className="artisan-card__name" data-ja="中村外二工務店" data-en="Nakamura Sotoji Komuten" data-zh-hans="中村外二工務店" data-zh-hant="中村外二工務店">中村外二工務店</h3>
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
            <h3 className="artisan-card__name" data-ja="御庭植治" data-en="Onniwa Ueji Inc." data-zh-hans="御庭植治" data-zh-hant="御庭植治">御庭植治</h3>
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
        <h2 className="artisans-color__title" data-ja="彩の匠" data-en={"Master of\nColor Artistry"} data-zh-hans="彩色之匠" data-zh-hant="彩色之匠">彩の匠</h2>
        <p className="artisans-color__lead" data-ja="芸術という技で、邸宅に至高の美を。" data-en="Through the artistry of craft, supreme beauty is bestowed upon the residence." data-zh-hans="以艺术之技，为邸宅注入至高之美。" data-zh-hant="以藝術之技，為邸宅注入至高之美。">芸術という技で、邸宅に至高の美を。</p>
      </div>
      <div className="artisans-color__gallery">
        <article className="artisan-card">
          <button className="artisan-card__media artisan-card__media-button" type="button" data-artisan="5" aria-label="江里康慧の詳細を開く">
            <img src="/assets/images/artist_photo/koukei02-1_sm.jpg" alt="江里康慧" className="artisan-card__image" />
          </button>
          <div className="artisan-card__overlay artisan-card__overlay--light">
            <div className="artisan-card__copy">
              <p className="artisan-card__role">Sculpture</p>
              <h3 className="artisan-card__name" data-ja="江里康慧" data-en="Koukei Eri" data-zh-hans="江里康慧" data-zh-hant="江里康慧">江里康慧</h3>
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
              <h3 className="artisan-card__name" data-ja="江里朋子" data-en="Tomoko Eri" data-zh-hans="江里朋子" data-zh-hant="江里朋子">江里朋子</h3>
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
              <p className="artisan-card__role artisan-card__role--compact">Mindfulness Director</p>
              <h3 className="artisan-card__name" data-ja="伊藤東凌" data-en="Toryo Ito" data-zh-hans="伊藤東凌" data-zh-hant="伊藤東凌">伊藤東凌</h3>
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
              <p className="artisan-card__role">Metal Leaf Artist</p>
              <h3 className="artisan-card__name" data-ja="裕人 礫翔" data-en="Rakusho Hiroto" data-zh-hans="裕人 礫翔" data-zh-hant="裕人 礫翔">裕人 礫翔</h3>
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
              <p className="artisan-card__role">JAPANESE SWORD</p>
              <h3 className="artisan-card__name" data-ja="和泉守兼定" data-en="Izuminokami Kanesada" data-zh-hans="和泉守兼定" data-zh-hant="和泉守兼定">和泉守兼定</h3>
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
        <p className="property-section__text" data-ja={"「日本」という至宝を「世界」の至光品へ。\n完成予想図および間取りの詳細は、物件詳細ページにてご覧ください。"} data-zh-hans="将「日本」这一至宝，升华为「世界」的至光之品。完工预想图及格局详情，请至物件详细页面确认。" data-zh-hant="將「日本」此無上瑰寶，淬鍊為獻予「世界」的至臻之境。完工預想圖及格局詳情，請至物件詳細頁面確認。" data-en={"Elevating Japan\u2019s treasures into masterpieces of the world.\nArchitectural renderings and full floor plan details are available on the property detail page."}>
          「日本」という至宝を「世界」の至光品へ。<br />完成予想図および間取りの詳細は、物件詳細ページにてご覧ください。
        </p>
        <div className="property-section__buttons">
          <a href="/property" className="property-section__button" data-ja="詳細を確認する" data-en="View Details" data-zh-hans="查看详情" data-zh-hant="查看詳情">詳細を確認する</a>
          <a href="/property#property-contact" className="property-section__button property-section__button--contact" data-ja="お問い合わせ" data-en="Contact Us" data-zh-hans="联系我们" data-zh-hant="聯絡我們">お問い合わせ</a>
        </div>
      </div>

      <SiteFooter />
    </div>
  </section>
  <div className="artisan-detail" id="artisanDetail">
    <div className="artisan-detail__overlay"></div>
    <button className="artisan-detail__close" id="artisanDetailClose" type="button" aria-label="Close artisan detail">
      <span></span><span></span>
    </button>
    <div className="artisan-detail__sheet">

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
            <p className="artisan-detail__jp" data-ja="隈研吾 / 隈研吾建築都市設計事務所" data-en="Kengo Kuma &amp; Associates">隈研吾 / 隈研吾建築都市設計事務所</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja="1954年生まれ。1990年に隈研吾建築都市設計事務所を設立。慶應義塾大学教授、東京大学教授などを歴任し、現在は東京大学にて特別教授・名誉教授を務めるほか、多くの機関で教育・研究活動を推進。日本芸術院会員。" data-zh-hans="1954年生。1990年创立隈研吾建筑都市设计事务所。历任庆应义塾大学教授、东京大学教授等职，现任东京大学特别教授暨名誉教授，并在多所机构推动教育与研究活动。日本艺术院会员。" data-zh-hant="1954年生。1990年創立隈研吾建築都市設計事務所。歷任慶應義塾大學教授、東京大學教授等職，現任東京大學特別教授暨名譽教授，並於多所機構推動教育與研究活動。日本藝術院會員。" data-en="Born in 1954. He founded Kengo Kuma and Associates in 1990. After serving as professor at Keio University and the University of Tokyo, he currently holds the title of Special Professor and Professor Emeritus at the University of Tokyo, while advancing research and education at numerous institutions. Member of the Japan Art Academy.">
          1954年生まれ。1990年に隈研吾建築都市設計事務所を設立。慶應義塾大学教授、東京大学教授などを歴任し、現在は東京大学にて特別教授・名誉教授を務めるほか、多くの機関で教育・研究活動を推進。日本芸術院会員。
        </p>
        <p className="artisan-detail__text" data-ja="木や石などの素材が持つ力や光の表情を繊細に引き出し、土地の記憶と工芸性を現代へとつなぐデザインを基軸に、住宅から文化施設、都市スケールのプロジェクトまで多彩に展開。自然・技術・人間の新しい関係を切り開く建築を世界へ問い続けている。" data-zh-hans="他细腻地汲取木材、石材等素材蕴含的力量与光线表情，以连结土地记忆与工艺性的设计为核心，广泛展开从住宅到文化设施、乃至都市规模的多元项目。持续向世界提出开创自然、技术与人类新关系的建筑。" data-zh-hant="他細膩地汲取木材、石材等素材蘊含的力量與光線表情，以連結土地記憶與工藝性的設計為核心，廣泛展開從住宅到文化設施、乃至都市規模的多元專案。持續向世界提出開創自然、技術與人類新關係的建築。" data-en="Drawing subtly on the inherent strength of materials such as wood and stone, and the interplay of light, his design philosophy bridges the memory of place and the spirit of craftsmanship with the present. His work spans residences, cultural facilities and urban-scale projects, continually proposing a new relationship between nature, technology, and humanity.">
          木や石などの素材が持つ力や光の表情を繊細に引き出し、土地の記憶と工芸性を現代へとつなぐデザインを基軸に、住宅から文化施設、都市スケールのプロジェクトまで多彩に展開。自然・技術・人間の新しい関係を切り開く建築を世界へ問い続けている。
        </p>
        <p className="artisan-detail__text" data-ja="事務所には国内外合わせて数百名に及ぶ設計のプロフェッショナルが所属し、それぞれの才能が30カ国以上で新たな潮流を生み出している。近年では室内装飾や食器・家具・インテリアなどのデザイン開発へと活動領域をさらに広げ、現在も数百を超えるプロジェクトがグローバルで進行中。これまでに50か国以上で手がけた建築群は、世界建築界の最高峰を象徴する存在として高い評価を受けている。" data-zh-hans="事务所汇聚国内外数百名设计专业人士，各展所长，在逾30个国家引领崭新潮流。近年活动领域更扩展至室内装饰、餐具、家具及室内设计开发，目前逾数百个项目正在全球同步推进。迄今在50余国完成的建筑群，作为世界建筑界最高峰的象征，广受各界高度评价。" data-zh-hant="事務所匯聚國內外數百名設計專業人士，各展所長，在逾30個國家引領嶄新潮流。近年活動領域更擴展至室內裝飾、餐具、家具及室內設計開發，目前逾數百個專案正在全球同步推進。迄今在50餘國完成的建築群，作為世界建築界最高峰的象徵，廣受各界高度評價。" data-en="The firm brings together several hundred design professionals from Japan and around the world, whose individual talents continue to shape new movements across more than 30 countries. In recent years, its scope has expanded beyond architecture to encompass interior design, tableware, furniture, and a broader expression of lifestyle. Today, it leads to hundreds of projects on a global scale. Its portfolio, spanning over 50 countries, has earned international acclaim and stands as a symbol of excellence at the very pinnacle of world architecture.">
          事務所には国内外合わせて数百名に及ぶ設計のプロフェッショナルが所属し、それぞれの才能が30カ国以上で新たな潮流を生み出している。近年では室内装飾や食器・家具・インテリアなどのデザイン開発へと活動領域をさらに広げ、現在も数百を超えるプロジェクトがグローバルで進行中。これまでに50か国以上で手がけた建築群は、世界建築界の最高峰を象徴する存在として高い評価を受けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="根津美術館" data-en="Nezu Museum" data-zh-hans="根津美术馆" data-zh-hant="根津美術館">根津美術館</li>
          <li data-ja="バンヤンツリー・東山京都" data-en="Banyan Tree Higashiyama Kyoto" data-zh-hans="悦椿酒店·东山京都" data-zh-hant="悅椿酒店・東山京都">バンヤンツリー・東山京都</li>
          <li>V&amp;A Dundee</li>
          <li data-ja="梼原・木橋ミュージアム（高知県梼原町）" data-en="Yusuhara Wooden Bridge Museum" data-zh-hans="梼原木桥博物馆（高知县梼原町）" data-zh-hant="梼原木橋博物館（高知縣梼原町）">梼原・木橋ミュージアム（高知県梼原町）</li>
          <li data-ja="UCCA 陶美術館" data-en="UCCA Clay Museum" data-zh-hans="UCCA 沙丘美术馆" data-zh-hant="UCCA 沙丘美術館">UCCA 陶美術館</li>
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
            <p className="artisan-detail__jp" data-ja="金剛組" data-en="Kongo Gumi Co. Ltd.">金剛組</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja="西暦578年創業。千四百年以上にわたり日本の社寺建築を支えてきた、国宝級の技術を有する世界最古の企業。その起源は、聖徳太子の命を受けて百済から招かれた三人の宮大工にあり、その中の一人、金剛重光が創業者とされている。日本初の官寺である四天王寺の建立を皮切りに、法隆寺や五重塔など、日本社寺建築の原点となる建造物を数多く手がけてきた。" data-zh-hans="创立于公元578年。历经逾一千四百年，以国宝级技术支撑日本社寺建筑的世界最古老企业。其起源可追溯至奉圣德太子之命，由百济招聘而来的三位宫廷木匠，其中金刚重光被认定为创始人。自建造日本首座官寺四天王寺起，历经法隆寺、五重塔等日本社寺建筑原点的众多建造物，皆出自其手。" data-zh-hant="創業於西元578年。歷經逾一千四百年，以國寶級技術支撐日本社寺建築的世界最古老企業。其起源可追溯至奉聖德太子之命，由百濟招聘而來的三位宮廷木匠，其中金剛重光被認定為創始人。自建造日本首座官寺四天王寺起，歷經法隆寺、五重塔等日本社寺建築原點的眾多建造物，皆出自其手。" data-en="Founded in 578, it is the world&#39;s oldest company, possessing national-treasure-level craftsmanship that has supported Japan&#39;s temple and shrine architecture for over 1,400 years. Its origins trace back to three master temple carpenters invited from Baekje at the command of Prince Shotoku, among whom Shigemitsu Kongo is regarded as the founder. Beginning with the construction of Shitenno-ji Temple, Japan&#39;s first state-sponsored temple, the company has gone on to create many of the defining works of Japanese sacred architecture, including Horyu-ji Temple and its iconic five-storied pagoda.">
          西暦578年創業。千四百年以上にわたり日本の社寺建築を支えてきた、国宝級の技術を有する世界最古の企業。<br />
          その起源は、聖徳太子の命を受けて百済から招かれた三人の宮大工にあり、その中の一人、金剛重光が創業者とされている。日本初の官寺である四天王寺の建立を皮切りに、法隆寺や五重塔など、日本社寺建築の原点となる建造物を数多く手がけてきた。
        </p>
        <p className="artisan-detail__text" data-ja="創業以来、金剛組は「社寺の造形美を形にし、建物を護り、後世に引き継ぐ」ことを使命とし、幾多の戦火や災禍に見舞われた社寺の再建に尽力。木の仕口や継ぎ手といった高度な伝統技法を継承・発展させてきた。" data-zh-hans="自创业以来，金刚组以「赋形社寺造形之美、守护建筑、传承后世」为使命，致力于历经战火与灾难的社寺重建工作，并持续继承与发展木材榫接、继手等高度传统技法。" data-zh-hant="自創業以來，金剛組以「賦形社寺造形之美、守護建築、傳承後世」為使命，致力於歷經戰火與災難的社寺重建工作，並持續繼承與發展木材榫接、繼手等高度傳統技法。" data-en="Since its founding, Kongo Gumi has been guided by the mission to give form to the aesthetic beauty of temples and shrines, protect their structures, and pass them on to future generations. Through countless wars and disasters, the firm has devoted itself to the reconstruction of sacred sites, preserving and advancing highly refined traditional joinery techniques.">
          創業以来、金剛組は「社寺の造形美を形にし、建物を護り、後世に引き継ぐ」ことを使命とし、幾多の戦火や災禍に見舞われた社寺の再建に尽力。木の仕口や継ぎ手といった高度な伝統技法を継承・発展させてきた。
        </p>
        <p className="artisan-detail__text" data-ja="現在も、永く建物を護持し、時代を超えて誇りを持てる仕事をするという理念のもと、文化財の修復や寺社仏閣の建造に関わり、日本建築の伝統を未来へと繋ぎ続けている。" data-zh-hans="时至今日，秉持「永久守护建筑，完成跨越时代、引以为傲之作」的理念，持续投入文化财修复及寺社佛阁建造，将日本建筑传统薪传未来。" data-zh-hant="時至今日，秉持「永久守護建築，完成跨越時代、引以為傲之作」的理念，持續投入文化財修復及寺社佛閣建造，將日本建築傳統薪傳未來。" data-en="Today, guided by the philosophy of preserving structures for the long term and producing work that transcends time with pride, Kongō Gumi continues to engage in the restoration of cultural properties and the construction of temples and shrines, carrying the tradition of Japanese architecture into the future.">
          現在も、永く建物を護持し、時代を超えて誇りを持てる仕事をするという理念のもと、文化財の修復や寺社仏閣の建造に関わり、日本建築の伝統を未来へと繋ぎ続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="四天王寺（国宝・重要文化財）" data-en="Shitennō-ji Temple (National Treasure / Important Cultural Property)" data-zh-hans="四天王寺（国宝·重要文化财）" data-zh-hant="四天王寺（國寶・重要文化財）">四天王寺（国宝・重要文化財）</li>
          <li data-ja="法隆寺（国宝・世界遺産）※昭和大修理" data-en="Hōryū-ji Temple (National Treasure / World Heritage Site) *Showa-era restoration" data-zh-hans="法隆寺（国宝·世界遗产）※昭和大修理" data-zh-hant="法隆寺（國寶・世界遺產）※昭和大修理">法隆寺（国宝・世界遺産）※昭和大修理</li>
          <li data-ja="住吉大社（国宝）" data-en="Sumiyoshi Taisha (National Treasure)" data-zh-hans="住吉大社（国宝）" data-zh-hant="住吉大社（國寶）">住吉大社（国宝）</li>
          <li data-ja="四天王寺五重塔（昭和再建）" data-en="Shitennō-ji Temple Five-Storied Pagoda (Showa reconstruction)" data-zh-hans="四天王寺五重塔（昭和重建）" data-zh-hant="四天王寺五重塔（昭和重建）">四天王寺五重塔（昭和再建）</li>
          <li data-ja="身延山久遠寺五重塔" data-en="Minobusan Kuon-ji Temple Five-Storied Pagoda" data-zh-hans="身延山久远寺五重塔" data-zh-hant="身延山久遠寺五重塔">身延山久遠寺五重塔</li>
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
            <p className="artisan-detail__jp" data-ja="中村外二工務店" data-en="Nakamura Sotoji Komuten">中村外二工務店</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja="1931年創業。数寄屋大工の第一人者である棟梁・中村外二が創業した、京都を拠点とする伝統建築の工房。木肌がなめらかで材質に優れた北山磨き丸太などを用いた日本建築様式「数寄屋造り」を得意としている。" data-zh-hans="创立于1931年。由数寄屋大工第一人者、栋梁中村外二所创立，以京都为据点的传统建筑工坊。擅长运用木纹细腻、材质优良的北山磨丸木等木材，以「数寄屋造」日本建筑样式为专长。" data-zh-hant="創立於1931年。由數寄屋大工第一人者、棟梁中村外二所創立，以京都為據點的傳統建築工坊。擅長運用木紋細膩、材質優良的北山磨丸太等木材，以「數寄屋造」日本建築樣式為專長。" data-en="Founded in 1931 by master carpenter Sotoji Nakamura, the foremost authority in sukiya carpentry, this Kyoto-based traditional architecture atelier specializes in the sukiya-zukuri style of Japanese architecture, renowned for its refined use of materials such as Kitayama polished round timber, prized for its smooth grain and superior quality.">
          1931年創業。数寄屋大工の第一人者である棟梁・中村外二が創業した、京都を拠点とする伝統建築の工房。木肌がなめらかで材質に優れた北山磨き丸太などを用いた日本建築様式「数寄屋造り」を得意としている。
        </p>
        <p className="artisan-detail__text" data-ja="中村外二は、裏千家御用達の作事方大工として伊勢神宮の茶室や海外の著名な茶室建築に携わり、材木への深い探求と精緻な仕事を融合させて独自の美意識を築き上げた。数寄屋建築の継承と発展に尽力したその精神は、現代の職人にも脈々と受け継がれている。" data-zh-hans="中村外二以裏千家御用作事方大工的身份，参与伊势神宫茶室及海外著名茶室建筑的建造，将对木材的深刻探究与精致的工艺融为一体，建立起独特的美学意识。致力于数寄屋建筑传承与发展的精神，至今仍在现代匠师中绵绵传承。" data-zh-hant="中村外二以裏千家御用作事方大工的身份，參與伊勢神宮茶室及海外著名茶室建築的建造，將對木材的深刻探究與精緻的工藝融為一體，建立起獨特的美學意識。致力於數寄屋建築傳承與發展的精神，至今仍在現代匠師中綿綿傳承。" data-en="As the official carpenter to the Urasenke school of tea, Nakamura Sotoji engaged in the creation of tea rooms at Ise Shrine and notable tearoom commissions abroad, forging a distinctive aesthetic vision through deep material inquiry and meticulous craftsmanship. That spirit of dedication to the preservation and advancement of sukiya architecture flows unbroken through today&#39;s artisans.">
          中村外二は、裏千家御用達の作事方大工として伊勢神宮の茶室や海外の著名な茶室建築に携わり、材木への深い探求と精緻な仕事を融合させて独自の美意識を築き上げた。数寄屋建築の継承と発展に尽力したその精神は、現代の職人にも脈々と受け継がれている。
        </p>
        <p className="artisan-detail__text" data-ja="現在も、京都迎賓館をはじめ、数々の料亭・旅館、さらには空港施設や住宅建築に至るまで、本物の素材が持つ質感と空間美を活かした作品を手がけている。" data-zh-hans="时至今日，从京都迎宾馆到各式料亭、旅馆，乃至机场设施及住宅建筑，持续创作出充分彰显真实素材质感与空间之美的作品。" data-zh-hant="時至今日，從京都迎賓館到各式料亭、旅館，乃至機場設施及住宅建築，持續創作出充分彰顯真實素材質感與空間之美的作品。" data-en="Today, the firm continues to produce works that honor the tactile richness of authentic materials and the beauty of space, from the Kyoto State Guest House to distinguished restaurants, traditional ryokans, airport facilities, and private residences.">
          現在も、京都迎賓館をはじめ、数々の料亭・旅館、さらには空港施設や住宅建築に至るまで、本物の素材が持つ質感と空間美を活かした作品を手がけている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="伊勢神宮茶室「霽月」" data-zh-hans="伊势神宫茶室「霁月」" data-zh-hant="伊勢神宮茶室「霽月」" data-en={'Ise Shrine Tea room "Seigetsu"'}>伊勢神宮茶室「霽月」</li>
          <li data-ja="京都迎賓館（国の迎賓施設）※内部施工" data-en="Rockefeller Residence" data-zh-hans="洛克菲勒邸" data-zh-hant="京都迎賓館（國家迎賓設施）※室內施工">京都迎賓館（国の迎賓施設）※内部施工</li>
          <li data-ja="俵屋旅館（登録有形文化財）※改修・増築" data-en="Tawaraya Ryokan (Registered Tangible Cultural Property) *Renovation &amp; Extension" data-zh-hans="俵屋旅馆（登录有形文化财）※改修·增筑" data-zh-hant="俵屋旅館（登錄有形文化財）※翻修與增建">俵屋旅館（登録有形文化財）※改修・増築</li>
          <li data-ja="鶴屋吉信 本店「菓遊茶屋」" data-zh-hans="鹤屋吉信本店「菓游茶屋」" data-zh-hant="鶴屋吉信 本店「菓遊茶屋」" data-en={'Tsuruyayoshinobu Main Store "Kay\u016B Chaya"'}>鶴屋吉信 本店「菓遊茶屋」</li>
          <li data-ja="松下幸之助邸茶室" data-zh-hans="松下幸之助邸茶室" data-zh-hant="松下幸之助邸 茶室" data-en={"Matsushita K\u014Dnosuke Residence Tea room"}>松下幸之助邸茶室</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="2" artisanName="NAKAMURA SOTOJI" />
      </article>

      <article className="artisan-detail__content" data-artisan-detail="3">
        <img src="/assets/images/gallery/ARMANI/trbyw7vskzjnfsq7l3og.webp" alt="ARMANI / CASA" className="artisan-detail__portrait artisan-detail__portrait--wide" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">Furniture / Accessories</p>
            <p className="artisan-detail__jp">ARMANI / CASA</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja={"2000年にスタート。ジョルジオ・アルマーニの哲学が息づくインテリアホームコレクション。家具からホームアクセサリーに至るまで、ジョルジオ・アルマーニが築いた美意識が反映された幅広いラインナップを展開し、洗練された生活空間をグローバルな視点から提案している。"} data-en={"Launched in 2000, the home collection embodies the philosophy of Giorgio Armani. From furniture to home accessories, it offers a refined and comprehensive range shaped by his distinctive aesthetic, presenting sophisticated living spaces through a global perspective."} data-zh-hans="创立于2000年。蕴含乔治·阿玛尼哲学的室内家居系列。从家具到家居配饰，展开广泛融入乔治·阿玛尼所建立美学意识的产品阵容，以全球视野提案精致的生活空间。" data-zh-hant="創立於2000年。蘊含喬治·亞曼尼哲學的室內家居系列。從家具到家居配飾，展開廣泛融入喬治·亞曼尼所建立美學意識的產品陣容，以全球視野提案精緻的生活空間。">
          2000年にスタート。ジョルジオ・アルマーニの哲学が息づくインテリアホームコレクション。家具からホームアクセサリーに至るまで、ジョルジオ・アルマーニが築いた美意識が反映された幅広いラインナップを展開し、洗練された生活空間をグローバルな視点から提案している。
        </p>
        <p className="artisan-detail__text" data-ja={"建築物のコンセプトや住まう人の上質な暮らしに寄り添うかたちで、家具やホームアクセサリー、照明、そしてエクスクルーシブなファブリックまでを一貫してデザイン。空間全体を統合的に演出することで、スタイリッシュでエレガントなクリエイティブ空間を創出している。"} data-en={"In harmony with the architectural concept and the refined lifestyle of its residents, every element, from furniture and home accessories to lighting and exclusive fabrics is designed with a unified vision. By orchestrating the entire space with a holistic approach, it creates a creative environment that is both effortlessly stylish and elegantly cohesive."} data-zh-hans="以契合建筑概念及居住者高品质生活的方式，对家具、家居配饰、照明乃至专属布料进行一贯性设计。通过对整体空间的整合性演绎，创造出时尚而优雅的创意空间。" data-zh-hant="以契合建築概念及居住者高品質生活的方式，對家具、家居配飾、照明乃至專屬布料進行一貫性設計。透過對整體空間的整合性演繹，創造出時尚而優雅的創意空間。">
          建築物のコンセプトや住まう人の上質な暮らしに寄り添うかたちで、家具やホームアクセサリー、照明、そしてエクスクルーシブなファブリックまでを一貫してデザイン。空間全体を統合的に演出することで、スタイリッシュでエレガントなクリエイティブ空間を創出している。
        </p>
        <p className="artisan-detail__text" data-ja="現在も、世界各国の高級レジデンスやホテル、プライベート空間のインテリアを手がけ、ライフスタイルそのものを提案するコレクションとして展開を続けている。" data-zh-hans="时至今日，持续承接世界各国高级住宅、酒店及私人空间的室内设计，作为提案生活方式本身的系列持续展开。" data-zh-hant="時至今日，持續承接世界各國高級住宅、酒店及私人空間的室內設計，作為提案生活方式本身的系列持續展開。" data-en="Today, it continues to shape the interiors of luxury residences, hotels, and private spaces around the world, evolving as a collection that defines not just interiors, but an entire way of living.">
          現在も、世界各国の高級レジデンスやホテル、プライベート空間のインテリアを手がけ、ライフスタイルそのものを提案するコレクションとして展開を続けている。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="アルマーニホテル（ミラノ）" data-en="Armani Hotel (Milan)" data-zh-hans="阿玛尼酒店（米兰）" data-zh-hant="亞曼尼酒店（米蘭）">アルマーニホテル（ミラノ）</li>
          <li data-ja="アルマーニホテル（ドバイ）" data-en="Armani Hotel (Dubai)" data-zh-hans="阿玛尼酒店（迪拜）" data-zh-hant="亞曼尼酒店（杜拜）">アルマーニホテル（ドバイ）</li>
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
            <p className="artisan-detail__jp" data-ja="御庭植治" data-en="Onniwa Ueji Inc.">御庭植治</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja={"19世紀後半から20世紀初頭にかけて近代日本庭園の礎を築いた、京都の作庭家・庭師一門。七代目・小川治兵衛（1860\u20131933）は、比叡山や東山、琵琶湖疏水といった周辺の自然景観を庭園構成に取り込み、地形や水の流れを生かした自然主義的な庭園様式を確立し、近代日本庭園の発展に大きな影響を与えた。"} data-en={"An esteemed lineage of Kyoto-based garden designers and master gardeners, who laid the foundation of modern Japanese garden design from the late 19th to the early 20th century. The seventh-generation master, Ogawa Jihei Seventh (1860\u20131933), pioneered a naturalistic approach by integrating the surrounding landscapes, such as Mount Hiei, Higashiyama, and the Lake Biwa Canal into his garden compositions. By embracing the contours of the land and the flow of water, he established a style that profoundly influenced the evolution of modern Japanese gardens."} data-zh-hans="奠定近代日本庭园基础的京都造园家暨庭师世家，活跃于19世纪后半至20世纪初。第七代小川治兵卫（1860–1933）将比叡山、东山、琵琶湖疏水等周边自然景观融入庭园构成，确立了善用地形与水流的自然主义庭园样式，对近代日本庭园的发展影响深远。" data-zh-hant="奠定近代日本庭園基礎的京都作庭家暨庭師世家，活躍於19世紀後半至20世紀初。第七代小川治兵衛（1860–1933）將比叡山、東山、琵琶湖疏水等周邊自然景觀融入庭園構成，確立了善用地形與水流的自然主義庭園樣式，對近代日本庭園的發展影響深遠。">
          江戸宝暦年間（約260年前）に創業。武士の身分から庭園の道を志し、帯刀を許される作庭家となった初代に端を発する。<br /><br />
          代々「小川治兵衞」の名を襲名し、屋号を「植治（うえじ）」と称す。なかでも七代小川治兵衞は、山縣有朋邸（無鄰菴）や平安神宮、円山公園、東京都の旧古河庭園など、数多くの国指定名勝庭園を手掛け、自然風景の美を尊ぶ近代日本庭園の作風を確立した。
        </p>
        <p className="artisan-detail__text" data-ja={"無鄰菴、平安神宮神苑、円山公園、南禅寺界隈の別邸庭園など、今日の京都の景観形成に深く関わる数多くの名庭を手がけ、その一部は庭園分野で最高位とされる国指定名勝に認定されている。"} data-en={"Among his creations are \u201CMurin-an\u201D, the Heian Jing\u016B Shrine Garden, Maruyama Park, and the villa gardens of the Nanzen-ji district, gardens deeply woven into the fabric of Kyoto\u2019s landscape today, several of which have been designated as National Places of Scenic Beauty, the highest honor in the field of garden design."} data-zh-hans="手持无邻庵、平安神宫神苑、圆山公园、南禅寺一带别邸庭园等，深刻参与今日京都景观形成的众多名庭，其中部分已获颁庭园领域最高荣誉的国家指定名胜。" data-zh-hant="手持無鄰菴、平安神宮神苑、圓山公園、南禪寺一帶別邸庭園等，深刻參與今日京都景觀形成的眾多名庭，其中部分已獲頒庭園領域最高榮譽的國家指定名勝。">
          無鄰菴、平安神宮神苑、円山公園、南禅寺界隈の別邸庭園など、今日の京都の景観形成に深く関わる数多くの名庭を手がけ、その一部は庭園分野で最高位とされる国指定名勝に認定されている。
        </p>
        <p className="artisan-detail__text" data-ja={"現在も、十一代目当主・小川治兵衛（雅史氏）のもと、次期十二代として御庭植治株式会社代表取締役を務める小川勝章氏を中心に、国指定名勝をはじめとする文化財庭園の修復・維持管理、ならびに歴史的建築と調和する庭園の作庭に尽力し、京都の庭園文化を継承する存在として活動を続けている。"} data-en={"Today, under the eleventh-generation head Ogawa Jihei (Masashi), and centered on Ogawa Katsuaki, the heir-apparent twelfth generation and President of Onniwa Inc., the firm remains dedicated to the restoration and stewardship of nationally designated scenic garden treasures and the creation of gardens in harmony with historic architecture, standing as a living custodian of Kyoto\u2019s garden heritage."} data-zh-hans="时至今日，在第十一代当主小川治兵卫（雅史）的领导下，以准第十二代、御庭植治株式会社代表取缔役小川胜章为核心，持续致力于包括国家指定名胜在内的文化财庭园修复与维护管理，以及与历史性建筑相调和的庭园造景，作为传承京都庭园文化的存在持续活跃。" data-zh-hant="時至今日，在第十一代當主小川治兵衛（雅史）的領導下，以準第十二代、御庭植治株式會社代表取締役小川勝章為核心，持續致力於包括國家指定名勝在內的文化財庭園修復與維護管理，以及與歷史性建築相調和的庭園造景，作為傳承京都庭園文化的存在持續活躍。">
          現在は次期十二代・小川勝章がその伝統を継承。「北野天満宮・風月の庭」や「実相院門跡・こころの庭」などの作庭を通じ、現代における庭園の在り方を追求している。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="無鄰菴（国指定名勝）" data-en="Murin-an (National Place of Scenic Beauty)" data-zh-hans="无邻庵（国家指定名胜）" data-zh-hant="無鄰菴（國家指定名勝）">無鄰菴（国指定名勝）</li>
          <li data-ja="平安神宮 神苑（国指定名勝）" data-zh-hans="平安神宫神苑（国家指定名胜）" data-zh-hant="平安神宮神苑（國家指定名勝）" data-en={"Heian Jing\u016B Shrine Garden (National Place of Scenic Beauty)"}>平安神宮 神苑（国指定名勝）</li>
          <li data-ja="旧古河庭園（国指定名勝）" data-en="Former Furukawa Gardens (National Place of Scenic Beauty)" data-zh-hans="旧古河庭园（国家指定名胜）" data-zh-hant="舊古河庭園（國家指定名勝）">旧古河庭園（国指定名勝）</li>
          <li data-ja="円山公園（国指定名勝）" data-en="Maruyama Park (National Place of Scenic Beauty)" data-zh-hans="圆山公园（国家指定名胜）" data-zh-hant="圓山公園（國家指定名勝）">円山公園（国指定名勝）</li>
          <li data-ja="清風荘（国指定重要文化財）" data-zh-hans="清风庄（国家指定重要文化财）" data-zh-hant="清風莊（國家指定重要文化財）" data-en={"Seif\u016Bs\u014D (Important Cultural Property)"}>清風荘（国指定重要文化財）</li>
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
            <p className="artisan-detail__role">Sculpture</p>
            <p className="artisan-detail__jp" data-ja="江里康慧" data-en="Koukei Eri">江里康慧</p>
          </div>
          <p className="artisan-detail__en">KOKEI ERI</p>
        </div>
        <p className="artisan-detail__text" data-ja={"1943年生まれ。仏師・江里宗平の長男として京都に生まれた、仏像彫刻の第一人者。現代の仏師の中で、人間国宝に最も近い人物の一人と称されている。伝統的な木彫技法に現代的な感性を融合させ、独創性と精神性の高い作品を制作している。"} data-zh-hans="1943年生。以佛师江里宗平长子身份生于京都，为佛像雕刻的第一人者。在现代佛师之中，被称为最接近人间国宝的人物之一。融合传统木雕技法与现代感性，创作出独创性与精神性皆高的作品。" data-zh-hant="1943年生。以仏師江里宗平長子身份生於京都，為仏像雕刻的第一人者。在現代仏師之中，被稱為最接近人間國寶的人物之一。融合傳統木雕技法與現代感性，創作出獨創性與精神性皆高的作品。" data-en="Born in 1943 in Kyoto as the eldest son of Buddhist sculptor S\u014Dhei Eri, he is regarded as the foremost master of Buddhist carving in Japan today, widely recognized as one of the living craftsmen closest to be designed as Living National Treasure. His works fuse traditional wood-carving techniques with a contemporary sensibility, achieving a rare combination of originality and profound spiritual depth.">
          1943年生まれ。仏師・江里宗平の長男として京都に生まれた、仏像彫刻の第一人者。現代の仏師の中で、人間国宝に最も近い人物の一人と称されている。伝統的な木彫技法に現代的な感性を融合させ、独創性と精神性の高い作品を制作している。
        </p>
        <p className="artisan-detail__text" data-ja={"「仏は彫る前からすでに木の中にいらっしゃる。仏師は周りの余分な部分を払いのけるだけだ」という信条と、「仏師は修行者であり続ける」という思想のもと活動を続け、国内外から高い評価を受けている。"} data-zh-hans="秉持「佛陀在雕刻之前便已存在于木中，佛师只是去除周围多余部分而已」的信念，以及「佛师须持续为修行者」的思想持续创作，广受国内外高度评价。" data-zh-hant="秉持「佛陀在雕刻之前便已存在於木中，仏師只是去除周圍多餘部分而已」的信念，以及「仏師須持續為修行者」的思想持續創作，廣受國內外高度評價。" data-en={"Guided by his belief that \u201Cthe Buddha already resides within the wood before the carving begins, the sculptor\u2019s task is simply to remove the excess surrounding it,\u201D and the conviction that \u201Ca Buddhist sculptor must remain forever a practitioner,\u201D he continues his work to the highest international acclaim."}>
          「仏は彫る前からすでに木の中にいらっしゃる。仏師は周りの余分な部分を払いのけるだけだ」という信条と、「仏師は修行者であり続ける」という思想のもと活動を続け、国内外から高い評価を受けている。
        </p>
        <p className="artisan-detail__text" data-ja="1989年に三千院より大仏師号を賜り、2003年には妻・截金師の江里佐代子とともに京都府文化賞功労賞を、2007年には第41回仏教伝道文化賞を受賞。著書に『仏師という生き方』『京都の仏師が語る 眼福の仏像』などがある。" data-zh-hans="1989年获三千院赐予大佛师号，2003年与妻子截金师江里佐代子共同荣获京都府文化奖功劳奖，2007年荣获第41届佛教传道文化奖。著有《身为佛师的生活方式》《京都佛师谈眼福佛像》等书。" data-zh-hant="1989年獲三千院賜予大仏師號，2003年與妻子截金師江里佐代子共同榮獲京都府文化賞功勞賞，2007年榮獲第41屆佛教傳道文化賞。著有《身為仏師的生活方式》《京都仏師談眼福佛像》等書。" data-en="In 1989, he was bestowed the honorary title of Grand Buddhist Sculptor by Sanzen-in. In 2003, he and his wife, the kirikane artist Sayoko Eri, were awarded the Kyoto Prefecture Cultural Prize for Distinguished Service. He later received the 41st Buddhist Culture Award in 2007. His published works include The Way of the Buddhist Sculptor and A Kyoto Sculptor on the Joy of Viewing Buddhist Statues, among others.">
          1989年に三千院より大仏師号を賜り、2003年には妻・截金師の江里佐代子とともに京都府文化賞功労賞を、2007年には第41回仏教伝道文化賞を受賞。著書に『仏師という生き方』『京都の仏師が語る　眼福の仏像』などがある。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="阿弥陀如来像" data-zh-hans="释迦如来三尊像" data-zh-hant="阿彌陀如來像" data-en={"Shakyamuni Triad (Shaka Nyorai Sanzonz\u014D)"}>阿弥陀如来像</li>
          <li data-ja="釈迦三尊像" data-zh-hans="梦窗国师顶相像" data-zh-hant="釋迦三尊像" data-en={"Portrait of Mus\u014D Kokushi"}>釈迦三尊像</li>
          <li data-ja="聖徳太子孝養像" data-en="Buddhist sculptures for the Kyoto State Guest House" data-zh-hans="京都迎宾馆佛像雕刻" data-zh-hant="聖德太子孝養像">聖徳太子孝養像</li>
          <li data-ja="聖武天皇御像" data-zh-hans="中尊寺奉纳佛像（世界遗产相关）" data-zh-hant="聖武天皇御像" data-en={"Dedicated Buddhist image for Ch\u016Bson-ji (World Heritage Site)"}>聖武天皇御像</li>
          <li data-ja="源頼朝像" data-zh-hans="平安佛所佛像制作活动" data-zh-hant="源賴朝像" data-en={"Buddhist image creation at Heian Bussh\u014D"}>源頼朝像</li>
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
            <p className="artisan-detail__jp" data-ja="江里朋子" data-en="Tomoko Eri">江里朋子</p>
          </div>
          <p className="artisan-detail__en">ERI TOMOKO</p>
        </div>
        <p className="artisan-detail__text" data-ja={"1972年生まれ。截金師。人間国宝・江里佐代子の長女として京都に生まれ、母より伝統的な截金技法を継承した工芸作家。京都芸術短期大学で日本画を学んだのち、母・佐代子のもとで截金の手ほどきを受け、その精緻な技を習得。2011年の第58回日本伝統工芸展では日本工芸会新人賞を受賞し、2015年には日本工芸会正会員に認定されるなど、実力派の工芸作家として広く認められている。"} data-zh-hans="1972年生。截金师。以人间国宝江里佐代子长女身份生于京都，从母亲继承传统截金技法的工艺作家。于京都艺术短期大学学习日本画后，在母亲佐代子指导下习得截金技艺之精髓。2011年第58届日本传统工艺展荣获日本工艺会新人奖，2015年获认定为日本工艺会正会员，作为实力派工艺作家广受肯定。" data-zh-hant="1972年生。截金師。以人間國寶江里佐代子長女身份生於京都，從母親繼承傳統截金技法的工藝作家。於京都藝術短期大學學習日本畫後，在母親佐代子指導下習得截金技藝之精髓。2011年第58屆日本傳統工藝展榮獲日本工藝會新人賞，2015年獲認定為日本工藝會正會員，作為實力派工藝作家廣受肯定。" data-en={"Born in 1972 in Kyoto as the eldest daughter of Living National Treasure Sayoko Eri, she is a craft artist who inherited the traditional kirikane technique from her mother. After studying Nihonga (traditional Japanese painting) at Kyoto College of Art, she trained under her mother, mastering the intricate and highly refined techniques of kirikane. In 2011, she received the Newcomer\u2019s Award from the Japan K\u014Dgei Association at the 58th Japan Traditional Art Crafts Exhibition, and in 2015, she was recognized as a full member of the Association, further affirming her reputation as an accomplished and highly regarded artist."}>
          1972年生まれ。截金師。人間国宝・江里佐代子の長女として京都に生まれ、母より伝統的な截金技法を継承した工芸作家。京都芸術短期大学で日本画を学んだのち、母・佐代子のもとで截金の手ほどきを受け、その精緻な技を習得。2011年の第58回日本伝統工芸展では日本工芸会新人賞を受賞し、2015年には日本工芸会正会員に認定されるなど、実力派の工芸作家として広く認められている。
        </p>
        <p className="artisan-detail__text" data-ja={"金箔・銀箔・プラチナ箔を数枚焼き合わせ、竹刀で極細の線状や幾何学形に切り出した截金を、筆先で丁寧に貼り重ねることで文様を描き出す。仏像に施す荘厳の技として受け継がれてきたこの技法を、飾筥や棗、香合といった茶道具・工芸品へと応用展開し、静謐で荘厳な輝きを現代の生活空間へと繋いでいる。"} data-zh-hans="将数张金箔、银箔、铂箔烧制叠合，以竹刀裁切成极细线条或几何形状的截金，再以笔尖细心贴叠描绘纹样。将这项作为佛像庄严技法传承下来的技术，应用展开于饰盒、棗、香合等茶道具及工艺品，将静谧而庄严的光辉传递至现代生活空间。" data-zh-hant="將數張金箔、銀箔、鉑箔燒製疊合，以竹刀裁切成極細線條或幾何形狀的截金，再以筆尖細心貼疊描繪文様。將這項作為佛像莊嚴技法傳承下來的技術，應用展開於飾筥、棗、香合等茶道具及工藝品，將靜謐而莊嚴的光輝傳遞至現代生活空間。" data-en={"Sheets of gold, silver, and platinum foil are fused together through firing, then cut into ultra-fine lines and geometric forms using a bamboo blade. These kirikane elements are layered with a brush tip to compose intricate patterns. Originally a technique of sacred adornment applied to Buddhist images, she has extended its application to lacquerware boxes, tea caddies, and incense containers, bringing its serene, solemn luminosity into contemporary living spaces."}>
          金箔・銀箔・プラチナ箔を数枚焼き合わせ、竹刀で極細の線状や幾何学形に切り出した截金を、筆先で丁寧に貼り重ねることで文様を描き出す。仏像に施す荘厳の技として受け継がれてきたこの技法を、飾筥や棗、香合といった茶道具・工芸品へと応用展開し、静謐で荘厳な輝きを現代の生活空間へと繋いでいる。
        </p>
        <p className="artisan-detail__text" data-ja="現在も、父・仏師江里康慧とともに、仏教美術の伝統を次世代へと繋ぐ活動に取り組んでいる。" data-zh-hans="时至今日，仍与父亲佛师江里康慧携手，持续从事将佛教美术传统传承至下一世代的活动。" data-zh-hant="時至今日，仍與父親仏師江里康慧攜手，持續從事將佛教美術傳統傳承至下一世代的活動。" data-en={"Together with her father, Buddhist sculptor K\u014Dkei Eri, she continues to engage in the transmission of Buddhist art traditions to the next generation."}>
          現在も、父・仏師江里康慧とともに、仏教美術の伝統を次世代へと繋ぐ活動に取り組んでいる。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="重要文化財 仏像（截金修復）" data-en="Important Cultural Property Buddhist images (kirikane restoration)" data-zh-hans="重要文化财佛像（截金修复）" data-zh-hant="重要文化財佛像（截金修復）">重要文化財 仏像（截金修復）</li>
          <li data-ja="寺院 仏像装飾（多数）" data-en="Temple Buddhist image adornment (numerous works)" data-zh-hans="寺院佛像装饰（多件）" data-zh-hant="寺院佛像裝飾（多件）">寺院 仏像装飾（多数）</li>
          <li data-ja="伝統工芸展 出品作品（多数）" data-zh-hans="传统工艺展出品作品（多件）" data-zh-hant="傳統工藝展出品作品（多件）" data-en={"Traditional K\u014Dgei Exhibition submissions (numerous works)"}>伝統工芸展 出品作品（多数）</li>
          <li data-ja="截金技法 継承・指導活動" data-en="Kirikane technique transmission and instruction activities" data-zh-hans="截金技法传承·指导活动" data-zh-hant="截金技法傳承・指導活動">截金技法 継承・指導活動</li>
          <li data-ja="京都伝統工芸大学校 講師" data-en="Lecturer at Kyoto College of Traditional Arts" data-zh-hans="京都传统工艺大学校讲师" data-zh-hant="京都傳統工藝大學校講師">京都伝統工芸大学校 講師</li>
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
            <p className="artisan-detail__role artisan-detail__role--compact">Mindfulness Director</p>
            <p className="artisan-detail__jp" data-ja="伊藤東凌" data-en="Toryo Ito">伊藤東凌</p>
          </div>
          <p className="artisan-detail__en">ITO TORYO</p>
        </div>
        <p className="artisan-detail__text" data-ja={"1980年生まれ。建仁寺僧堂にて修行後、2008年両足院の副住職に就任。これまで伝統文化に現代美術やマインドフルネスを組み合わせ、新しい仏教の表現を提案してきた。"} data-zh-hans="1980年生。于建仁寺僧堂修行后，2008年就任两足院副住职。迄今将传统文化与现代美术及正念冥想相结合，持续提案佛教的崭新表现形式。" data-zh-hant="1980年生。於建仁寺僧堂修行後，2008年就任兩足院副住職。迄今將傳統文化與現代美術及正念冥想相結合，持續提案佛教的嶄新表現形式。" data-en={"Born in 1980. After training at the Kennin-ji monastery, he was appointed Vice Abbot of Ry\u014Dsoku-in in 2008. He has consistently proposed new expressions of Buddhism by integrating traditional culture with contemporary art and mindfulness practice."}>
          1980年生まれ。建仁寺僧堂にて修行後、2008年両足院の副住職に就任。これまで伝統文化に現代美術やマインドフルネスを組み合わせ、新しい仏教の表現を提案してきた。
        </p>
        <p className="artisan-detail__text" data-ja="海外での活動も多く、米国Meta(旧Facebook)本社などで禅指導を行う。国内では任天堂創業家による山内財団の評議員ほか、企業エグゼクティブへ向けたコーチングも担当。" data-zh-hans="海外活动频繁，在美国Meta（前身为Facebook）总部等地进行禅修指导。在国内担任任天堂创办家族山内财团评议员，并为企业高层主管提供教练辅导。" data-zh-hant="海外活動頻繁，在美國Meta（前身為Facebook）總部等地進行禪修指導。在國內擔任任天堂創辦家族山內財團評議員，並為企業高階主管提供教練輔導。" data-en="Widely active internationally, he has led Zen instruction at the US headquarters of Meta (former Facebook), among other engagements. In Japan, he serves as a trustee of the Yamauchi Foundation, established by the founding family of Nintendo and provides coaching to senior corporate executives.">
          海外での活動も多く、米国Meta(旧Facebook)本社などで禅指導を行う。国内では任天堂創業家による山内財団の評議員ほか、企業エグゼクティブへ向けたコーチングも担当。
        </p>
        <p className="artisan-detail__text" data-ja="ホテルの空間デザイン、アパレルブランドなどの監修も手がける。" data-zh-hans="亦担任酒店空间设计、服装品牌等的监制工作。" data-zh-hant="亦擔任酒店空間設計、服裝品牌等的監製工作。" data-en="Also engaged in the direction of spatial design for hotels and the creative supervision of clothing brands.">
          ホテルの空間デザイン、アパレルブランドなどの監修も手がける。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="両足院 坐禅指導" data-zh-hans="两足院坐禅指导" data-zh-hant="兩足院坐禪指導" data-en={"Zazen (zen meditation) instructor at Ry\u014Dsoku-in"}>両足院 坐禅指導</li>
          <li data-ja="InTrip 瞑想アプリ" data-en="InTrip meditation app" data-zh-hans="InTrip冥想应用程序" data-zh-hant="InTrip冥想應用程式">InTrip 瞑想アプリ</li>
          <li data-ja="著書『月曜瞑想』" data-zh-hans="著作《周一冥想》" data-zh-hant="著作《週一冥想》" data-en={'Published work: "Monday Meditation"'}>著書『月曜瞑想』</li>
          <li data-ja="Forbes JAPAN「NEXT100」（2023年）選出" data-zh-hans="获选Forbes JAPAN「NEXT100」（2023年）" data-zh-hant="獲選Forbes JAPAN「NEXT100」（2023年）" data-en={'Selected Forbes JAPAN "NEXT100" (2023)'}>Forbes JAPAN「NEXT100」（2023年）選出</li>
          <li data-ja="Newsweek「世界が尊敬する日本人100」" data-zh-hans="Newsweek「世界尊敬的100位日本人」" data-zh-hant="Newsweek「世界尊敬的100位日本人」" data-en={'Newsweek "100 Japanese Respected by the World"'}>Newsweek「世界が尊敬する日本人100」</li>
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
            <p className="artisan-detail__role">Metal Leaf Artist</p>
            <p className="artisan-detail__jp" data-ja="裕人 礫翔" data-en="Rakusho Hiroto">裕人 礫翔</p>
          </div>
          <p className="artisan-detail__en">HIROTO RAKUSHO</p>
        </div>
        <p className="artisan-detail__text" data-ja={"1962年、京都・西陣生まれ。経済産業省認定 伝統工芸士、箔アーティスト。父であり京都市伝統産業技術功労者の西山治作氏に師事し、箔工芸技術を学ぶ。2002年に自身のブランド「裕人礫翔」を設立。"} data-zh-hans="1962年生于京都西阵。经济产业省认定传统工艺士，箔艺术家。师从身为京都市传统产业技术功劳者之父西山治作，学习箔工艺技术。2002年创立个人品牌「裕人砾翔」。" data-zh-hant="1962年生於京都西陣。經濟產業省認定傳統工藝士，箔藝術家。師從身為京都市傳統產業技術功勞者之父西山治作，學習箔工藝技術。2002年創立個人品牌「裕人礫翔」。" data-en={"Born in 1962 in Nishijin, Kyoto, he is a certified Traditional Craftsman recognized by Japan\u2019s Ministry of Economy, Trade and Industry, as well as a gold leaf artist. He trained under his father, Jisaku Nishiyama, an honored master of Kyoto\u2019s traditional industries, where he acquired refined techniques in gold leaf craftsmanship. In 2002, he established his own brand, \u201CHiroto Rakush\u014D\u201D."}>
          1962年、京都・西陣生まれ。経済産業省認定 伝統工芸士、箔アーティスト。父であり京都市伝統産業技術功労者の西山治作氏に師事し、箔工芸技術を学ぶ。2002年に自身のブランド「裕人礫翔」を設立。
        </p>
        <p className="artisan-detail__text" data-ja={"独自の特許技術により、経年劣化した金箔や文化財の質感を再現する手法を確立。国宝「風神雷神図屏風」（建仁寺）、南禅寺、妙心寺、二条城、名古屋城などの障壁画の複製を手掛ける。"} data-zh-hans="凭借独特的专利技术，确立了再现历经岁月劣化的金箔及文化财质感的手法。承制国宝《风神雷神图屏风》（建仁寺）、南禅寺、妙心寺、二条城、名古屋城等障壁画的复制品。" data-zh-hant="藉由獨特的專利技術，確立了再現歷經歲月劣化的金箔及文化財質感的手法。承製國寶《風神雷神圖屏風》（建仁寺）、南禪寺、妙心寺、二條城、名古屋城等障壁畫的複製品。" data-en={"Through his own patented techniques, he has developed methods to faithfully reproduce the aged texture of gold leaf and cultural artifacts. His commissions include National Treasure \u201CWind and Thunder Gods Folding Screen\u201D (Kennin-ji), and the sliding door paintings of Nanzen-ji Temple, My\u014Dshin-ji Temple, Nij\u014D Castle, and Nagoya Castle."}>
          独自の特許技術により、経年劣化した金箔や文化財の質感を再現する手法を確立。国宝「風神雷神図屏風」（建仁寺）、南禅寺、妙心寺、二条城、名古屋城などの障壁画の複製を手掛ける。
        </p>
        <p className="artisan-detail__text" data-ja="さらに、従来引き立て役とされてきた金・銀・プラチナなどの金属箔を主役に用いた空間デザインや工芸美術などのアート作品を創造し、日本のみならずニューヨーク、パリ、上海、クウェートなどで国際的に活動。各方面から高い評価を受けている。ルーブル美術館、G8洞爺湖サミット、上海万博などでも展示の実績がある。" data-zh-hans="更进一步，创造以往被视为配角的金、银、铂等金属箔为主角的空间设计及工艺美术等艺术作品，不仅在日本国内，更在纽约、巴黎、上海、科威特等地开展国际活动，广受各界高度评价。在卢浮宫、G8洞爷湖峰会、上海世博会等场合均有展出实绩。" data-zh-hant="更進一步，創造以往被視為配角的金、銀、鉑等金屬箔為主角的空間設計及工藝美術等藝術作品，不僅在日本國內，更在紐約、巴黎、上海、科威特等地開展國際活動，廣受各界高度評價。在羅浮宮、G8洞爺湖峰會、上海世博會等場合均有展出實績。" data-en={"Going beyond the traditional supporting role of metallic foil, he has created spatial design works and art pieces in which gold, silver, and platinum foil take center stage, earning international recognition through exhibitions and projects in New York, Paris, Shanghai, and Kuwait. His work has been featured at the Louvre Museum, the G8 T\u014Dyako Summit, and the Shanghai World Expo."}>
          さらに、従来引き立て役とされてきた金・銀・プラチナなどの金属箔を主役に用いた空間デザインや工芸美術などのアート作品を創造し、日本のみならずニューヨーク、パリ、上海、クウェートなどで国際的に活動。各方面から高い評価を受けている。ルーブル美術館、G8洞爺湖サミット、上海万博などでも展示の実績がある。
        </p>
        <div className="artisan-detail__section">
          <p className="artisan-detail__section-title" data-ja="代表的な実績" data-en="Representative Works" data-zh-hans="代表性业绩" data-zh-hant="代表性實績">代表的な実績</p>
          <div className="artisan-detail__section-line"></div>
        </div>
        <ul className="artisan-detail__list">
          <li data-ja="国宝「風神雷神図屏風」複製（建仁寺）" data-zh-hans="国宝《风神雷神图屏风》复制（建仁寺）" data-zh-hant="國寶《風神雷神圖屏風》複製（建仁寺）" data-en={'National Treasure "Wind and Thunder Gods Folding Screen" (Kennin-ji)'}>国宝「風神雷神図屏風」複製（建仁寺）</li>
          <li data-ja="南禅寺、妙心寺、二条城、名古屋城 障壁画複製" data-zh-hans="南禅寺、妙心寺、二条城、名古屋城障壁画复制" data-zh-hant="南禪寺、妙心寺、二條城、名古屋城障壁畫複製" data-en={"Sliding door paintings for Nanzen-ji Temple, My\u014Dshin-ji Temple, Nij\u014D Castle, and Nagoya Castle"}>南禅寺、妙心寺、二条城、名古屋城 障壁画複製</li>
          <li data-ja="シアトル美術館、メトロポリタン美術館 作品複製協力" data-en="Collaboration with Seattle Art Museum and The Metropolitan Museum of Art" data-zh-hans="西雅图美术馆、大都会艺术博物馆作品复制协力" data-zh-hant="西雅圖美術館、大都會藝術博物館作品複製協力">シアトル美術館、メトロポリタン美術館 作品複製協力</li>
          <li data-ja="Ralph Rucci、GIVENCHY、片岡鶴太郎 コラボレーション" data-en="Collaboration with Ralph Rucci, GIVENCHY, and Kataoka Tsurutaro" data-zh-hans="与Ralph Rucci、GIVENCHY、片冈鹤太郎合作" data-zh-hant="與Ralph Rucci、GIVENCHY、片岡鶴太郎合作">Ralph Rucci、GIVENCHY、片岡鶴太郎 コラボレーション</li>
          <li data-ja="ルーブル美術館、G8サミット、上海万博 展示" data-en="Exhibitions at the Louvre Museum, G8 Summit, and Shanghai World Expo" data-zh-hans="卢浮宫、G8峰会、上海世博会展出" data-zh-hant="羅浮宮、G8峰會、上海世博會展出">ルーブル美術館、G8サミット、上海万博 展示</li>
        </ul>
        <ArtisanProfessionalsGallery artisanId="8" artisanName="HIROTO RAKUSHO" />
      </article>

      <article className="artisan-detail__content" data-artisan-detail="9">
        <img src="/assets/images/gallery/IzuminokamiKanesada/toshizo4.jpg" alt="和泉守兼定" className="artisan-detail__portrait artisan-detail__portrait--wide" />
        <div className="artisan-detail__meta">
          <div className="artisan-detail__meta-copy">
            <p className="artisan-detail__role">JAPANESE SWORD</p>
            <p className="artisan-detail__jp" data-ja="和泉守兼定" data-en="Izuminokami Kanesada">和泉守兼定</p>
          </div>
        </div>
        <p className="artisan-detail__text" data-ja={"十一代 和泉守兼定 幕末期（19世紀中頃）室町後期の名工・二代目兼定（之定）を祖とする系譜に連なる刀工の名跡とされる。十一代目にあたる会津兼定は、会津藩主・松平容保に仕えた刀工として知られ、新選組副長・土方歳三の佩刀を打ったと伝えられている。"} data-zh-hans="第十一代和泉守兼定 幕末期（19世纪中叶）。相传为室町后期名匠、第二代兼定（之定）为祖先的刀工名跡传承。身为第十一代的会津兼定，以服侍会津藩主松平容保的刀工闻名，据传曾打造新选组副长土方岁三的佩刀。" data-zh-hant="第十一代和泉守兼定 幕末期（19世紀中葉）。相傳為室町後期名匠、第二代兼定（之定）為祖先的刀工名跡傳承。身為第十一代的會津兼定，以服侍會津藩主松平容保的刀工聞名，據傳曾打造新選組副長土方歲三的佩刀。" data-en={"Izumi-no-Kami Kanesada, Eleventh Generation, Late Edo Period (mid-19th century). The name Kanesada represents a blade lineage tracing its ancestry to the renowned swordsmith Kanesada II (Nosada) of the late Muromachi period. The Eleventh-generation Aizu Kanesada is known to have served as the Aizu domain lord Matsudaira Katamori, and is said to have forged the sword carried by Hijikata Toshiz\u014D, Vice Commander of the Shinsengumi."}>
          十一代 和泉守兼定 幕末期（19世紀中頃）室町後期の名工・二代目兼定（之定）を祖とする系譜に連なる刀工の名跡とされる。十一代目にあたる会津兼定は、会津藩主・松平容保に仕えた刀工として知られ、新選組副長・土方歳三の佩刀を打ったと伝えられている。
        </p>
        <p className="artisan-detail__text" data-ja="一方で、その刀は実戦で用いられることがなかったともされ、人を斬っていない刀として語られることがある。この点において、極めて稀少な存在と考えられている。" data-en="It is also said that this blade was never drawn in battle, a sword that has never taken a life. In this regard, it is considered an exceptionally rare artifact, one whose existence occupies a singular place in the canon of Japanese swordsmithing." data-zh-hans="另一方面，据说该刀从未在实战中使用，因而有时被称为未曾斩杀过人的刀。就此而言，被认为是极为罕见的存在。" data-zh-hant="另一方面，據說該刀從未在實戰中使用，因而有時被稱為未曾斬殺過人的刀。就此而言，被認為是極為罕見的存在。">
          一方で、その刀は実戦で用いられることがなかったともされ、人を斬っていない刀として語られることがある。この点において、極めて稀少な存在と考えられている。
        </p>
        <p className="artisan-detail__text" data-ja="こうした背景から、機能性だけでなく、美術工芸としての側面においても高い評価を受け、観賞・展示用途においても特異な価値を有する刀とされている。" data-en="Against this backdrop, the sword is highly esteemed not only for its functionality but also as a work of fine art, possessing a distinctive value for appreciation and exhibition." data-zh-hans="基于此等背景，该刀不仅在功能性方面，于美术工艺层面亦广受高度评价，被视为在观赏与展示用途上亦具有独特价值的名刀。" data-zh-hant="基於此等背景，該刀不僅在功能性方面，於美術工藝層面亦廣受高度評價，被視為在觀賞與展示用途上亦具有獨特價值的名刀。">
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
