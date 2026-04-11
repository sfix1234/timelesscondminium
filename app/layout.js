import './globals.css';
import CookieConsentBanner from './components/cookie-consent-banner';

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i,c){var loaded=false;function hasConsent(){return d.cookie.split('; ').some(function(item){return item.trim().indexOf(c+'=accepted')===0;});}function load(){if(loaded){return;}loaded=true;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}w.__loadGTM=load;if(hasConsent()){load();}})(window,document,'script','dataLayer','GTM-M4JZ5P3P','ttc_cookie_consent');`
          }}
        />
      </head>
      <body>
        <CookieConsentBanner />
        {children}
      </body>
    </html>
  );
}
