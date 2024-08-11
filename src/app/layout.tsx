import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Site Layout App',
  description: 'Site Layout App',
  metadataBase: new URL('https://site-layout-app.vercel.app'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
