import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/app/globals.css"
// import Navbar from "@/components/home-page/navbar";


const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "EKii - Onboarding",
  description: "Setting up your business to enjoy all benefits of the platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
