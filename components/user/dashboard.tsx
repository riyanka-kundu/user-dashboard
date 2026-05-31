"use client";

import {
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  Clock,
  History,
  Mail,
  MapPin,
  ShieldCheck,
  Stethoscope,
  User2,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserDashboard } from "@/hooks/user";

const Dashboard = () => {
  const { data: user, isLoading } = useUserDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 text-slate-900 dark:bg-slate-950 dark:text-white md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge className="mb-3 rounded-full border-0 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-300">
              Dashboard
            </Badge>
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
                  Completed
                </p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {user?.completedAppointments ?? 0}
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
                  {user?.pendingAppointments ?? 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── PROFILE + ACCOUNT ────────────────────────────────────── */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Profile */}
          <div className="xl:col-span-2">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-900">
              <CardHeader className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-5">
                {[
                  {
                    icon: User2,
                    iconBg: "bg-blue-50 dark:bg-blue-950",
                    iconColor: "text-blue-600 dark:text-blue-400",
                    label: "Full Name",
                    value:
                      `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim(),
                  },
                  {
                    icon: Mail,
                    iconBg: "bg-cyan-50 dark:bg-cyan-950",
                    iconColor: "text-cyan-600 dark:text-cyan-400",
                    label: "Email",
                    value: user?.email,
                  },
                  {
                    icon: MapPin,
                    iconBg: "bg-purple-50 dark:bg-purple-950",
                    iconColor: "text-purple-600 dark:text-purple-400",
                    label: "Address",
                    value: user?.address,
                    capitalize: true,
                  },
                ].map(
                  ({
                    icon: Icon,
                    iconBg,
                    iconColor,
                    label,
                    value,
                    capitalize,
                  }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                      >
                        <Icon size={18} className={iconColor} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {label}
                        </p>
                        <p
                          className={`mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-white ${capitalize ? "capitalize" : ""}`}
                        >
                          {value || "—"}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div>
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-900">
              <CardHeader className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Account Status
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {user?.is_verified ? "Verified" : "Pending"}
                    </span>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${user?.is_verified ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"}`}
                    >
                      {user?.is_verified ? "Active" : "Unverified"}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Role
                  </p>
                  <p className="mt-1 text-sm font-semibold capitalize text-slate-900 dark:text-white">
                    {user?.role || "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Account Created
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.createdAt
                      ? new Date(user.createdAt).toDateString()
                      : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" />
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Last Login
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
