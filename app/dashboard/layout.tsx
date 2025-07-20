import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "../globals.css";
import DashboardLayoutClient from "@/components/dashboard/dashboard-layout-client";
import { getDashboardLayoutData } from "@/actions/dashboardLayout";

export const dynamic = 'force-dynamic';

const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "IVIE - dashboard",
  description: "Access your data, store and analytics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const response = await getDashboardLayoutData()

  const formattedData = {
  user: response.user
    ? {
        name: response.user.name,
        email: response.user.email,
        avatar: response.user.image ?? undefined,
      }
    : null,
  business: response.business
    ? {
        name: response.business.businessName, // map to `name`
        type: response.business.businessType,
        image: response.business.businessImageUrl,
        subdomain: response.business.subdomain,
        whatsappNumber: response.business.whatsappNumber,
        isActive: response.business.isActive,
        createdAt: response.business.createdAt.toISOString(), // convert Date -> string
      }
    : null,
};
 


  return (
    <div className={inter.className}>
      <DashboardLayoutClient data={formattedData}>{children}</DashboardLayoutClient>
    </div>
  );
}
