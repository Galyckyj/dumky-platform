import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from '@/components/Sidebar'
import { MobileNavbar } from '@/components/MobileNavbar'

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
    <html lang="uk">
      <body className='font-mono'>
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
