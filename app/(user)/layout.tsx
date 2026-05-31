// app/dashboard/layout.tsx

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/user/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
          <SidebarTrigger className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" />

          <div className="flex items-center gap-2">
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <h1 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              User Dashboard
            </h1>
          </div>
        </div>

        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
