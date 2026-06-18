import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter"
 });


export const metadata: Metadata = {
  title: "DROCH.ART",
  description:
    "Digital product designer - UI/UX - Web developer - Branding",
  verification: {
    google: "VMBDKNiK4nHs5yNxzHQ2E0AN_4QSOr1o9Le5Ut3-cPg",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png", // opcional, si quieres icono Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
          rel="stylesheet"
        />      
        </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
