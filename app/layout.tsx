import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gamehub',
  description: 'An app to share gameviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            forcedTheme='dark'
            storageKey='gamehub-theme'
          >
            <Toaster theme='light' position='bottom-center' />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
