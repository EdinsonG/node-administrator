import React from 'react';
import type { Metadata } from "next";
import { CssBaseline } from '@mui/material';
import NextTopLoader from "nextjs-toploader"
import Providers from '@/app/providers';
import { ThemeSwitcher, LanguageSwitcher, GlobalModal, Loading } from '@/components';

export const metadata: Metadata = {
  title: "Node Administrator",
  description: "Edinson Cabello's technical test for the Web Developer vacancy at Grupo Apok",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <CssBaseline />
          <NextTopLoader color="#5750F1" showSpinner={false} />
          {children}
          <Loading />
          <GlobalModal />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </Providers>
      </body>
    </html>
  );
}
