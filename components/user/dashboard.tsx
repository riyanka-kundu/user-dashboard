"use client";

import {
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  History,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserDashboard, useUserHistory } from "@/hooks/user";
import { useMemo } from "react";

const Dashboard = () => {
  const { data: user, isLoading } = useUserDashboard();
  const { data: historyData } = useUserHistory(user?._id);
  const pendingAppointments = useMemo(() => {
    return historyData?.data.filter((appt) => appt.status === "Pending").length;
  }, [historyData]);

  const completedAppointments = useMemo(() => {
    return historyData?.data.filter((appt) => appt.status === "Confirmed")
      .length;
  }, [historyData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-4 text-slate-900 dark:bg-slate-950 dark:text-white md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl">
              Welcome back,{" "}
              <span className="text-blue-600">
                {user?.first_name} {user?.last_name}
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your appointments and account activity.
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                Quick Actions
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              {[
                {
                  href: "/doctor",
                  icon: Stethoscope,
                  label: "Find Doctors",
                },
                {
                  href: "/history",
                  icon: History,
                  label: "Appointment History",
                },
              ].map(({ href, icon: Icon, label }) => (
                <DropdownMenuItem asChild key={label}>
                  <Link
                    href={href}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Icon size={16} className="text-slate-400" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* ── STATS ────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950">
                <CalendarCheck
                  size={22}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Confirmed
                </p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {completedAppointments ?? 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950">
                <CalendarClock
                  size={22}
                  className="text-orange-500 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Pending
                </p>
                <p className="text-3xl font-black text-orange-500 dark:text-orange-400">
                  {pendingAppointments ?? 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── PROFILE + ACCOUNT ────────────────────────────────────── */}
      </div>
    </div>
  );
};

export default Dashboard;
