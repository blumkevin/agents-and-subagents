import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PhoneFrame } from "@/components/phone-frame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aegis — Resident Security",
  description: "Liquid glass security companion for residents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="aurora-stage">
          <div className="aurora-blob" />
        </div>
        <PhoneFrame>{children}</PhoneFrame>
      </body>
    </html>
  );
}
