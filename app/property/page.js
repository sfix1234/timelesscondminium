import { cookies } from 'next/headers';
import SiteBehavior from '../components/site-behavior';
import Script from 'next/script';
import PropertyKumaVideo from '../components/property-kuma-video';
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
          ]}
        />
      </div>
      <main>
        <section className="property-hero property-hero--top">
          <div className="property-hero__bgvideo" aria-hidden="true">
            <div className="property-hero__bgvideo-ratio">
              <iframe
                className="property-hero__bgvideo-embed property-hero__bgvideo-embed--desktop"
                src="https://player.vimeo.com/video/1171460708?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="THESILENCE_LPtakumi_desktop"
              ></iframe>
              <iframe
                className="property-hero__bgvideo-embed property-hero__bgvideo-embed--mobile"
                src="https://player.vimeo.com/video/1180212115?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="THESILENCE_LPtakumi_mobile"
              ></iframe>
            </div>
          </div>
          <div className="property-hero__overlay"></div>
          <div className="property-hero__center-title">
            <span className="property-hero__center-title-text">THE TIMELESS CONDOMINIUM</span>
          </div>
          <div className="hero__bottom-logo">
            <div className="center-block hero__logo-overlay">
            </div>
            <img src="/assets/images/thesilence_logo_white.png" alt="THE SILENCE" className="hero__bottom-logo-image" />
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
                    data-ja-src="/assets/images/map-image/map-image.png"
                    data-en-src="/assets/images/map-image/map-image_en.png"
                    className="property-access__map property-access__embed"
                    alt="上七軒 旧長谷川邸 地図"
                    loading="lazy"
                  />
                  <div className="property-access__map-inset" aria-hidden="true">
                    <img
                      src="/assets/images/map-image/image-popup.png"
                      data-ja-src="/assets/images/map-image/image-popup.png"
                      data-en-src="/assets/images/map-image/image-popup_en.png"
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
                    data-ja-src="/assets/images/map-image/image-popup.png"
                    data-en-src="/assets/images/map-image/image-popup_en.png"
                    className="property-access__zoom"
                    alt="北野天満宮 周辺拡大図"
                    loading="lazy"
                  />
                </div>

                <div className="property-access__info">
                  <h3 className="property-access__subtitle" data-ja="上七軒までのアクセス" data-en="Access to Kamishichiken" data-zh-hans="交通信息" data-zh-hant="交通資訊">上七軒までのアクセス</h3>

                  <div className="property-access__block">
                    <p className="property-access__label" data-ja="新幹線" data-en="Shinkansen" data-zh-hans="新干线" data-zh-hant="新幹線">新幹線</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="東京駅から" data-en="From Tokyo Station" data-zh-hans="从东京站" data-zh-hant="自東京站">東京駅から</span>
                        <span className="property-access__time" data-ja="約 3 時間" data-en="Approx. 3 hours" data-zh-hans="约3小时" data-zh-hant="約3小時">約 3 時間</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="大阪駅から" data-en="From Osaka Station" data-zh-hans="从大阪站" data-zh-hant="自大阪站">大阪駅から</span>
                        <span className="property-access__time" data-ja="約 1.3 時間" data-en="Approx. 1 hour 20 minutes" data-zh-hans="约1小时20分" data-zh-hant="約1小時20分">約 1.3 時間</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label" data-ja="飛行機" data-en="By Air" data-zh-hans="航空" data-zh-hant="航空">飛行機</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="羽田空港から" data-en="From Haneda Airport (via Osaka Intl. Airport + train)" data-zh-hans="从羽田机场（经大阪国际机场转乘列车）" data-zh-hant="自羽田機場（經大阪國際機場轉乘電車）">羽田空港から</span>
                        <span className="property-access__time" data-ja="約 3 時間" data-en="Approx. 3 hours">約 3 時間</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="伊丹空港から" data-en="From Itami Airport" data-zh-hans="从伊丹机场" data-zh-hant="自伊丹機場">伊丹空港から</span>
                        <span className="property-access__time" data-ja="約 1.6 時間" data-en="Approx. 1 hour 35 minutes" data-zh-hans="约1小时35分" data-zh-hant="約1小時35分">約 1.6 時間</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label" data-ja="車" data-en="By Car" data-zh-hans="自驾" data-zh-hant="自駕">車</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="京都駅から" data-en="From Kyoto Station (6.1 km)" data-zh-hans="从京都站（约6.1公里）" data-zh-hant="自京都站（約6.1公里）">京都駅から</span>
                        <span className="property-access__time" data-ja="約 17 分" data-en="Approx. 17 minutes" data-zh-hans="约17分钟" data-zh-hant="約17分鐘">約 17 分</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="祇園エリアから" data-en="From the Gion district (6.0 km)" data-zh-hans="从祇园地区（约6公里）" data-zh-hant="自祇園地區（約6公里）">祇園エリアから</span>
                        <span className="property-access__time" data-ja="約 14 分" data-en="Approx. 14 minutes" data-zh-hans="约14分钟" data-zh-hant="約14分鐘">約 14 分</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-access__block">
                    <p className="property-access__label" data-ja="徒歩" data-en="On Foot" data-zh-hans="步行" data-zh-hant="步行">徒歩</p>
                    <div className="property-access__rows">
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="北野白梅町駅から" data-en="From Kitano-Hakubaicho Station, Randen Line (approx. 450 m)" data-zh-hans="从岚电北野白梅町站（约450米）" data-zh-hant="自嵐電北野白梅町站（約450公尺）">北野白梅町駅から</span>
                        <span className="property-access__time" data-ja="徒歩 約 7 分" data-en="Approx. 7 minutes" data-zh-hans="约7分钟" data-zh-hant="約7分鐘">徒歩 約 7 分</span>
                      </div>
                      <div className="property-access__row">
                        <span className="property-access__from" data-ja="北野天満宮 東門から" data-en="From the East Gate of Kitano Tenmangu Shrine (approx. 80 m)">北野天満宮 東門から</span>
                        <span className="property-access__time" data-ja="徒歩 約 1 分" data-en="Approx. 1 minute">徒歩 約 1 分</span>
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
              <div className="property-spec__row"><dt data-ja="プロジェクト名" data-en="Project" data-zh-hans="项目名称" data-zh-hant="專案名稱">プロジェクト名</dt><dd data-ja="THE SILENCE - Furnished by ARMANI / CASA" data-en="THE SILENCE - Furnished by ARMANI / CASA" data-zh-hans="THE SILENCE - Furnished by ARMANI / CASA" data-zh-hant="THE SILENCE - Furnished by ARMANI / CASA">THE SILENCE - Furnished by ARMANI / CASA</dd></div>
              <div className="property-spec__row"><dt data-ja="所在地" data-en="Address" data-zh-hans="地址" data-zh-hant="地址">所在地</dt><dd data-ja="〒602-8381 京都府京都市上京区真盛町698" data-en="698 Masamoricho, Kamigyo-ku, Kyoto 602-8381, Japan" data-zh-hans="日本京都府京都市上京区真盛町698，邮政编码602-8381" data-zh-hant="日本京都府京都市上京區真盛町698（郵遞區號602-8381）">〒602-8381 京都府京都市上京区真盛町698</dd></div>
              <div className="property-spec__row"><dt data-ja="交通" data-en="Access" data-zh-hans="交通信息" data-zh-hant="交通資訊">交通</dt><dd data-ja="京福電気鉄道「北野白梅町駅」から徒歩約11分" data-en="Approx. 11-minute walk from Kitano-Hakubaicho Station on the Keifuku Electric Railroad." data-zh-hans="从京福电气铁道「北野白梅町站」步行约11分钟" data-zh-hant="自京福電氣鐵道「北野白梅町站」步行約11分鐘">京福電気鉄道「北野白梅町駅」から徒歩約11分</dd></div>
              <div className="property-spec__row"><dt data-ja="敷地面積" data-en="Site Area" data-zh-hans="占地面积" data-zh-hant="用地面積">敷地面積</dt><dd data-ja="256.95 ㎡" data-en="256.95 m2" data-zh-hans="256.96 平方米" data-zh-hant="256.96 平方公尺">256.95 ㎡</dd></div>
              <div className="property-spec__row"><dt data-ja="建築面積" data-en="Building Footprint" data-zh-hans="建筑占地面积" data-zh-hant="建築面積">建築面積</dt><dd data-ja="155.00平米" data-en="155.00 m2" data-zh-hans="155.00 平方米" data-zh-hant="155.00 平方公尺">155.00平米</dd></div>
              <div className="property-spec__row"><dt data-ja="延床面積" data-en="Total Floor Area" data-zh-hans="总建筑面积" data-zh-hant="總建築面積">延床面積</dt><dd data-ja="284.26 ㎡（計画予定）" data-en="284.26 m2 (planned)" data-zh-hans="284.26 平方米（计划中）" data-zh-hant="284.26 平方公尺（計畫中）">284.26 ㎡（計画予定）</dd></div>
              <div className="property-spec__row"><dt data-ja="庭" data-en="Garden" data-zh-hans="庭院" data-zh-hant="庭院">庭</dt><dd data-ja="66.55 ㎡" data-en="66.55 m2" data-zh-hans="66.55 平方米" data-zh-hant="66.55 平方公尺">66.55 ㎡</dd></div>
              <div className="property-spec__row"><dt data-ja="間取り" data-en="Layout" data-zh-hans="户型" data-zh-hant="格局">間取り</dt><dd data-ja="2LDK+大広間+茶室+サウナ&スパ" data-en="2BR + Grand Reception Hall (Accommodating several guests for private banquets) + Sukiya Tea Room + Historic Kura Sauna & Spa + Designer Water Garden" data-zh-hans="2LDK＋大广间（和之盛宴｜榻榻米宴席对应）＋茶室＋桑拿&水疗" data-zh-hant="2LDK＋大廣間（和之饗宴｜榻榻米・宴席對應）＋茶室＋三溫暖＆水療">2LDK+大広間+茶室+サウナ&スパ</dd></div>
              <div className="property-spec__row"><dt data-ja="建物用途" data-en="Property Type" data-zh-hans="物业类别" data-zh-hant="物業類型">建物用途</dt><dd data-ja="迎賓邸宅（セカンド，ホテルコンドミニアム）" data-en="Private Artistic Master Guest House" data-zh-hans="第二住宅、酒店式公寓（Hotel Condominium）" data-zh-hant="第二住宅、酒店式公寓（Hotel Condominium）">迎賓邸宅（セカンド，ホテルコンドミニアム）</dd></div>
              <div className="property-spec__row"><dt data-ja="権利形態" data-en="Land Tenure" data-zh-hans="产权性质" data-zh-hant="權利形式">権利形態</dt><dd data-ja="所有権" data-en="Freehold" data-zh-hans="所有权" data-zh-hant="所有權">所有権</dd></div>
              <div className="property-spec__row"><dt data-ja="引渡条件" data-en="Delivery Condition" data-zh-hans="交付条件" data-zh-hant="交屋條件">引渡条件</dt><dd data-ja="フルリノベーション済・現況有姿" data-en="Delivered as fully renovated." data-zh-hans="已完成全面翻新，按现状交付" data-zh-hant="已完成全面翻新／依現況交付">フルリノベーション済・現況有姿</dd></div>
              <div className="property-spec__row"><dt data-ja="着工時期" data-en="Construction Start" data-zh-hans="开工时间" data-zh-hant="開工時間">着工時期</dt><dd data-ja="2026年夏秋（予定）" data-en="Summer–Autumn 2026 (planned)" data-zh-hans="2026年夏秋（预定）" data-zh-hant="2026年夏秋（預定）">2026年夏秋（予定）</dd></div>
              <div className="property-spec__row"><dt data-ja="竣工時期" data-en="Completion" data-zh-hans="竣工时间" data-zh-hant="竣工時間">竣工時期</dt><dd data-ja="2028年春夏（予定）" data-en="Spring–Summer 2028 (planned)" data-zh-hans="2028年春夏（预定）" data-zh-hant="2028年春夏（預定）">2028年春夏（予定）</dd></div>
              <div className="property-spec__row"><dt data-ja="デザイン監修" data-en="Design Supervision" data-zh-hans="设计监修" data-zh-hant="設計監修">デザイン監修</dt><dd data-ja="株式会社隈研吾建築都市設計事務所" data-en="Kengo Kuma / Kengo Kuma & Associates" data-zh-hans="隈研吾建筑都市设计事务所" data-zh-hant="隈研吾建築都市設計事務所">株式会社隈研吾建築都市設計事務所</dd></div>
              <div className="property-spec__row"><dt data-ja="施工" data-en="Main Construction" data-zh-hans="建筑施工" data-zh-hant="建築施工">施工</dt><dd data-ja="株式会社金剛組" data-en="Kongo Gumi Co., Ltd." data-zh-hans="株式会社金刚组" data-zh-hant="株式会社金剛組">株式会社金剛組</dd></div>
              <div className="property-spec__row"><dt data-ja="茶室施工" data-en="Teahouse Construction" data-zh-hans="茶室施工" data-zh-hant="茶室施工">茶室施工</dt><dd data-ja="中村外二工務店" data-en="Nakamura Sotoji Komuten" data-zh-hans="中村外二工务店" data-zh-hant="中村外二工務店">中村外二工務店</dd></div>
              <div className="property-spec__row"><dt data-ja="造園" data-en="Landscape Design" data-zh-hans="造园" data-zh-hant="造園">造園</dt><dd data-ja="御庭植治株式会社" data-en="Onniwa Ueji Inc." data-zh-hans="御庭植治株式会社" data-zh-hant="御庭植治株式会社">御庭植治株式会社</dd></div>
              <div className="property-spec__row"><dt data-ja="家具 / アクセサリー" data-en="Furnishings / Accessories" data-zh-hans="家具 / 配饰" data-zh-hant="家具 / 配飾">家具 / アクセサリー</dt><dd data-ja="アルマーニ / カーザ" data-en="ARMANI / CASA" data-zh-hans="Armani / Casa" data-zh-hant="Armani / Casa">アルマーニ / カーザ</dd></div>
              <div className="property-spec__row"><dt data-ja="設計監理" data-en="Project Architect" data-zh-hans="设计监理" data-zh-hant="設計監理">設計監理</dt><dd data-ja="株式会社アトリエ・プリコラージュ" data-en="Atelier Bricolage Inc." data-zh-hans="株式会社アトリエ・プリコラージュ" data-zh-hant="株式會社 Atelier Pricolage">株式会社アトリエ・プリコラージュ</dd></div>
              <div className="property-spec__row"><dt data-ja="販売パートナー" data-en="Sales Agent" data-zh-hans="销售合作伙伴" data-zh-hant="銷售合作夥伴">販売パートナー</dt><dd data-ja="TonTon Forbes Global Properties（株式会社TonTon）" data-en="TonTon Inc." data-zh-hans="TonTon Forbes Global Properties（株式会社TonTon）" data-zh-hant="TonTon Forbes Global Properties（株式會社TonTon）">TonTon Forbes Global Properties（株式会社TonTon）</dd></div>
              <div className="property-spec__row"><dt data-ja="Executive Producer" data-en="Executive Producer" data-zh-hans="Executive Producer" data-zh-hant="Executive Producer">Executive Producer</dt><dd data-ja="中村建治" data-en="Kenji Nakamura" data-zh-hans="中村建治" data-zh-hant="中村建治">中村建治</dd></div>
              <div className="property-spec__row"><dt data-ja="事業主" data-en="Developer" data-zh-hans="开发商" data-zh-hant="開發商">事業主</dt><dd data-ja="株式会社フィード" data-en="Fido Inc." data-zh-hans="Feed Co.（株式会社フィード）" data-zh-hant="Feed Co.（株式会社フィード）">株式会社フィード</dd></div>
              <div className="property-spec__row"><dt data-ja="販売価格" data-en="Price" data-zh-hans="售价" data-zh-hant="售價">販売価格</dt><dd data-ja="ASK" data-en="ASK" data-zh-hans="详情请垂询（ASK）" data-zh-hant="詳情請洽詢（ASK）">ASK</dd></div>
              <div className="property-spec__row property-spec__row--note"><dt data-ja="備考" data-en="Note" data-zh-hans="备注" data-zh-hant="備註">備考</dt><dd data-ja="一括決済をご希望される場合、価格交渉のご相談を承ります。" data-en="Price is negotiable for buyers opting for 100% upfront payment." data-zh-hans="如需一次性付款，可协商价格。" data-zh-hant="如有一次性付款需求，價格可另行協商">一括決済をご希望される場合、価格交渉のご相談を承ります。</dd></div>

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
                  <p className="property-director__company" data-ja="株式会社フィード 代表取締役" data-en="Representative Director, FIDO INC.">株式会社フィード 代表取締役</p>
                </div>
                <h3 className="property-director__name" data-ja="中村建治" data-en="Kenji Nakamura">中村建治</h3>
              </div>

              <div className="property-director__copy">
                <p className="property-director__text" data-ja={"1972年生まれ、京都府出身。数々のBtoC営業でトップセールスの座を獲得。2007年、株式会社フィードを美容分野に従事した会社として設立。2011年、東日本大震災を契機に不動産事業へ業態転換。首都圏でのシングル層に向けた実需用コンパクトマンションの需要を開拓。2015年、デベロッパーとしてマンション開発事業を開始。「コンセプトブランディングデベロッパー」を標榜し、世界的ブランドとの連携によるマンション開発を次々と実現。日本市場における、「ブランデットレジデンス」の第一人者。実績として過去10年間で累計2000戸を超える分譲マンションを開発及び販売。"} data-zh-hans="1972年生，出身京都府。在众多BtoC业务中获得顶尖业绩。2007年以美容领域公司创立株式会社Feed。2011年以东日本大地震为契机，业态转换至不动产事业，开拓首都圈单身族实需用精巧公寓市场。2015年以开发商身份展开公寓开发事业，标榜「概念品牌开发商」，与世界级品牌合作相继实现公寓开发。为日本市场「品牌住宅」的第一人。过去10年间累计开发及销售逾2000户分让公寓。" data-zh-hant="1972年生，出身京都府。在眾多BtoC業務中獲得頂尖業績。2007年以美容領域公司創立株式會社Feed。2011年以東日本大震災為契機，業態轉換至不動產事業，開拓首都圈單身族實需用精巧公寓市場。2015年以開發商身份展開公寓開發事業，標榜「概念品牌開發商」，與世界級品牌合作相繼實現公寓開發。為日本市場「品牌住宅」的第一人。過去10年間累計開發及銷售逾2000戶分讓公寓。" data-en={"Born in 1972 in Kyoto Prefecture. He established himself as a top-performing sales professional across numerous B-to-C fields, he founded Fido Inc. in 2007 as a beauty industry company. Following the Great East Japan Earthquake in 2011, the business strategically pivoted to real estate, pioneering demand for compact residential developments tailored to single-occupant living in the Tokyo metropolitan area. In 2015, the company expanded into property development, positioning itself as a \u201Cconcept branding developer\u201D and delivering a series of projects in collaboration with globally renowned brands. Widely regarded as a leading figure in Japan\u2019s branded residence market, he has overseen the development and sale of more than 2,000 condominium units over the past decade."}>
                  1972年生まれ、京都府出身。数々のBtoC営業でトップセールスの座を獲得。2007年、株式会社フィードを美容分野に従事した会社として設立。2011年、東日本大震災を契機に不動産事業へ業態転換。首都圏でのシングル層に向けた実需用コンパクトマンションの需要を開拓。2015年、デベロッパーとしてマンション開発事業を開始。「コンセプトブランディングデベロッパー」を標榜し、世界的ブランドとの連携によるマンション開発を次々と実現。日本市場における、「ブランデットレジデンス」の第一人者。実績として過去10年間で累計2000戸を超える分譲マンションを開発及び販売。
                </p>
                <p className="property-director__text" data-ja={"現在は、今後の更なるインバウンド需要の増加を視野に、海外富裕層に向けたマーケットの開拓に着手。新プロジェクトの第一弾では、京都・上七軒に佇む「旧 長谷川邸」を舞台に、世界最高峰の匠を招聘。「日本に宿る本質的な価値を、\u201C邸宅\u201Dという姿で、百年後の世界へと紡ぐ」という志のもと、「THE TIMELESS CONDOMINIUM」を推進する。"} data-zh-hans="目前着眼于未来更大规模访日需求的增长，着手开拓面向海外富裕阶层的市场。新项目的首弹，以座落于京都上七轩的「旧长谷川邸」为舞台，招聘世界最顶尖的匠师。秉持「将日本蕴含的本质价值，以邸宅的形态，纺织传递给百年后世界」的志向，推进「THE TIMELESS CONDOMINIUM」。" data-zh-hant={"目前著眼於未來更大規模訪日需求的增長，著手開拓面向海外富裕階層的市場。新專案的首彈，以座落於京都上七軒的「舊長谷川邸」為舞台，招聘世界最頂尖的匠師。秉持「將日本蘊含的本質價值，以\u2018邸宅\u2019的形態，紡織傳遞給百年後世界」的志向，推進「THE TIMELESS CONDOMINIUM」。"} data-en={"Now setting his sights on the anticipated growth of inbound luxury demand, he has begun to cultivate a market oriented toward affluent international clients. As the inaugural project of this new direction, he has gathered the world\u2019s finest master craftsmen at the historic \u201CFormer Hasegawa Residence\u201D in Kyoto\u2019s Kamishichiken district, advancing \u201CTHE TIMELESS CONDOMINIUM\u201D with the conviction to \u201Cweave the essential values that dwell within Japan, in the form of a residence, into the world one hundred years from now.\u201D"}>
                  現在は、今後の更なるインバウンド需要の増加を視野に、海外富裕層に向けたマーケットの開拓に着手。新プロジェクトの第一弾では、京都・上七軒に佇む「旧 長谷川邸」を舞台に、世界最高峰の匠を招聘。「日本に宿る本質的な価値を、"邸宅"という姿で、百年後の世界へと紡ぐ」という志のもと、「THE TIMELESS CONDOMINIUM」を推進する。
                </p>
              </div>

              <div className="property-director__book">
                <p className="property-director__book-label" data-ja="【著書】" data-en="【Publication】">【著書】</p>
                <p className="property-director__book-title" data-ja={"『営業道』\u2014 人間力を磨き、自らの市場価値を高める極意（幻冬舎刊）"} data-zh-hans="《营业之道》── 磨炼人格魅力，提升自身市场价值的精髓（幻冬舍出版）" data-zh-hant="《業務之道》── 磨練人格魅力，提升自身市場價值的精髓（幻冬舍出版）" data-en={"\u201CThe Way of Sales\u201D \u2014 The Art of Cultivating Human Depth and Elevating One\u2019s Market Value (Published by Gentosha)"}>『営業道』— 人間力を磨き、自らの市場価値を高める極意（幻冬舎刊）</p>
                <p className="property-director__book-sub" data-ja="主要書店において、販売実績首位を獲得。" data-en="Achieved the No.1 sales position at major bookstores.">主要書店において、販売実績首位を獲得。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="armani-homage">
          <div className="armani-homage__media"></div>
          <div className="armani-homage__overlay"></div>
          <div className="armani-homage__inner">
            <div className="armani-homage__copy">
              <p data-ja="日本と京都をこよなく愛されたジョルジオ・アルマーニ" data-en="To Giorgio Armani, who held Japan, and Kyoto, in the deepest of affections." data-zh-hans="谨以此篇，献予挚爱日本与京都的乔治·阿玛尼" data-zh-hant="謹以此篇，獻予摯愛日本與京都的喬治·阿瑪尼。">日本と京都をこよなく愛されたジョルジオ・アルマーニ</p>
              <p data-ja="世界の巨匠として築き上げられた美と気品に、深甚なる敬意を表します" data-en="We offer our most profound respect to the beauty and elegance you built for the world." data-zh-hans="其所成就之美与气度，谨致以深切敬意。" data-zh-hant="其所成就之美與氣度，謹致以深切敬意。">世界の巨匠として築き上げられた美と気品に、深甚なる敬意を表します</p>
              <p data-ja="本プロジェクトがささやかながらもオマージュとして捧げられることを、心より願っております" data-en="It is our most sincere wish that this project may stand, however humbly, as a tribute to your honor." data-zh-hans="愿此番呈现，化作一份致意，静然流转。" data-zh-hant="願此番呈現，化作一份致意，靜然流轉。">本プロジェクトがささやかながらもオマージュとして捧げられることを、心より願っております</p>
            </div>
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
