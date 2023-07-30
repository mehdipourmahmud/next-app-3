"use client"
import { Metadata } from 'next/head';
import { ReactNode, useEffect } from 'react';
import Footer from '@/components/Footer';
import Provider from './provider';
import Navbar from '@/components/Navbar';
// import { usePathname, useSearchParams } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // Combine the pathname and searchParams to get the complete currentPathname
  // const currentPathname = `${pathname}?${searchParams}`;

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`;
  //   console.log(url, '//');
  // }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
