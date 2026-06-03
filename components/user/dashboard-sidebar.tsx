"use client";

import {
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  MapIcon,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Near By Centers", url: "/map", icon: MapIcon },
  { title: "History", url: "/history", icon: ClipboardList },
  { title: "Doctors", url: "/doctor", icon: Stethoscope },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <SidebarHeader className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800 dark:bg-slate-950">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <HeartPulse size={20} />
          </div>

          <p className="text-base font-black text-slate-900 dark:text-white">
            MediCare+
          </p>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                        )}
                      >
                        <item.icon
                          size={18}
                          className={
                            isActive
                              ? "text-white"
                              : "text-slate-400 dark:text-slate-500"
                          }
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
