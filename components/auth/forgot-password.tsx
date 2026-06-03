"use client";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth";
import {
  ForgotPasswordSchema,
  TForgotPassword,
} from "@/schema/forgot-password";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: TForgotPassword) => {
    forgotPassword(data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 text-center mb-8">
          Enter your registered email to receive a reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              disabled={isPending}
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl p-5 disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
