import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from '@/components/Sidebar'
import { MobileNavbar } from '@/components/MobileNavbar'
import { BackButton } from "@/components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dumky Platform",
  description: "Платформа для творців та читачів книг",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="uk" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Dumky" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-mono`}>
      
        <div className='relative min-h-screen'>
          <div className='flex flex-col md:flex-row'>
            <Sidebar />
            <main className='flex-1 p-4 md:p-14 w-full overflow-x-hidden pb-24 md:pb-0'>
              {children}
            </main>
          </div>
          <MobileNavbar />
        </div>
      </body>
    </html>
  )
}
