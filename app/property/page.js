import SiteBehavior from '../components/site-behavior';
import PropertyCompare from '../components/property-compare';
import PropertyKumaVideo from '../components/property-kuma-video';
import PropertyPlanTabs from '../components/property-plan-tabs';
import PropertyContactForm from '../components/property-contact-form';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

export default function PropertyPage() {
  return (
    <div className="property-page">
      <main>
        <section className="property-hero property-hero--top">
          <div className="property-hero__bgvideo" aria-hidden="true">
            <iframe
              className="property-hero__bgvideo-embed"
              src="https://player.vimeo.com/video/1171460708?background=1&autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="THESILENCE_LPtakumi"
            ></iframe>
          </div>
          <div className="property-hero__overlay"></div>
          <SiteHeader
            headerClassName="property-page__header"
            navItems={[
              { labelJa: '構想', labelEn: 'Concept' },
              { labelJa: '設計', labelEn: 'Design' },
              { labelJa: '立地', labelEn: 'Location' },
              { labelJa: '間取り', labelEn: 'Plan' },
              { labelJa: 'アクセス', labelEn: 'Access' },
            ]}
          />
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

        <section className="property-kuma">
          <div className="property-kuma__inner">
            <div className="property-kuma__name">
              <p className="property-kuma__en">Kengo Kuma</p>
              <h2 className="property-kuma__jp">隈研吾</h2>
            </div>

            <PropertyKumaVideo />

            <p className="property-kuma__text">
              Kengo Kuma, the design supervisor of this residence, speaks about<br />
              THE SILENCE Furnished by ARMANI/CASA. Experience the special fusion of history,<br />
              craftsmanship, and luxury brands.
            </p>
          </div>
        </section>

        <section className="property-info">
          <div className="property-info__inner">
            <h2 className="property-info__title">PROPERTY INFO</h2>

            <PropertyPlanTabs />

            <div className="property-info__meta">
              <p className="property-info__room">DINING KITCHEN LIVING ROOM</p>
              <p className="property-info__floor">主屋 1F</p>
            </div>

            <div className="property-info__switch">
              <span className="property-info__arrow">◀</span>
              <span className="property-info__line"></span>
              <span className="property-info__label">Before</span>
              <span className="property-info__dot"></span>
              <span className="property-info__label">After</span>
              <span className="property-info__line"></span>
              <span className="property-info__arrow">▶</span>
            </div>

            <PropertyCompare
              beforeSrc="/assets/images/propatyinfo/timelesscondminium-01.png"
              afterSrc="/assets/images/propatyinfo/timelesscondminium-02.png"
              beforeAlt="Before image"
              afterAlt="After image"
            />

            <div className="property-info__foot">
              <div className="property-info__skills">
                <p className="property-info__skills-title">匠の技</p>
                <p className="property-info__skill">⊕ 梁</p>
                <p className="property-info__skill">⊕ 花道</p>
              </div>
              <div className="property-info__mini-plan" aria-hidden="true"></div>
            </div>
          </div>
        </section>

        <section className="property-access">
          <div className="property-access__inner">
            <h2 className="property-access__title">ACCESS</h2>

            <div className="property-access__layout">
              <div className="property-access__map-wrap">
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
                  <p className="property-access__label">車をご利用の場合</p>
                  <p className="property-access__text">新千歳空港から約90分</p>
                </div>

                <div className="property-access__block">
                  <p className="property-access__label">新幹線をご利用の場合</p>
                  <p className="property-access__text">
                    新千歳空港ヘリポートから敷地内ヘリポートまで25分
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="property-spec">
          <div className="property-spec__inner">
            <h2 className="property-spec__title">PROPERTY INFO</h2>
            <dl className="property-spec__table">
              <div className="property-spec__row"><dt>種別</dt><dd>ヴィラ</dd></div>
              <div className="property-spec__row"><dt>国</dt><dd>日本</dd></div>
              <div className="property-spec__row"><dt>寝室</dt><dd>2</dd></div>
              <div className="property-spec__row"><dt>浴室</dt><dd>2</dd></div>
              <div className="property-spec__row"><dt>築年</dt><dd>1828</dd></div>
              <div className="property-spec__row"><dt>構造</dt><dd>数寄屋造</dd></div>
              <div className="property-spec__row"><dt>敷地</dt><dd>256.96 m²</dd></div>
              <div className="property-spec__row"><dt>庭</dt><dd>66.55 m²</dd></div>
            </dl>
          </div>
        </section>

        <section className="property-director">
          <div className="property-director__inner">
            <h2 className="property-director__title">PRINCIPAL DIRECTOR</h2>

            <div className="property-director__image-wrap">
              <img
                src="/assets/images/artist_photo/KENJINAKAMURA.webp"
                alt="中村建治"
                className="property-director__image"
              />
            </div>

            <p className="property-director__role">総合監修</p>
            <h3 className="property-director__name">中村 建治</h3>

            <p className="property-director__text">
              2007年設立。震災を機に不動産事業へ転換し、首都圏のシングル層向けマンション開発で
              10年間に2,000戸超の供給実績を築いてきました。「人生の物語を紡ぐ空間」の創出を理念としています。<br />
              本プロジェクトは、その知見を活かした新たな挑戦です。京都の歴史的建築を再生し、世界最高峰のデザインと職人技を融合。
              日本の美意識が息づく次世代のラグジュアリー住宅を創造し、文化遺産を未来へと継承します。
            </p>

            <div className="property-director__book">
              <p className="property-director__book-label">著書</p>
              <p className="property-director__book-title">営業道　人間力を磨き、自らの市場価値を高める極意</p>
            </div>
          </div>
        </section>

        <section className="property-company">
          <div className="property-company__inner">
            <h2 className="property-company__title">COMPANY INFO</h2>
            <dl className="property-company__table">
              <div className="property-company__row"><dt>社名</dt><dd>株式会社フィード</dd></div>
              <div className="property-company__row"><dt>英文社名</dt><dd>FIDO INC.</dd></div>
              <div className="property-company__row"><dt>代表者</dt><dd>中村 建治</dd></div>
              <div className="property-company__row"><dt>設立</dt><dd>2007年（平成19年）8月23日</dd></div>
              <div className="property-company__row"><dt>資本金</dt><dd>9,900万円</dd></div>
              <div className="property-company__row"><dt>本社</dt><dd>〒106-0041<br />東京都港区麻布台1-11-9 BPRプレイス神谷町8F</dd></div>
              <div className="property-company__row"><dt>TEL</dt><dd>03-5545-8666</dd></div>
              <div className="property-company__row"><dt>FAX</dt><dd>03-5545-8677</dd></div>
              <div className="property-company__row"><dt>事業内容</dt><dd>不動産開発・売買・仲介 / 不動産リノベーション事業 / 建設事業 / 建物管理事業</dd></div>
            </dl>
          </div>
        </section>

        <section className="property-contact-block">
          <div className="property-contact-block__inner">
            <div className="property-contact-block__intro">
              <h2 className="property-contact-block__title">CONTACT</h2>
              <p className="property-contact-block__method">お問い合わせ方法</p>
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

            <p className="property-contact-block__lead">
              THE SILENCEに関するお問い合わせは、<br />
              WHATSAPPにご連絡いただくか、下記フォームよりお気軽にご連絡ください。<br />
              担当者より折り返し<br />
              ご連絡させていただきます。
            </p>

            <p className="property-contact-block__note">またはフォームにご記入ください</p>

            <PropertyContactForm />
          </div>
        </section>

        <section className="armani-homage">
          <div className="armani-homage__media"></div>
          <div className="armani-homage__overlay"></div>
          <div className="armani-homage__inner">
            <h2 className="armani-homage__title">GIORGIO ARMANI</h2>
            <div className="armani-homage__copy">
              <p>日本と京都をこよなく愛された</p>
              <p className="armani-homage__copy-break">世界の巨匠として築き上げられた</p>
              <p>美と気品に、深甚なる敬意を表します</p>
              <p>本プロジェクトがささやかながらも、</p>
              <p>オマージュとして捧げられることを、</p>
              <p>心より願っております</p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
      <SiteBehavior />
    </div>
  );
}
