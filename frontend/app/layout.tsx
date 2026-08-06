import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Volleyball Mtaa Nairobi",
  description: "Play. Compete. Connect. Live Volleyball. Love Mtaa.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#002147",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-vball-bg text-vball-text antialiased`}>
        {children}
      </body>
    </html>
  );
}