export const EndPoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    verifyOtp: "/auth/verify_otp",
    refresh: "/refresh-token",
    logout: "/user/logout",
    forgotPassword: "/auth/resetlink",
    resetPassword: ({ id, token }: { id: string; token: string }) =>
      `/reset-password/${id}/${token}`,
  },
  user: {
    dashboard: "/user/dashboard",
    slotList: "/user/slot/list",
    appointment: "/doctor/appointment",
    history: "/user/history",
  },
  doctor: {
    list: "/user/doctor/list",
  },
  diagnosticCenter: {
    list: ({ lat, lng }: { lat: number; lng: number }) =>
      `/diagnostic/nearby?lat=${lat}&lng=${lng}`,
  },
} as const;
