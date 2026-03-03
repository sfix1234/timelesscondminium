import './globals.css';

export const metadata = {
  title: 'THE TIMELESS CONDOMINIUM',
  description: 'Timeless Condominium promotional site'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
