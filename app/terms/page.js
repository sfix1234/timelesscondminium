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
          <h2 className="privacy-page__subtitle">利用規約</h2>

          <div className="privacy-page__content">
            <p>
              本ウェブサイトは株式会社FIDO（以下「当社」）が運営しています。ご利用にあたっては、
              以下の利用規約に同意いただいたものとみなします。
            </p>

            <h3>1. 適用範囲</h3>
            <p>
              本規約は、本ウェブサイトの閲覧および関連サービスの利用に関し、ユーザーと当社との間に適用されます。
            </p>

            <h3>2. 禁止事項</h3>
            <p>ユーザーは、以下の行為を行ってはなりません。</p>
            <ul>
              <li>法令または公序良俗に反する行為</li>
              <li>本ウェブサイトの運営を妨害する行為</li>
              <li>第三者または当社の権利・利益を侵害する行為</li>
              <li>虚偽情報の登録または送信</li>
            </ul>

            <h3>3. 知的財産権</h3>
            <p>
              本ウェブサイトに掲載される文章、画像、映像、デザイン等の著作権その他の知的財産権は、
              当社または正当な権利者に帰属します。
            </p>

            <h3>4. 免責事項</h3>
            <p>
              当社は、本ウェブサイトに掲載する情報の正確性・完全性・有用性について保証するものではありません。
              本ウェブサイトの利用により生じた損害について、当社は一切の責任を負いません。
            </p>

            <h3>5. サービス内容の変更等</h3>
            <p>
              当社は、ユーザーへの事前通知なく、本ウェブサイトの内容変更、提供中断または終了を行うことがあります。
            </p>

            <h3>6. 規約の変更</h3>
            <p>
              当社は、必要と判断した場合、本規約を随時変更できるものとします。変更後の規約は、本ページに掲載した時点で効力を生じます。
            </p>

            <h3>7. 準拠法・管轄</h3>
            <p>
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
