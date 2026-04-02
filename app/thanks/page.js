import Link from 'next/link';

export const metadata = {
  title: 'Thank you | THE TIMELESS CONDOMINIUM',
  robots: { index: false, follow: false }
};

export default function ThanksPage() {
  return (
    <div className="thanks-page">
      <div className="thanks-page__inner">
        <div className="thanks-page__icon">✓</div>
        <h1 className="thanks-page__title">Thank you</h1>
        <p className="thanks-page__text">
          お問い合わせいただき、誠にありがとうございます。<br />
          担当者より折り返しご連絡いたしますので、<br />
          今しばらくお待ちくださいませ。
        </p>
        <Link href="/property" className="thanks-page__back">
          物件ページに戻る
        </Link>
      </div>
    </div>
  );
}
