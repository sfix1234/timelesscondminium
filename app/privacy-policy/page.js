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
            <p data-ja="株式会社FIDO及び株式会社TonTon（以下「当社」）は、お客様のプライバシー保護に努めています。本プライバシーポリシーは、当ウェブサイトを訪問された際に、当社がどのように個人情報を収集、使用、保護するかを説明するものです。" data-en="FIDO Inc. and TonTon Inc. (hereinafter &quot;the Company&quot;) are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect personal information when you visit our website." data-zh-hans="FIDO 株式会社及 TonTon 株式会社（以下简称「本公司」）致力于保护您的隐私。本隐私政策说明您访问本网站时，本公司如何收集、使用及保护您的个人信息。" data-zh-hant="FIDO 株式會社及 TonTon 株式會社（以下簡稱「本公司」）致力於保護您的隱私。本隱私政策說明您造訪本網站時，本公司如何收集、使用及保護您的個人資訊。">
              株式会社FIDO及び株式会社TonTon（以下「当社」）は、お客様のプライバシー保護に努めています。本プライバシーポリシーは、
              当ウェブサイトを訪問された際に、当社がどのように個人情報を収集、使用、保護するかを説明するものです。
            </p>

            <h3 data-ja="1. 収集する情報" data-en="1. Information We Collect" data-zh-hans="1. 收集的信息" data-zh-hant="1. 收集的資訊">1. 収集する情報</h3>
            <p data-ja="当社は以下の種類の情報を収集する場合があります：" data-en="We may collect the following types of information:" data-zh-hans="本公司可能收集以下类型的信息：" data-zh-hant="本公司可能收集以下類型的資訊：">当社は以下の種類の情報を収集する場合があります：</p>
            <ul>
              <li data-ja="連絡先情報（氏名、メールアドレス、電話番号）" data-en="Contact information (name, email address, phone number)" data-zh-hans="联系信息（姓名、电子邮箱、电话号码）" data-zh-hant="聯絡資訊（姓名、電子郵件、電話號碼）">連絡先情報（氏名、メールアドレス、電話番号）</li>
              <li data-ja="利用データ（訪問ページ、サイト滞在時間）" data-en="Usage data (pages visited, time spent on site)" data-zh-hans="使用数据（访问页面、站点停留时间）" data-zh-hant="使用資料（造訪頁面、網站停留時間）">利用データ（訪問ページ、サイト滞在時間）</li>
              <li data-ja="デバイス情報（IPアドレス、ブラウザの種類）" data-en="Device information (IP address, browser type)" data-zh-hans="设备信息（IP地址、浏览器类型）" data-zh-hant="裝置資訊（IP位址、瀏覽器類型）">デバイス情報（IPアドレス、ブラウザの種類）</li>
            </ul>

            <h3 data-ja="2. クッキーの使用について" data-en="2. Use of Cookies" data-zh-hans="2. Cookie 的使用" data-zh-hant="2. Cookie 的使用">2. クッキーの使用について</h3>
            <p data-ja="当社は、閲覧体験の向上、サイトトラフィックの分析、訪問者の出所の把握のために、クッキーおよび類似の追跡技術を使用します。クッキーはブラウザの設定で管理できます。" data-en="We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can manage cookies through your browser settings." data-zh-hans="本公司使用 Cookie 及类似追踪技术，以提升您的浏览体验、分析网站流量及了解访客来源。您可通过浏览器设置管理 Cookie。" data-zh-hant="本公司使用 Cookie 及類似追蹤技術，以提升您的瀏覽體驗、分析網站流量及了解訪客來源。您可透過瀏覽器設定管理 Cookie。">
              当社は、閲覧体験の向上、サイトトラフィックの分析、訪問者の出所の把握のために、クッキーおよび類似の追跡技術を使用します。
              クッキーはブラウザの設定で管理できます。
            </p>

            <h3 data-ja="3. 情報の使用目的" data-en="3. How We Use Your Information" data-zh-hans="3. 信息的使用目的" data-zh-hant="3. 資訊的使用目的">3. 情報の使用目的</h3>
            <p data-ja="収集した情報は以下の目的で使用します：" data-en="The information we collect is used for the following purposes:" data-zh-hans="所收集的信息将用于以下目的：" data-zh-hant="所收集的資訊將用於以下目的：">収集した情報は以下の目的で使用します：</p>
            <ul>
              <li data-ja="お問い合わせへの対応およびカスタマーサービスの提供" data-en="Responding to inquiries and providing customer service" data-zh-hans="回应咨询及提供客户服务" data-zh-hant="回應諮詢及提供客戶服務">お問い合わせへの対応およびカスタマーサービスの提供</li>
              <li data-ja="ウェブサイトおよびサービスの改善" data-en="Improving our website and services" data-zh-hans="改进本网站及服务" data-zh-hant="改進本網站及服務">ウェブサイトおよびサービスの改善</li>
              <li data-ja="マーケティング関連のご連絡（同意がある場合のみ）" data-en="Marketing communications (only with your consent)" data-zh-hans="营销相关通知（仅在您同意的情况下）" data-zh-hant="行銷相關通知（僅在您同意的情況下）">マーケティング関連のご連絡（同意がある場合のみ）</li>
              <li data-ja="法的義務の遵守" data-en="Compliance with legal obligations" data-zh-hans="遵守法律义务" data-zh-hant="遵守法律義務">法的義務の遵守</li>
            </ul>

            <h3 data-ja="4. データセキュリティ" data-en="4. Data Security" data-zh-hans="4. 数据安全" data-zh-hant="4. 資料安全">4. データセキュリティ</h3>
            <p data-ja="当社は、お客様の個人情報を不正アクセス、改ざん、開示、破壊から保護するために、適切な技術的および組織的措置を講じています。" data-en="We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." data-zh-hans="本公司采取适当的技术及组织性措施，保护您的个人信息免遭未经授权的访问、篡改、泄露或销毁。" data-zh-hant="本公司採取適當的技術及組織性措施，保護您的個人資訊免遭未經授權的存取、竄改、洩露或銷毀。">
              当社は、お客様の個人情報を不正アクセス、改ざん、開示、破壊から保護するために、
              適切な技術的および組織的措置を講じています。
            </p>

            <h3 data-ja="5. お客様の権利" data-en="5. Your Rights" data-zh-hans="5. 您的权利" data-zh-hant="5. 您的權利">5. お客様の権利</h3>
            <p data-ja="お客様は、ご自身の個人情報へのアクセス、訂正、削除を要求する権利を有します。また、データ処理の一部に異議を唱えたり、制限したりすることもできます。これらの権利を行使するには、当社までご連絡ください。" data-en="You have the right to request access to, correction of, or deletion of your personal information. You may also object to or restrict certain data processing activities. To exercise these rights, please contact us." data-zh-hans="您有权要求访问、更正或删除您的个人信息，亦可对部分数据处理活动提出异议或限制。如需行使上述权利，请与本公司联系。" data-zh-hant="您有權要求存取、更正或刪除您的個人資訊，亦可對部分資料處理活動提出異議或限制。如需行使上述權利，請與本公司聯絡。">
              お客様は、ご自身の個人情報へのアクセス、訂正、削除を要求する権利を有します。また、
              データ処理の一部に異議を唱えたり、制限したりすることもできます。これらの権利を行使するには、当社までご連絡ください。
            </p>

            <h3 data-ja="6. 第三者サービス" data-en="6. Third-Party Services" data-zh-hans="6. 第三方服务" data-zh-hant="6. 第三方服務">6. 第三者サービス</h3>
            <p data-ja="当ウェブサイトには、第三者のウェブサイトへのリンクが含まれる場合があります。これらの外部サイトのプライバシー慣行については、当社は責任を負いません。" data-en="Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites." data-zh-hans="本网站可能包含第三方网站的链接。本公司对这些外部网站的隐私做法不承担任何责任。" data-zh-hant="本網站可能包含第三方網站的連結。本公司對這些外部網站的隱私做法不承擔任何責任。">
              当ウェブサイトには、第三者のウェブサイトへのリンクが含まれる場合があります。
              これらの外部サイトのプライバシー慣行については、当社は責任を負いません。
            </p>

            <h3 data-ja="7. 本ポリシーの変更" data-en="7. Changes to This Policy" data-zh-hans="7. 本政策的变更" data-zh-hant="7. 本政策的變更">7. 本ポリシーの変更</h3>
            <p data-ja="当社は、本プライバシーポリシーを随時更新する場合があります。変更があった場合は、このページに新しいポリシーを掲載してお知らせします。" data-en="We may update this Privacy Policy from time to time. Any changes will be posted on this page." data-zh-hans="本公司可能随时更新本隐私政策。如有变更，将在此页面发布新的政策。" data-zh-hant="本公司可能隨時更新本隱私政策。如有變更，將在此頁面發布新的政策。">
              当社は、本プライバシーポリシーを随時更新する場合があります。
              変更があった場合は、このページに新しいポリシーを掲載してお知らせします。
            </p>

            <h3 data-ja="8. お問い合わせ" data-en="8. Contact Us" data-zh-hans="8. 联系我们" data-zh-hant="8. 聯絡我們">8. お問い合わせ</h3>
            <p data-ja="本プライバシーポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。" data-en="If you have any questions regarding this Privacy Policy, please contact us through the inquiry form." data-zh-hans="如对本隐私政策有任何疑问，请通过咨询表单与本公司联系。" data-zh-hant="如對本隱私政策有任何疑問，請透過諮詢表單與本公司聯絡。">本プライバシーポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。</p>

            <p className="privacy-page__updated" data-ja="最終更新日：2026年4月6日" data-en="Last updated: April 6, 2026" data-zh-hans="最后更新：2026年4月6日" data-zh-hant="最後更新：2026年4月6日">最終更新日：2026年4月6日</p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <SiteBehavior />
    </div>
  );
}
