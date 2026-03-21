import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import SiteBehavior from '../components/site-behavior';

export default function PrivacyPolicyPage() {
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
          <h1 className="privacy-page__title">PRIVACY POLICY</h1>
          <h2 className="privacy-page__subtitle">プライバシーポリシー</h2>

          <div className="privacy-page__content">
            <p>
              株式会社FIDO（以下「当社」）は、お客様のプライバシー保護に努めています。本プライバシーポリシーは、
              当ウェブサイトを訪問された際に、当社がどのように個人情報を収集、使用、保護するかを説明するものです。
            </p>

            <h3>1. 収集する情報</h3>
            <p>当社は以下の種類の情報を収集する場合があります：</p>
            <ul>
              <li>連絡先情報（氏名、メールアドレス、電話番号）</li>
              <li>利用データ（訪問ページ、サイト滞在時間）</li>
              <li>デバイス情報（IPアドレス、ブラウザの種類）</li>
            </ul>

            <h3>2. クッキーの使用について</h3>
            <p>
              当社は、閲覧体験の向上、サイトトラフィックの分析、訪問者の出所の把握のために、クッキーおよび類似の追跡技術を使用します。
              クッキーはブラウザの設定で管理できます。
            </p>

            <h3>3. 情報の使用目的</h3>
            <p>収集した情報は以下の目的で使用します：</p>
            <ul>
              <li>お問い合わせへの対応およびカスタマーサービスの提供</li>
              <li>ウェブサイトおよびサービスの改善</li>
              <li>マーケティング関連のご連絡（同意がある場合のみ）</li>
              <li>法的義務の遵守</li>
            </ul>

            <h3>4. データセキュリティ</h3>
            <p>
              当社は、お客様の個人情報を不正アクセス、改ざん、開示、破壊から保護するために、
              適切な技術的および組織的措置を講じています。
            </p>

            <h3>5. お客様の権利</h3>
            <p>
              お客様は、ご自身の個人情報へのアクセス、訂正、削除を要求する権利を有します。また、
              データ処理の一部に異議を唱えたり、制限したりすることもできます。これらの権利を行使するには、当社までご連絡ください。
            </p>

            <h3>6. 第三者サービス</h3>
            <p>
              当ウェブサイトには、第三者のウェブサイトへのリンクが含まれる場合があります。
              これらの外部サイトのプライバシー慣行については、当社は責任を負いません。
            </p>

            <h3>7. 本ポリシーの変更</h3>
            <p>
              当社は、本プライバシーポリシーを随時更新する場合があります。
              変更があった場合は、このページに新しいポリシーを掲載してお知らせします。
            </p>

            <h3>8. お問い合わせ</h3>
            <p>本プライバシーポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。</p>

            <p className="privacy-page__updated">最終更新日：2026年3月</p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <SiteBehavior />
    </div>
  );
}
