import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/nav-components/Navbar";
import { AuthProvider } from './Context/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECommerce App",
  description: "My first next js application",
  icons:{
    icon:"favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
      >
        <AuthProvider>
          <Navbar />
          <main className="py-32 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200">
          {children}
          </main>
        </AuthProvider>

      </body>
    </html>
  );
}
