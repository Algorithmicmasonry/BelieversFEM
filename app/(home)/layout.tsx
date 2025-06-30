import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/app/globals.css"
import Navbar from "@/components/home-page/navbar";


const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "EKii",
  description: "Create an online store for your business in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
