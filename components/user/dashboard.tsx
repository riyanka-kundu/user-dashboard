"use client";

import {
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  Clock,
  History,
  Stethoscope,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserDashboard, useUserHistory } from "@/hooks/user";
import { AppointmentStatus } from "@/type";
import { useMemo } from "react";

const Dashboard = () => {
  const { data: user, isLoading } = useUserDashboard();
  const { data: historyData } = useUserHistory(user?._id);

  const appointments = useMemo(() => historyData?.data ?? [], [historyData]);

  const pendingAppointments = useMemo(
    () => appointments.filter((a) => a.status === AppointmentStatus.PENDING),
    [appointments],
  );

  const confirmedAppointments = useMemo(
    () => appointments.filter((a) => a.status === AppointmentStatus.CONFIRMED),
    [appointments],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between overflow-hidden">
          <div className="p-6 flex-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hello 👋
            </p>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your appointments and account activity.
            </p>

            <div className="mt-4">
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
            </div>
          </div>

          {/* Tree image */}
          <div className="relative hidden sm:block h-40 w-40 shrink-0 mr-6">
            <Image
              src="/tree.jpeg"
              alt="Decorative tree"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Statistics
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
            <div className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950">
                <CalendarCheck
                  size={22}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {confirmedAppointments.length}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Confirmed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950">
                <CalendarClock
                  size={22}
                  className="text-orange-500 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-3xl font-black text-orange-500 dark:text-orange-400">
                  {pendingAppointments.length}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Pending
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RECENT APPOINTMENTS ──────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarClock size={15} className="text-orange-500" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Pending
                </p>
              </div>
              <Link
                href="/history?status=Pending"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingAppointments.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No pending appointments
                </p>
              ) : (
                pendingAppointments.slice(0, 2).map((appt) => {
                  const date = new Date(appt.date);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <div
                      key={appt._id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div className="shrink-0 text-center w-8">
                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                          {day}
                        </p>
                        <p className="text-xs font-medium text-slate-400 uppercase">
                          {month}
                        </p>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {appt.doctorId?.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {appt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="size-3" />
                            {appt.name}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        Pending
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Confirmed */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarCheck size={15} className="text-green-500" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Confirmed
                </p>
              </div>
              <Link
                href="/history?status=Confirmed"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {confirmedAppointments.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No confirmed appointments
                </p>
              ) : (
                confirmedAppointments.slice(0, 2).map((appt) => {
                  const date = new Date(appt.date);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <div
                      key={appt._id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div className="shrink-0 text-center w-8">
                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                          {day}
                        </p>
                        <p className="text-xs font-medium text-slate-400 uppercase">
                          {month}
                        </p>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {appt.doctorId?.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {appt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="size-3" />
                            {appt.name}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        Confirmed
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
