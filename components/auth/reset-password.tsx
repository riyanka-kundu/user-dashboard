"use client";

import { useResetPassword } from "@/hooks/auth";
import { TResetPassword } from "@/schema/reset-password";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { id, token } = useParams<{
    id: string;
    token: string;
  }>();
  const { mutateAsync: resetPassword, isPending: isLoading } =
    useResetPassword();

  const router = useRouter();
  const [isConfirm, setConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassword>();

  const onSubmit = async (data: TResetPassword) => {
    if (!id || !token) return;

    await resetPassword({
      id,
      token,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    router.push("/login");
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 text-center mb-8">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">
              Password
            </label>
            <input
              {...register("password")}
              type={isOpen ? "text" : "password"}
              placeholder="Enter your password"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute right-4 top-10.5 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            >
              {isOpen ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type={isConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setConfirm((prev) => !prev)}
              className="absolute right-4 top-10.5 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            >
              {isConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
