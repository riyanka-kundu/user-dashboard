"use client";

import {
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  MapIcon,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserDashboard } from "@/hooks/user";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Near By Centers", url: "/map", icon: MapIcon },
  { title: "History", url: "/history", icon: ClipboardList },
  { title: "Doctors", url: "/doctor", icon: Stethoscope },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data } = useUserDashboard();

  const initials =
    `${data?.first_name?.charAt(0) ?? ""}${data?.last_name?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <Sidebar className="border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <SidebarHeader className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
        {/* Brand — matches homepage navbar */}
        <Link href="/" className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <HeartPulse size={20} />
          </div>
          <div>
            <p className="text-base font-black text-slate-900 dark:text-white">
              MediCare+
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Doctor Appointment Platform
            </p>
          </div>
        </Link>

        {/* User pill */}
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-blue-600 text-sm font-bold text-white">
              {initials || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {data?.first_name} {data?.last_name}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {data?.email}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ── MENU ────────────────────────────────────────────────── */}
      <SidebarContent className="px-3 py-4 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
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

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <SidebarFooter className="border-t border-slate-200 p-3 dark:border-slate-800 dark:bg-slate-950">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
