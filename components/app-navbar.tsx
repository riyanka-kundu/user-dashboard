"use client";

import {
  HeartPulse,
  LayoutDashboard,
  Loader2,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLogout } from "@/hooks/auth";
import { useUserDashboard } from "@/hooks/user";

type AppNavbarProps = {
  variant: "public" | "dashboard";
};

export default function AppNavbar({ variant }: AppNavbarProps) {
  const { data: user, isLoading } = useUserDashboard();

  const { mutate: logoutHandler, isPending } = useLogout();

  const initials = `${user?.first_name?.charAt(0) ?? ""}${
    user?.last_name?.charAt(0) ?? ""
  }`.toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div
        className={`flex h-16 items-center ${
          variant === "public"
            ? "mx-auto max-w-7xl justify-between px-6"
            : "justify-end px-6"
        }`}
      >
        {/* PUBLIC LOGO */}
        {variant === "public" && (
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <HeartPulse className="size-6" />
            </div>

            <div>
              <h1 className="text-xl font-black">MediCare+</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Doctor Appointment Platform
              </p>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoading ? (
            <Loader2 className="size-5 animate-spin text-slate-500" />
          ) : user ? (
            <>
              {variant === "public" && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-blue-600 font-bold text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <span className="hidden font-semibold text-slate-900 dark:text-white sm:block">
                      {user.first_name} {user.last_name}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 z-1002">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex w-full cursor-pointer items-center px-2 py-2 text-sm"
                    >
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    disabled={isPending}
                    className="text-red-500 focus:text-red-500"
                  >
                    <button
                      onClick={() => logoutHandler()}
                      className="flex w-full cursor-pointer items-center px-2 py-2 text-sm"
                    >
                      <LogOut className="mr-2 size-4" />
                      {isPending ? "Logging out..." : "Logout"}
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            variant === "public" && (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
