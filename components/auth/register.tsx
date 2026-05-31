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
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              First Name
            </label>

            <input
              {...register("first_name")}
              type="text"
              placeholder="John"
              disabled={isSubmitting}
              className={inputStyle}
            />

            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Last Name
            </label>

            <input
              {...register("last_name")}
              type="text"
              placeholder="Doe"
              disabled={isSubmitting}
              className={inputStyle}
            />

            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>

            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              disabled={isSubmitting}
              className={inputStyle}
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
              className={inputStyle}
            />

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
            >
              {isOpen ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700">
              Confirm Password
            </label>

            <input
              {...register("confirm_password")}
              type={isConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              disabled={isSubmitting}
              className={inputStyle}
            />

            <button
              type="button"
              onClick={() => setConfirm((prev) => !prev)}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
            >
              {isConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>

            {errors.confirm_password && (
              <p className="text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>

            <input
              {...register("address")}
              type="text"
              placeholder="Your address"
              disabled={isSubmitting}
              className={inputStyle}
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

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
