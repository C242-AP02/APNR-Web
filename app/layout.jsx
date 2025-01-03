"use client"

import { usePathname } from 'next/navigation';
import localFont from "next/font/local";
import "./globals.css";
import { useState } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { AuthContextProvider } from '@/context/authContext';
import { Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/Topbar';
import { menuItems } from '@/constant/menuitems';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const isLandingPage = pathname === "/" || pathname === "/login";

  const isMainPage = menuItems.some(item => {
    if (item.url.includes(":")) {
      const dynamicPathRegex = new RegExp(`^${item.url.split("/:")[0]}/[^/]+$`);
      return dynamicPathRegex.test(pathname);
    }
    return pathname === item.url;
  });

  // <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased flex w-screen !overflow-x-hidden`}>
        <NextTopLoader showSpinner={false} />
        <ToastContainer 
          position='bottom-right'
        />
        <AuthContextProvider>
          <Sidebar
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
            className={`${!isMainPage ? "hidden" : ""}`}
          />

          <div className={`w-full ${!isMainPage ? "" : (isSidebarOpen  ? "sm:pl-64" : "sm:pl-20")}`}>
            <TopBar 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              className={`${!isMainPage ? "hidden" : ""}`}  
            />
            <main className={`${!isMainPage ? "" : "flex mt-24 w-full"}`}>
              <Suspense>
                {children}
              </Suspense>
            </main>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}