"use client";

import { useLogin } from "@/hooks/auth";
import { LoginSchema, TLoginPayload } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginPayload>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginPayload) => {
    await login(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>

            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              {...register("password")}
              type={isOpen ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
            >
              {isOpen ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
