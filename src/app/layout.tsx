import type { ReactNode } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Site Layout App',
  description: 'Site Layout App',
  metadataBase: new URL('https://site-layout-app.vercel.app'),
};

// biome-ignore lint/style/noDefaultExport: false
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
