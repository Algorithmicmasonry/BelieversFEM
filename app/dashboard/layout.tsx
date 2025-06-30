import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "../globals.css";
import DashboardLayoutClient from "@/components/dashboard/dashboard-layout-client";

const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "EKii - dashboard",
  description: "Access your data, store and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </div>
  );
}
