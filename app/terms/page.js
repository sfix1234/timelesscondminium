import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import SiteBehavior from '../components/site-behavior';

export default function TermsPage() {
  return (
    <div className="privacy-page">
      <SiteHeader
        headerClassName="privacy-page__header"
        navItems={[
          { labelJa: 'TOP', labelEn: 'TOP', target: '/' },
          { labelJa: 'PROPERTY', labelEn: 'PROPERTY', target: '/property' },
          { labelJa: 'CONTACT', labelEn: 'CONTACT', target: '/property' },
        ]}
      />

      <main className="privacy-page__main">
        <section className="privacy-page__section">
          <h1 className="privacy-page__title">TERMS</h1>
          <h2 className="privacy-page__subtitle" data-ja="利用規約" data-en="Terms of Use" data-zh-hans="使用条款" data-zh-hant="使用條款">利用規約</h2>

          <div className="privacy-page__content">
            <p data-ja="本ウェブサイトは株式会社FIDO及び株式会社TonTon（以下「当社」）が運営しています。ご利用にあたっては、以下の利用規約に同意いただいたものとみなします。" data-en="This website is operated by FIDO Inc. and TonTon Inc. (hereinafter &quot;the Company&quot;). By using this website, you are deemed to have agreed to the following Terms of Use." data-zh-hans="本网站由 FIDO 株式会社及 TonTon 株式会社（以下简称「本公司」）运营。使用本网站即视为您已同意以下使用条款。" data-zh-hant="本網站由 FIDO 株式會社及 TonTon 株式會社（以下簡稱「本公司」）營運。使用本網站即視為您已同意以下使用條款。">
              本ウェブサイトは株式会社FIDO及び株式会社TonTon（以下「当社」）が運営しています。ご利用にあたっては、
              以下の利用規約に同意いただいたものとみなします。
            </p>

            <h3 data-ja="1. 適用範囲" data-en="1. Scope of Application" data-zh-hans="1. 适用范围" data-zh-hant="1. 適用範圍">1. 適用範囲</h3>
            <p data-ja="本規約は、本ウェブサイトの閲覧および関連サービスの利用に関し、ユーザーと当社との間に適用されます。" data-en="These Terms apply between the user and the Company with respect to the browsing of this website and the use of related services." data-zh-hans="本条款适用于用户与本公司之间有关本网站浏览及相关服务使用的事项。" data-zh-hant="本條款適用於用戶與本公司之間有關本網站瀏覽及相關服務使用的事項。">
              本規約は、本ウェブサイトの閲覧および関連サービスの利用に関し、ユーザーと当社との間に適用されます。
            </p>

            <h3 data-ja="2. 禁止事項" data-en="2. Prohibited Activities" data-zh-hans="2. 禁止事项" data-zh-hant="2. 禁止事項">2. 禁止事項</h3>
            <p data-ja="ユーザーは、以下の行為を行ってはなりません。" data-en="Users shall not engage in any of the following activities:" data-zh-hans="用户不得从事以下行为：" data-zh-hant="用戶不得從事以下行為：">ユーザーは、以下の行為を行ってはなりません。</p>
            <ul>
              <li data-ja="法令または公序良俗に反する行為" data-en="Acts that violate laws or public order and morals" data-zh-hans="违反法律或公序良俗的行为" data-zh-hant="違反法律或公序良俗的行為">法令または公序良俗に反する行為</li>
              <li data-ja="本ウェブサイトの運営を妨害する行為" data-en="Acts that interfere with the operation of this website" data-zh-hans="妨害本网站运营的行为" data-zh-hant="妨害本網站營運的行為">本ウェブサイトの運営を妨害する行為</li>
              <li data-ja="第三者または当社の権利・利益を侵害する行為" data-en="Acts that infringe upon the rights or interests of third parties or the Company" data-zh-hans="侵害第三方或本公司权利、利益的行为" data-zh-hant="侵害第三方或本公司權利、利益的行為">第三者または当社の権利・利益を侵害する行為</li>
              <li data-ja="虚偽情報の登録または送信" data-en="Registration or transmission of false information" data-zh-hans="注册或发送虚假信息" data-zh-hant="註冊或傳送虛假資訊">虚偽情報の登録または送信</li>
            </ul>

            <h3 data-ja="3. 知的財産権" data-en="3. Intellectual Property Rights" data-zh-hans="3. 知识产权" data-zh-hant="3. 智慧財產權">3. 知的財産権</h3>
            <p data-ja="本ウェブサイトに掲載される文章、画像、映像、デザイン等の著作権その他の知的財産権は、当社または正当な権利者に帰属します。" data-en="Copyrights and other intellectual property rights for text, images, videos, designs, and other content published on this website belong to the Company or their rightful owners." data-zh-hans="本网站所刊载的文章、图片、视频、设计等的著作权及其他知识产权，归本公司或合法权利人所有。" data-zh-hant="本網站所刊載的文章、圖片、影片、設計等的著作權及其他智慧財產權，歸本公司或合法權利人所有。">
              本ウェブサイトに掲載される文章、画像、映像、デザイン等の著作権その他の知的財産権は、
              当社または正当な権利者に帰属します。
            </p>

            <h3 data-ja="4. 免責事項" data-en="4. Disclaimer" data-zh-hans="4. 免责声明" data-zh-hant="4. 免責聲明">4. 免責事項</h3>
            <p data-ja="当社は、本ウェブサイトに掲載する情報の正確性・完全性・有用性について保証するものではありません。本ウェブサイトの利用により生じた損害について、当社は一切の責任を負いません。" data-en="The Company does not guarantee the accuracy, completeness, or usefulness of information published on this website. The Company shall not be liable for any damages arising from the use of this website." data-zh-hans="本公司不保证本网站所刊载信息的准确性、完整性及实用性。对因使用本网站而产生的任何损害，本公司概不承担责任。" data-zh-hant="本公司不保證本網站所刊載資訊的準確性、完整性及實用性。對因使用本網站而產生的任何損害，本公司概不承擔責任。">
              当社は、本ウェブサイトに掲載する情報の正確性・完全性・有用性について保証するものではありません。
              本ウェブサイトの利用により生じた損害について、当社は一切の責任を負いません。
            </p>

            <h3 data-ja="5. サービス内容の変更等" data-en="5. Changes to Services" data-zh-hans="5. 服务内容的变更等" data-zh-hant="5. 服務內容的變更等">5. サービス内容の変更等</h3>
            <p data-ja="当社は、ユーザーへの事前通知なく、本ウェブサイトの内容変更、提供中断または終了を行うことがあります。" data-en="The Company may change, suspend, or terminate the content of this website without prior notice to users." data-zh-hans="本公司可能不经事先通知用户，变更、中止或终止本网站的内容。" data-zh-hant="本公司可能不經事先通知用戶，變更、中止或終止本網站的內容。">
              当社は、ユーザーへの事前通知なく、本ウェブサイトの内容変更、提供中断または終了を行うことがあります。
            </p>

            <h3 data-ja="6. 規約の変更" data-en="6. Changes to These Terms" data-zh-hans="6. 条款的变更" data-zh-hant="6. 條款的變更">6. 規約の変更</h3>
            <p data-ja="当社は、必要と判断した場合、本規約を随時変更できるものとします。変更後の規約は、本ページに掲載した時点で効力を生じます。" data-en="The Company may amend these Terms at any time as deemed necessary. Amended Terms shall take effect upon publication on this page." data-zh-hans="本公司在必要时可随时变更本条款。变更后的条款自本页面刊载之时起生效。" data-zh-hant="本公司在必要時可隨時變更本條款。變更後的條款自本頁面刊載之時起生效。">
              当社は、必要と判断した場合、本規約を随時変更できるものとします。変更後の規約は、本ページに掲載した時点で効力を生じます。
            </p>

            <h3 data-ja="7. 準拠法・管轄" data-en="7. Governing Law and Jurisdiction" data-zh-hans="7. 准据法与管辖" data-zh-hant="7. 準據法與管轄">7. 準拠法・管轄</h3>
            <p data-ja="本規約の解釈には日本法を準拠法とし、本ウェブサイトに関して生じる紛争は、当社本店所在地を管轄する裁判所を専属的合意管轄とします。" data-en="These Terms shall be governed by and construed in accordance with the laws of Japan. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the court having jurisdiction over the location of the Company&#39;s head office." data-zh-hans="本条款的解释以日本法律为准据法。与本网站有关产生的争议，以本公司总部所在地的法院为专属合意管辖法院。" data-zh-hant="本條款的解釋以日本法律為準據法。與本網站有關產生的爭議，以本公司總部所在地的法院為專屬合意管轄法院。">
              本規約の解釈には日本法を準拠法とし、本ウェブサイトに関して生じる紛争は、当社本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <SiteBehavior />
    </div>
  );
}
