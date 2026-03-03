import PropertyCompare from '../components/property-compare';

export default function PropertyPage() {
  return (
    <div className="property-page">
      <main>
        <section className="property-hero property-hero--top">
          <div className="property-hero__overlay"></div>
          <div className="property-topbar">
            <div className="property-topbar__left">
              <span className="property-topbar__jpn">JPN</span>
              <span className="property-topbar__line"></span>
            </div>
            <div className="property-topbar__center">
              <span className="property-topbar__main">THE SILENCE</span>
              <span className="property-topbar__furnished">Furnished By</span>
              <span className="property-topbar__sub">ARMANI/CASA</span>
            </div>
            <div className="property-topbar__right">
              <span className="property-topbar__line"></span>
              <span className="property-topbar__line"></span>
            </div>
          </div>
          <div className="property-hero__inner">
            <h1 className="property-hero__title">PROPERTY</h1>
            <div className="property-hero__number-wrap">
              <span className="property-hero__number">01</span>
              <span className="property-hero__number-line"></span>
            </div>
            <div className="property-hero__brand">
              <p className="property-hero__brand-main">THE SILENCE</p>
              <p className="property-hero__brand-sub">ARMANI/CASA</p>
              <p className="property-hero__brand-furnished">Furnished By</p>
            </div>
          </div>
        </section>

        <section className="property-kuma">
          <div className="property-kuma__inner">
            <div className="property-kuma__name">
              <p className="property-kuma__en">Kengo Kuma</p>
              <h2 className="property-kuma__jp">隈研吾</h2>
            </div>

            <a href="#" className="property-kuma__video" aria-label="Kengo Kuma interview">
              <img
                src="https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?auto=format&fit=crop&w=1400&q=80"
                alt="Kengo Kuma interview visual"
                className="property-kuma__video-image"
              />
              <span className="property-kuma__play" aria-hidden="true"></span>
            </a>

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

            <div className="property-info__map-wrap">
              <img
                src="/assets/images/stage-message.jpeg"
                alt="間取り図"
                className="property-info__map"
              />
            </div>

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
              beforeSrc="/assets/images/stage-message.jpeg"
              afterSrc="/assets/images/stage-message.jpeg"
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

            <div className="property-access__map-wrap">
              <img
                src="/assets/images/stage-message.jpeg"
                alt="アクセスマップ"
                className="property-access__map"
              />
            </div>

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
                src="https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?auto=format&fit=crop&w=1400&q=80"
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
            <h2 className="property-contact-block__title">CONTACT</h2>
            <p className="property-contact-block__lead">
              THE SILENCEに関するお問い合わせは、<br />
              下記フォームよりお気軽にご連絡ください。<br />
              担当者より折り返し<br />
              ご連絡させていただきます。
            </p>

            <div className="property-contact-block__apps">
              <div className="property-contact-block__app">
                <span className="property-contact-block__app-icon property-contact-block__app-icon--wa">☎</span>
                <p>WHATSAPPで<br />問い合わせ</p>
              </div>
              <div className="property-contact-block__app">
                <span className="property-contact-block__app-icon property-contact-block__app-icon--line">LINE</span>
                <p>LINEで<br />問い合わせ</p>
              </div>
            </div>

            <p className="property-contact-block__note">またはフォームにご記入ください</p>

            <form className="property-contact-block__form">
              <label>
                お名前 *
                <input type="text" placeholder="山田 太郎" />
              </label>
              <label>
                メールアドレス *
                <input type="email" placeholder="example@email.com" />
              </label>
              <label>
                会社名
                <input type="text" placeholder="株式会社○○" />
              </label>
              <label>
                電話番号
                <input type="tel" placeholder="090-1234-5678" />
              </label>
              <label>
                お問い合わせ内容 *
                <textarea placeholder="お問い合わせ内容をご記入ください"></textarea>
              </label>
              <label className="property-contact-block__check">
                <input type="checkbox" />
                <span>私はプライバシーポリシーに同意します *</span>
              </label>
              <button type="button" className="property-contact-block__submit">送信する</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
