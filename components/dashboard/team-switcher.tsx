"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher({
  teams,
}: {
  // The 'teams' prop now represents a single business object, not an array of teams.
  // Renamed for clarity based on the new usage.
  teams: {
    businessName: string;
    businessImageUrl?: string;
    businessType?: string;
  };
}) {
 

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full justify-start">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src={teams.businessImageUrl || "/default-team.png"}
              alt="business logo"
              width={50}
              height={50}
              className="size-4"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {teams.businessName || "N/A"}
            </span>
            <span className="truncate text-xs">
              {teams.businessType || "N/A"}{" "}
            </span>
          </div>
          {/* Removed ChevronsUpDown icon */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
