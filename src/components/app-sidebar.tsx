"use client";

import * as React from "react";
import {
  IconChartBar,
  IconListDetails,
  IconUsers,
  IconUserSquare,
} from "@tabler/icons-react";
import logo from "../../public/logo.svg";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "Juno Yu",
    email: "jxy1@calluscompany.com",
    avatar:
      "https://media.licdn.com/dms/image/v2/C4D03AQG6RpNu9eWnhg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1655268759218?e=1756944000&v=beta&t=3vsKBCVY13tfdiKl9yAsYTCNsr7zQJoeAgdd8LoSBMg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconChartBar,
    },
    {
      title: "Participants",
      url: "/participants",
      icon: IconUsers,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="CongKong Friends Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 transition-all dark:invert dark:brightness-0 dark:contrast-200"
                />
                <span className="text-base font-semibold">
                  CongKong Friends
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
