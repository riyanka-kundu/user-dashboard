"use client";

import { useResetPassword } from "@/hooks/auth";
import { TResetPassword } from "@/schema/reset-password";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type={isOpen ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg border bg-black  border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute right-3 top-[38px]"
            >
              {isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type={isConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setConfirm((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {isConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
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
            className="w-full flex items-center justify-center bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition disabled:opacity-70"
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

export default ResetPage;
