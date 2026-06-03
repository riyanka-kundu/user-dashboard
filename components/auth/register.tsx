"use client";

import { useRegister } from "@/hooks/auth";
import { registerPayload, registerSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const { mutateAsync: registerFunction } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: registerPayload) => {
    try {
      await registerFunction(data);
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  const labelStyle = "text-sm font-semibold text-gray-700 dark:text-slate-300";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelStyle}>First Name</label>
              <input
                {...register("first_name")}
                type="text"
                placeholder="John"
                disabled={isSubmitting}
                className={inputStyle}
                autoComplete="given-name"
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className={labelStyle}>Last Name</label>
              <input
                {...register("last_name")}
                type="text"
                placeholder="Doe"
                autoComplete="family-name"
                disabled={isSubmitting}
                className={inputStyle}
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className={labelStyle}>Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              disabled={isSubmitting}
              className={inputStyle}
              autoComplete="username"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className={labelStyle}>Password</label>
            <input
              {...register("password")}
              type={isOpen ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className={inputStyle}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute right-4 top-10.5 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            >
              {isOpen ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label className={labelStyle}>Confirm Password</label>
            <input
              {...register("confirm_password")}
              type={isConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              disabled={isSubmitting}
              className={inputStyle}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setConfirm((prev) => !prev)}
              className="absolute right-4 top-10.5 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            >
              {isConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirm_password && (
              <p className="text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className={labelStyle}>Address</label>
            <input
              {...register("address")}
              type="text"
              placeholder="Your address"
              disabled={isSubmitting}
              className={inputStyle}
              autoComplete="shipping street-address"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
