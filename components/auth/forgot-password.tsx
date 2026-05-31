"use client";

import { useForgotPassword } from "@/hooks/auth";
import {
  ForgotPasswordSchema,
  TForgotPassword,
} from "@/schema/forgot-password";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword: React.FC = () => {
  const { mutate: forgotPassword } = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: TForgotPassword) => {
    forgotPassword(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-card flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email to receive a reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-2.5 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
