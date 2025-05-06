import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="relative w-full min-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                name="search"
                placeholder="Search..."
                className="pl-10"
              />
            </div>
          </div>
        </header>
        <div className="p-1 pt-0 main-layout-container">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
