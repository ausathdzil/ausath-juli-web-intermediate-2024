import { UserProvider } from '@/components/auth/user-provider';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getUser } from '@/lib/db/data';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Critix',
  description: 'A movie review website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPromise = getUser();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <UserProvider userPromise={userPromise}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="p-8 grow flex flex-col items-center gap-8">
              {children}
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
