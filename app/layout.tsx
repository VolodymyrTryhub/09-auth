import type { Metadata } from 'next';

import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes application',
};

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />

          <main>
            {children}
            {modal}
          </main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
