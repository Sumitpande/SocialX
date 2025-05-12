import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const { state } = useSidebar();
  const location = useLocation();
  const isActive = (url: string) => {
    return url === location.pathname;
  };
  return (
    <SidebarMenu className="px-2">
      {items.map((item) => (
        <SidebarMenuItem
          className={state == "expanded" ? "self-start w-full" : "self-center"}
          key={item.title}
        >
          <SidebarMenuButton
            asChild
            className={`transition-colors ${
              isActive(item.url)
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-muted"
            }`}
          >
            <NavLink
              to={item.url}
              state={{ fromSidebar: true, title: item.title }}
            >
              <item.icon />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
