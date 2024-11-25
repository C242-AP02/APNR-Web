"use client"

import { usePathname } from 'next/navigation';
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import { useState } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />

        <div className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
          <TopBar isSidebarOpen={isSidebarOpen} />
          <main className="flex-1 p-6 mt-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}