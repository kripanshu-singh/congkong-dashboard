import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1  lg:gap-2 ">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="font-serif font-bold text-xl flex flex-col">
          <div className="">CongKong</div>
          <div className="">Friends</div>
        </div>
        <div className="ml-auto flex items-center gap-2 cursor-pointer">
          <ThemeToggle className="cursor-pointer h-8 w-8"/>
        </div>
      </div>
    </header>
  );
}
