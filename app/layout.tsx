"use client"
import { Metadata } from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Provider from './provider';
import Navbar from '@/components/Navbar';
import 'app/globals.css';



export const metadata: Metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
