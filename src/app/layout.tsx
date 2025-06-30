"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Navbar from "./_components/Navbar/Navbar";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import store from "../lib/store";
import Layout from "./_components/Layout/Layout";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <title>Circle</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Layout>
                <Navbar />
                <Box sx={{ py: 2 }}>
                  {children}
                </Box>
              </Layout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
