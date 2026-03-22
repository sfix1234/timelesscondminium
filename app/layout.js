import './globals.css';

export const metadata = {
  title: 'THE TIMELESS CONDOMINIUM',
  description: '日本の"美"を、千年先の世界へ紡ぐ。京都・上七軒に佇む、世界最高峰の匠が手がける唯一無二の邸宅。',
  openGraph: {
    title: 'THE TIMELESS CONDOMINIUM',
    description: '日本の"美"を、千年先の世界へ紡ぐ。京都・上七軒に佇む、世界最高峰の匠が手がける唯一無二の邸宅。',
    url: 'https://timelesscondominium.com',
    siteName: 'THE TIMELESS CONDOMINIUM',
    images: [
      {
        url: 'https://timelesscondominium.com/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'THE TIMELESS CONDOMINIUM',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE TIMELESS CONDOMINIUM',
    description: '日本の"美"を、千年先の世界へ紡ぐ。京都・上七軒に佇む、世界最高峰の匠が手がける唯一無二の邸宅。',
    images: ['https://timelesscondominium.com/assets/images/og-image.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
