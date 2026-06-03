"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, MapPin, ShieldCheck, User2 } from "lucide-react";

import { useUserDashboard } from "@/hooks/user";

const Profile = () => {
  const { data: user, isLoading } = useUserDashboard();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="h-125 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800 xl:col-span-2" />
          <div className="h-125 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />
        </div>
      </section>
    );
  }

  const profileItems = [
    {
      icon: User2,
      iconBg: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      label: "Full Name",
      value: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "—",
    },
    {
      icon: Mail,
      iconBg: "bg-cyan-100 dark:bg-cyan-950/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      label: "Email Address",
      value: user?.email || "—",
    },
    {
      icon: MapPin,
      iconBg: "bg-purple-100 dark:bg-purple-950/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      label: "Address",
      value: user?.address || "—",
      capitalize: true,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* PROFILE CARD */}
        <div className="flex xl:col-span-2">
          <Card className="h-full w-full rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="px-6 py-5">
              <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Profile Information
              </CardTitle>
            </CardHeader>

            <CardContent className="flex h-full flex-col p-6">
              {/* HERO */}
              <div className="mb-6 flex items-center gap-4 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {user?.first_name?.charAt(0)}
                  {user?.last_name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    {user?.first_name} {user?.last_name}
                  </h3>

                  <p className="text-sm text-blue-100">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                {profileItems.map(
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
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4 transition-all hover:border-blue-200 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-slate-700"
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                      >
                        <Icon size={18} className={iconColor} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          {label}
                        </p>

                        <p
                          className={`mt-1 truncate text-sm font-bold text-slate-900 dark:text-white ${
                            capitalize ? "capitalize" : ""
                          }`}
                        >
                          {value}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ACCOUNT CARD */}
        <div className="flex">
          <Card className="h-full w-full rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="px-6 py-5">
              <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Account Information
              </CardTitle>
            </CardHeader>

            <CardContent className="flex h-full flex-col gap-4 p-6">
              {/* STATUS */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Account Status
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <ShieldCheck
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {user?.is_verified ? "Verified" : "Pending Verification"}
                  </span>

                  <span
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${
                      user?.is_verified
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                    }`}
                  >
                    {user?.is_verified ? "Active" : "Unverified"}
                  </span>
                </div>
              </div>

              {/* ROLE */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Role
                </p>

                <p className="mt-2 text-sm font-bold capitalize text-slate-900 dark:text-white">
                  {user?.role || "—"}
                </p>
              </div>

              {/* CREATED */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Account Created
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              {/* LAST LOGIN */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Last Login
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "—"}
                </p>
              </div>

              {/* Spacer keeps same height as profile card */}
              <div className="flex-1" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profile;
