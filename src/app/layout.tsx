import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainWithPadding } from "@/components/layout/MainWithPadding";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Fennor Developments | Solar, Electrical & ICF Construction | Slane, Co. Meath",
  description:
    "Over 20 years delivering quality construction and energy solutions in Meath and Ireland. Solar PV, electrical, ICF builds. SEAI registered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
