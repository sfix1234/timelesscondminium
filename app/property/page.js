import { cookies } from 'next/headers';
import SiteBehavior from '../components/site-behavior';
import Script from 'next/script';
import PropertyKumaVideo from '../components/property-kuma-video';
import PropertyContactForm from '../components/property-contact-form';
import PropertyFloorMapSwitcher from '../components/property-floor-map-switcher';

import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import AccessGate from '../components/access-gate';
import MapPopupBehavior from '../components/map-popup-behavior';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../../lib/access-control';

export default async function PropertyPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const isClientPreview = String(process.env.CLIENT_PREVIEW_ENABLED || '').trim().toLowerCase() === 'true';
  const isUnlocked = isClientPreview || Boolean(getSessionRecord(sessionToken));

  if (!isUnlocked) {
    return <AccessGate initialUnlocked={false}><></></AccessGate>;
  }

  return (
    <div className="property-page">
      <div className="property-hero__header">
        <SiteHeader
          scrolledTitle="DETAILS"
          navItems={[
            { labelJa: 'TOP', labelEn: 'TOP', target: '.property-hero--top' },
            { labelJa: 'PROPERTY', labelEn: 'PROPERTY', target: '#property-kuma' },
            { labelJa: 'CONTACT', labelEn: 'CONTACT', target: '.property-contact-block' },
          ]}
        />
      </div>
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
          <div className="property-hero__center-title">
            <span className="property-hero__center-title-text">TIMELESS CONDOMINIUM</span>
          </div>
          <div className="hero__bottom-logo">
            <div className="center-block hero__logo-overlay">
            </div>
            <img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" className="hero__bottom-logo-image" />
          </div>
        </section>

        <section className="property-kuma" id="property-kuma">
          <div className="property-kuma__sticky">
            <div className="property-kuma__inner">
              <div className="property-kuma__name">
                <h2 className="property-kuma__en">THE PROJECT MOVIE</h2>
              </div>

              <PropertyKumaVideo />
              <p className="property-kuma__subcopy">Kengo Kuma Speaks</p>

            </div>

            <section className="property-info property-info--intrude" id="property-info" aria-label="Property Info">
              <div className="property-info__inner">
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
              <div className="property-access__map-column">
                <div className="property-access__map-wrap">
                  <img
                    src="/assets/images/map-image/map-image.png"
                    className="property-access__map property-access__embed"
                    alt="上七軒 旧長谷川邸 地図"
                    loading="lazy"
                  />
                  <div className="property-access__map-inset" aria-hidden="true">
                    <img
                      src="/assets/images/map-image/image-popup.png"
                      className="property-access__map-inset-image"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <button className="property-access__pin" type="button" aria-label="北野天満宮の詳細を開く" data-map-pin></button>
                </div>
              </div>

              <div className="property-access__side">
                <div className="property-access__zoom-wrap">
                  <img
                    src="/assets/images/map-image/image-popup.png"
                    className="property-access__zoom"
                    alt="北野天満宮 周辺拡大図"
                    loading="lazy"
                  />
                </div>

                <div className="property-access__info">
                  <h3 className="property-access__subtitle">上七軒までのアクセス</h3>

                  <div className="property-access__block">
                    <p className="property-access__label">新幹線</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from">東京駅から</span>
                        <span className="property-access__time">約 3 時間</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from">大阪駅から</span>
                        <span className="property-access__time">約 1.3 時間</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label">飛行機</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from">羽田空港から</span>
                        <span className="property-access__time">約 3 時間</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from">伊丹空港から</span>
                        <span className="property-access__time">約 1.6 時間</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label">車</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from">京都駅から</span>
                        <span className="property-access__time">約 17 分</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from">祇園エリアから</span>
                        <span className="property-access__time">約 14 分</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label">徒歩</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from">北野白梅町駅から</span>
                        <span className="property-access__time">徒歩 約 11 分</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from">北野天満宮 東門から</span>
                        <span className="property-access__time">徒歩 約 1 分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="property-spec">
          <div className="property-spec__inner">
            <h2 className="property-spec__title">Project Overview</h2>
            <dl className="property-spec__table">
              <div className="property-spec__row"><dt>プロジェクト名</dt><dd>THE SILENCE - Furnished by ARMANI / CASA</dd></div>
              <div className="property-spec__row"><dt>所在地</dt><dd>〒602-8381 京都府京都市上京区真盛町698</dd></div>
              <div className="property-spec__row"><dt>交通</dt><dd>京福電気鉄道「北野白梅町駅」から徒歩約11分</dd></div>
              <div className="property-spec__row"><dt>敷地面積</dt><dd>256.95 ㎡</dd></div>
              <div className="property-spec__row"><dt>建築面積</dt><dd>155.00平米</dd></div>
              <div className="property-spec__row"><dt>延床面積</dt><dd>284.26 ㎡（計画予定）</dd></div>
              <div className="property-spec__row"><dt>構成</dt><dd>2BR ＋ 大広間（和の饗宴｜お座敷・宴席対応） ＋ 数寄屋造り茶室 ＋ サウナ＆スパ ＋ 水盤庭園</dd></div>
              <div className="property-spec__row"><dt>物件種別</dt><dd>迎賓邸宅</dd></div>
              <div className="property-spec__row"><dt>権利形態</dt><dd>所有権</dd></div>
              <div className="property-spec__row"><dt>引渡条件</dt><dd>フルリノベーション済・現況有姿</dd></div>
              <div className="property-spec__row"><dt>着工時期</dt><dd>2026年夏秋（予定）</dd></div>
              <div className="property-spec__row"><dt>竣工時期</dt><dd>2028年春夏（予定）</dd></div>
              <div className="property-spec__row"><dt>デザイン監修</dt><dd>株式会社隈研吾建築都市設計事務所</dd></div>
              <div className="property-spec__row"><dt>施工</dt><dd>株式会社金剛組</dd></div>
              <div className="property-spec__row"><dt>茶室施工</dt><dd>中村外二工務店</dd></div>
              <div className="property-spec__row"><dt>造園</dt><dd>御庭植治株式会社</dd></div>
              <div className="property-spec__row"><dt>家具 / アクセサリー</dt><dd>アルマーニ / カーザ</dd></div>
              <div className="property-spec__row"><dt>設計監理</dt><dd>株式会社アトリエ・プリコラージュ</dd></div>
              <div className="property-spec__row"><dt>販売パートナー</dt><dd>TonTon Forbes Global Properties（株式会社TonTon）</dd></div>
              <div className="property-spec__row"><dt>Executive Producer</dt><dd>中村建治</dd></div>
              <div className="property-spec__row"><dt>事業主</dt><dd>株式会社フィード</dd></div>
              <div className="property-spec__row"><dt>販売価格</dt><dd>ASK</dd></div>
              <div className="property-spec__row"><dt>備考</dt><dd>一括決済をご希望される場合、価格交渉のご相談を承ります。</dd></div>
            </dl>
          </div>
        </section>

        <section className="property-director">
          <div className="property-director__inner">
            <h2 className="property-director__title">THE TIMELESS CONDOMINIUM<br /><span className="property-director__subtitle">Executive Producer</span></h2>

            <div className="property-director__image-wrap">
              <img
                src="/assets/images/nakamura_president.jpg"
                alt="中村建治"
                className="property-director__image"
              />
            </div>

            <div className="property-director__content">
              <div className="property-director__identity">
                <div className="property-director__meta">
                  <p className="property-director__company">株式会社フィード 代表取締役</p>
                </div>
                <h3 className="property-director__name">中村建治</h3>
              </div>

              <div className="property-director__copy">
                <p className="property-director__text">
                  1972年生まれ、京都府出身。数々のBtoC営業でトップセールスの座を獲得。2007年、株式会社フィードを美容分野に従事した会社として設立。2011年、東日本大震災を契機に不動産事業へ業態転換。首都圏でのシングル層に向けた実需用コンパクトマンションの需要を開拓。2015年、デベロッパーとしてマンション開発事業を開始。「コンセプトブランディングデベロッパー」を標榜し、世界的ブランドとの連携によるマンション開発を次々と実現。日本市場における、「ブランデットレジデンス」の第一人者。実績として過去10年間で累計2000戸を超える分譲マンションを開発及び販売。<br />現在は、今後の更なるインバウンド需要の増加を視野に、海外富裕層に向けたマーケットの開拓に着手。新プロジェクトの第一弾では、京都・上七軒に佇む「旧 長谷川邸」を舞台に、世界最高峰の匠を招聘。「日本に宿る本質的な価値を、"邸宅"という姿で、百年後の世界へと紡ぐ」という志のもと、「THE TIMELESS CONDOMINIUM」を推進する。
                </p>
              </div>

              <div className="property-director__book">
                <p className="property-director__book-label">【著書】</p>
                <p className="property-director__book-title">『営業道』— 人間力を磨き、自らの市場価値を高める極意（幻冬舎刊）</p>
                <p className="property-director__book-sub">主要書店において、販売実績首位を獲得。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="armani-homage">
          <div className="armani-homage__media"></div>
          <div className="armani-homage__overlay"></div>
          <div className="armani-homage__inner">
            <div className="armani-homage__copy">
              <p>日本と京都をこよなく愛されたジョルジオ・アルマーニ</p>
              <p>世界の巨匠として築き上げられた美と気品に、深甚なる敬意を表します</p>
              <p>本プロジェクトがささやかながらも</p>
              <p>オマージュとして捧げられることを、心より願っております</p>
            </div>
          </div>
        </section>

        <section id="property-contact" className="property-contact-block">
          <div className="property-contact-block__inner">
            <div className="property-contact-block__intro">
              <h2 className="property-contact-block__title">CONTACT</h2>
              <p className="property-contact-block__lead">
                THE SILENCE - Furnished by ARMANI / CASAに関するお問い合わせは、<br />
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

        <SiteFooter />
      </main>
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
      <SiteBehavior />
      <MapPopupBehavior />
    </div>
  );
}
