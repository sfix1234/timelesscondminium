import { cookies } from 'next/headers';
import SiteBehavior from '../components/site-behavior';
import Script from 'next/script';
import PropertyKumaVideo from '../components/property-kuma-video';
import PropertyContactForm from '../components/property-contact-form';
import PropertyFloorMapSwitcher from '../components/property-floor-map-switcher';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import AccessGate from '../components/access-gate';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../../lib/access-control';

export default async function PropertyPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const isUnlocked = Boolean(getSessionRecord(sessionToken));

  if (!isUnlocked) {
    return <AccessGate initialUnlocked={false}><></></AccessGate>;
  }

  return (
    <div className="property-page">
      <main>
        <section className="property-hero property-hero--top">
          <div className="property-hero__bgvideo" aria-hidden="true">
            <div className="property-hero__bgvideo-ratio">
              <iframe
                className="property-hero__bgvideo-embed"
                src="https://player.vimeo.com/video/1171460708?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="THESILENCE_LPtakumi"
              ></iframe>
            </div>
          </div>
          <div className="property-hero__overlay"></div>
          <div className="property-hero__header">
            <SiteHeader
              centerTitle="The Timeless Condominium"
              navItems={[
                { labelJa: 'TOP', labelEn: 'TOP', target: '.property-hero--top' },
                { labelJa: 'PROPERTY', labelEn: 'PROPERTY', target: '#property-kuma' },
                { labelJa: 'CONTACT', labelEn: 'CONTACT', target: '.property-contact-block' },
              ]}
            />
          </div>
          <div className="property-hero__inner">
            <h1 className="property-hero__title">PROPERTY</h1>
            <div className="property-hero__number-wrap">
              <span className="property-hero__number">01</span>
              <span className="property-hero__number-line"></span>
            </div>
            <div className="property-hero__brand">
              <img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" className="property-hero__brand-logo" />
            </div>
          </div>
        </section>

        <section className="property-kuma" id="property-kuma">
          <div className="property-kuma__sticky">
            <div className="property-kuma__inner">
              <div className="property-kuma__name">
                <h2 className="property-kuma__en">Kengo Kuma Speaks</h2>
              </div>

              <PropertyKumaVideo />

              <p className="property-kuma__text">
                本邸のデザイン監修を務めた隈研吾が語る、THE SILENCE Furnished by ARMANI / CASA。<br />
                悠久の歴史と匠の技、そしてラグジュアリーブランドが織りなす、格別な調和をご体感ください。
              </p>
            </div>

            <section className="property-info property-info--intrude" id="property-info" aria-label="Property Info">
              <div className="property-info__inner">
                <div className="property-info__intro">
                  <img
                    src="/assets/images/THE%20SILENCE_logo.png"
                    alt="THE SILENCE Furnished by ARMANI / CASA"
                    className="property-info__logo"
                  />
                </div>
                <div className="property-info__details">
                  <PropertyFloorMapSwitcher />
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="property-access">
          <div className="property-access__inner">
            <h2 className="property-access__title">ACCESS</h2>

            <div className="property-access__layout">
              <div className="property-access__map-wrap">
                <p className="property-access__map-label">Floor Map</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1633.5179451028744!2d135.7359468179798!3d35.03083202741095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010785c8c4b309%3A0xae717f7dc9101ed3!2z5LiK5LiD6LuSIOmVt-iwt-W3nQ!5e0!3m2!1sja!2sjp!4v1772979101337!5m2!1sja!2sjp"
                  className="property-access__map property-access__embed"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="上七軒 旧長谷川邸 地図"
                ></iframe>
              </div>

              <div className="property-access__info">
                <div className="property-access__block">
                  <p className="property-access__label">新幹線</p>
                  <p className="property-access__text">
                    東京駅から …… 約3時間<br />
                    大阪駅から …… 約1.3時間
                  </p>
                </div>

                <div className="property-access__block">
                  <p className="property-access__label">飛行機</p>
                  <p className="property-access__text">
                    羽田空港から …… 約3時間（大阪国際空港から電車）<br />
                    伊丹空港から …… 約1.6時間
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="property-spec">
          <div className="property-spec__inner">
            <h2 className="property-spec__title">「THE SILENCE - Furnished by ARMANI / CASA」物件概要</h2>
            <dl className="property-spec__table">
              <div className="property-spec__row"><dt>物件概要</dt><dd>THE SILENCE - Furnished by ARMANI / CASA</dd></div>
              <div className="property-spec__row"><dt>所在地</dt><dd>〒602-8381 京都府京都市上京区真盛町698</dd></div>
              <div className="property-spec__row"><dt>交通</dt><dd>京福電気鉄道「北野白梅町駅」から徒歩約11分</dd></div>
              <div className="property-spec__row"><dt>敷地面積</dt><dd>256.95 ㎡</dd></div>
              <div className="property-spec__row"><dt>建築面積</dt><dd>155.00平米</dd></div>
              <div className="property-spec__row"><dt>延床面積</dt><dd>284.26 ㎡（計画予定）</dd></div>
              <div className="property-spec__row"><dt>建物用途</dt><dd>別荘及びホテルコンドミニアム</dd></div>
              <div className="property-spec__row"><dt>着工時期</dt><dd>2026年夏秋（予定）</dd></div>
              <div className="property-spec__row"><dt>竣工時期</dt><dd>2028年春夏（予定）</dd></div>
              <div className="property-spec__row"><dt>デザイン監修</dt><dd>株式会社隈研吾建築都市設計事務所</dd></div>
              <div className="property-spec__row"><dt>施工</dt><dd>株式会社金剛組</dd></div>
              <div className="property-spec__row"><dt>茶室施工</dt><dd>中村外二工務店</dd></div>
              <div className="property-spec__row"><dt>造園</dt><dd>御庭植治株式会社</dd></div>
              <div className="property-spec__row"><dt>家具 / アクセサリー</dt><dd>アルマーニ / カーザ</dd></div>
              <div className="property-spec__row"><dt>設計監理</dt><dd>株式会社アトリエ・プリコラージュ</dd></div>
              <div className="property-spec__row"><dt>事業主</dt><dd>株式会社フィード</dd></div>
              <div className="property-spec__row"><dt>販売価格</dt><dd>ASK</dd></div>
            </dl>
          </div>
        </section>

        <section className="property-director">
          <div className="property-director__inner">
            <h2 className="property-director__title">General Supervisor</h2>

            <div className="property-director__image-wrap">
              <img
                src="/assets/images/nakamura_president.jpg"
                alt="中村建治"
                className="property-director__image"
              />
            </div>

            <div className="property-director__identity">
              <div className="property-director__meta">
                <p className="property-director__company">株式会社フィード</p>
              </div>
              <h3 className="property-director__name">中村 建治</h3>
            </div>

            <p className="property-director__text">
              2007年、株式会社フィードを創業。2013年、東日本大震災を契機として不動産事業へと軸足を移し、首都圏におけるブランドとコラボしたシングル層向け分譲マンションの開発・供給に注力。以来10年余で2,000戸を超える住まいを世に送り出してまいりました。<br />
              「人生の物語を紡ぐ空間」この理念のもと、住まう方の人生に寄り添う空間の創出を使命として歩んでまいりました。<br />
              本プロジェクトは、その知見と矜持を礎とした新たな挑戦です。京都に受け継がれてきた歴史的建築の精神を継承しながら、世界最高峰の匠の技を融合。日本古来の美意識を現代に昇華させた次世代の格調ある邸宅として結実させます。<br />
              かけがえなき文化遺産を未来の世代へ受け渡すこと、それが私どもの揺るぎなき責務です。
            </p>

            <div className="property-director__book">
              <p className="property-director__book-label">著書</p>
              <p className="property-director__book-title">営業道　人間力を磨き、自らの市場価値を高める極意</p>
            </div>
          </div>
        </section>

        <section className="property-contact-block">
          <div className="property-contact-block__inner">
            <div className="property-contact-block__intro">
              <h2 className="property-contact-block__title">CONTACT</h2>
              <p className="property-contact-block__lead">
                THE SILENCE Furnished by ARMANI / CASAに関するお問い合わせは、<br />
                WHATSAPPにご連絡いただくか、下記フォームよりお気軽にご連絡ください。<br />
                担当者より折り返しご連絡をさせていただきます。
              </p>
              <div className="property-contact-block__apps">
                <a href="#" className="property-contact-block__app" aria-label="WHATSAPPで問い合わせ">
                  <span className="property-contact-block__app-icon property-contact-block__app-icon--wa">☎</span>
                  <div className="property-contact-block__app-body">
                    <p className="property-contact-block__app-title">WHATSAPPで問い合わせ</p>
                    <p className="property-contact-block__app-sub">ご要望を伺い、担当者が折り返しご案内します</p>
                  </div>
                </a>
              </div>
            </div>

            <p className="property-contact-block__note">またはフォームにご記入ください</p>

            <PropertyContactForm />
          </div>
        </section>

        <section className="armani-homage">
          <div className="armani-homage__media"></div>
          <div className="armani-homage__overlay"></div>
          <div className="armani-homage__inner">
            <div className="armani-homage__copy">
              <p>日本と京都をこよなく愛されたジョルジオ・アルマーニ</p>
              <p>世界の巨匠として築き上げられた美と気品に、深甚なる敬意を表します</p>
              <p>本プロジェクトがささやかながらも</p>
              <p>オマージュとして捧げられることを、心より願っております</p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
      <SiteBehavior />
    </div>
  );
}
