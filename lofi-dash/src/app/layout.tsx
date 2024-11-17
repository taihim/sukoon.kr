import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script'
import { VT323 } from 'next/font/google'
import "./ui/globals.css";


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
const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-vt323',
  weight: "400"
});

export const metadata: Metadata = {
  title: "Sukoon.kr",
  description: "Sukoon.kr is a lofi dashboard for your second screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
                <Script
                    src="https://www.youtube.com/iframe_api"
                    strategy="beforeInteractive"
                />
            </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased vignette`}
      >
        {children}
      </body>
    </html>
  );
}
