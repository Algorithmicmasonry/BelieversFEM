import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/home-page/navbar";

const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "I.V.I.E",
  description: "Your all-in-one intelligent Virutal Interface For Enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Navbar />
      {children}
    </div>
  );
}
