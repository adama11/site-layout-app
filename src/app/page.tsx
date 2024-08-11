import { Main } from '@/app/pages/main';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function App() {
  return (
    <main className={inter.className}>
      <Main />
    </main>
  );
}
