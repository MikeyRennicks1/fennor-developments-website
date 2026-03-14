import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainWithPadding } from "@/components/layout/MainWithPadding";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/config/brand";
import "./globals.css";

const baseUrl = "https://fennor.ie";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL("https://fennor.ie"),
  title: "Solar Panels Meath | Electrician & Builders | Fennor Developments",
  description:
    "Solar panels Meath, electrician Meath, builders Meath. Solar PV, electrical & building renovations. SEAI registered. 20+ years. Free quote.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "Fennor Developments",
    images: brand.logoPath ? [{ url: `${baseUrl}${brand.logoPath}`, width: 320, height: 112, alt: brand.logoAlt }] : undefined,
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
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <JsonLd />
        <Header />
        <MainWithPadding>{children}</MainWithPadding>
        <Footer />
      </body>
    </html>
  );
}
