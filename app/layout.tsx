import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
