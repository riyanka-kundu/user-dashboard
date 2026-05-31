"use client";
import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";
import { QUERY_KEY } from "@/lib/query-key";
import { TForgotPassword } from "@/schema/forgot-password";
import { TLoginPayload } from "@/schema/login";
import { registerPayload } from "@/schema/register";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import { toast } from "sonner";

export const useRegister = () => {
  const cookie = new Cookies();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.REGISTRATION],

    mutationFn: async (payload: registerPayload) => {
      const res = await axiosInstance.post(EndPoints.auth.register, payload);
      cookie.set("id", res.data.data.id, {
        path: "/",
        maxAge: 60 * 10,
        sameSite: "strict",
      });

      return res.data;
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },

    onSuccess: (data) => {
      toast.success(data.message);

      setTimeout(() => {
        router.push("/verify-otp");
      }, 1500);
    },
  });
};
export const useVerifyOtp = () => {
  const cookie = new Cookies();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.VERIFY_OTP],

    mutationFn: async (payload: { otp: string; userId: string }) => {
      const res = await axiosInstance.post(EndPoints.auth.verifyOtp, payload);

      return res.data;
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },

    onSuccess: (data) => {
      toast.success(data.message);

      cookie.remove("id", { path: "/" });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
  });
};
export const useLogin = () => {
  const cookie = new Cookies();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.LOG_IN],

    mutationFn: async (payload: TLoginPayload) => {
      const res = await axiosInstance.post(EndPoints.auth.login, payload);
      const token = res.data.accessToken;
      const refresh = res.data.refreshToken;

      cookie.set("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      cookie.set("refresh", refresh, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.data.data;
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },

    onSuccess: (data) => {
      toast.success(data.message);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.FORGOT_PASSWORD],

    mutationFn: async (payload: TForgotPassword) => {
      const res = await axiosInstance.post(
        EndPoints.auth.forgotPassword,
        payload,
      );

      return res.data;
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.RESET_PASSWORD],

    mutationFn: async (payload: {
      id: string;
      token: string;
      password: string;
      confirm_password: string;
    }) => {
      const { id, token, ...body } = payload;

      const res = await axiosInstance.post(
        EndPoints.auth.resetPassword({ id, token }),
        body,
      );

      return res.data;
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },

    onSuccess: (data) => {
      toast.success(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
  });
};

export const useLogout = () => {
  const cookies = new Cookies();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.LOG_OUT],

    mutationFn: async () => {
      const res = await axiosInstance.post(EndPoints.auth.logout);

      return res.data;
    },

    onSuccess: () => {
      cookies.remove("token", {
        path: "/",
      });

      cookies.remove("refresh", {
        path: "/",
      });

      toast.success("Logout successful");

      router.push("/login");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    },
  });
};
