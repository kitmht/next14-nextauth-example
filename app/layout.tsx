import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/providers/auth-provider';
import NavHeader from '@/components/ui/nav-header';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'next14-nextauth-example',
  description: 'next14-nextauth-example',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <NavHeader />
          <main className="pt-12 h-screen">{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
