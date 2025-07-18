"use client";

import {
  AudioWaveform,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Map,
  Megaphone,
  PieChart,
  Settings,
  ShieldCheck,
  Store
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarProps } from "@/types/types";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { SidebarViewStoreCard} from "./view-store-card";

// This is sample data.
const navData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Marketplace",
      url: "#",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
        },
        {
          title: "Tracking",
          url: "/dashboard/tracking",
        },
        {
          title: "Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Content-Calendar",
          url: "/dashboard/calendar",
        },
        {
          title: "Emails",
          url: "/dashboard/emails",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Automation",
          url: "/dashboard/automation",
        },
        {
          title: "Messages",
          url: "/dashboard/messages",
        },
      ],
    },
    {
      title: "Compliance",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "Profit/Loss Statement",
          url: "/dashboard/profit_loss_statement",
        },
        {
          title: "CAC Registration",
          url: "/dashboard/cac_registration",
        },
        {
          title: "Trademark",
          url: "/dashboard/trademark",
        },
        {
          title: "SMEDAN",
          url: "/dashboard/smedan",
        },
      ],
    },
    {
      title: "Book-Keeping",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Balance Sheet",
          url: "/dashboard/settings",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ data }: AppSidebarProps) {
  console.log("This is the business data from the side bar", data.business);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {data.business && (
          <TeamSwitcher
            teams={{
              businessName: data.business.name,
              businessType: data.business.type,
              businessImageUrl: data.business.image,
            }}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        {/* <NavProjects projects={navData.projects} /> */}
      </SidebarContent>
      <SidebarViewStoreCard/>
      <SidebarFooter>{data.user && <NavUser user={data.user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
