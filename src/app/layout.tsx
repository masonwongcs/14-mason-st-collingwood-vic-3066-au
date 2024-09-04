import './globals.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const gtUltra = localFont({
  src: [
    {
      path: '../font/GT-Ultra-Standard-Light.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../font/GT-Ultra-Standard-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../font/GT-Ultra-Standard-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
});

export const metadata: Metadata = {
  title: 'Bellroy Collect',
  description: 'A small game where you collect Bellroy products along the journey',
  icons: './images/owl.svg'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gtUltra.className}>{children}</body>
    </html>
  );
}
