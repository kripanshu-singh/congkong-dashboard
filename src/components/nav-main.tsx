"use client";

import { type Icon } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLoader } from "./loader";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setOpenMobile, isMobile } = useSidebar();
  const previousPathname = useRef(pathname);
  const navigationTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-collapse sidebar on mobile after navigation completes
  useEffect(() => {
    // Clear any existing timer
    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }

    if (isMobile && pathname !== previousPathname.current) {
      if (!isPending && !loadingItem) {
        navigationTimer.current = setTimeout(() => {
          setOpenMobile(false);
        }, 300);
      }
      previousPathname.current = pathname;
    }

    return () => {
      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current);
      }
    };
  }, [pathname, isPending, loadingItem, isMobile, setOpenMobile]);

  const handleNavigation = (item: {
    title: string;
    url: string;
    icon?: Icon;
  }) => {
    if (pathname === item.url) return;
    if (item.url.startsWith("#") || item.url.startsWith("http")) {
      if (item.url.startsWith("#")) return;
      window.open(item.url, "_blank");
      return;
    }

    setLoadingItem(item.title);

    startTransition(() => {
      router.push(item.url);
      if (isMobile) {
        setOpenMobile(false);
      }
      setLoadingItem(null);
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            const isLoading = loadingItem === item.title;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(item)}
                  tooltip={item.title}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isActive && "bg-accent text-accent-foreground",
                    isLoading && "opacity-75",
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <NavLoader />
                  ) : (
                    item.icon && <item.icon className="h-4 w-4" />
                  )}
                  <span
                    className={cn(
                      "transition-all duration-200",
                      "group-data-[collapsible=icon]:sr-only",
                      isLoading && "opacity-75",
                    )}
                  >
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
