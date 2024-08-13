import { Main } from '@/app/pages/main';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { TbLoader2 } from 'react-icons/tb';

const inter = Inter({ subsets: ['latin'] });

// biome-ignore lint/style/noDefaultExport: false
export default function App() {
  return (
    <main className={inter.className}>
      <Suspense
        fallback={
          <div>
            <TbLoader2 className="animate-spin" />
          </div>
        }
      >
        <Main />
      </Suspense>
    </main>
  );
}
