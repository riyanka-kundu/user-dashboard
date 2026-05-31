"use client";
import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";
import { QUERY_KEY } from "@/lib/query-key";
import {
  TDiagnosticCenterList,
  TDoctorListResponse,
  THistoryResponse,
  TNominatimResult,
  TUserDashboard,
} from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUserDashboard = () => {
  return useQuery<TUserDashboard>({
    queryKey: [QUERY_KEY.DASHBOARD],

    queryFn: async () => {
      const res = await axiosInstance.get(EndPoints.user.dashboard);

      return res.data.data;
    },
  });
};

export const useSlotList = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SLOT_LIST],
    mutationFn: async (payload: { doctorId: string; date: string }) => {
      const res = await axiosInstance.post(EndPoints.user.slotList, payload);
      return res.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

// Book Appointment
export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEY.APPOINTMENT],
    mutationFn: async (payload: {
      doctorId: string;
      userId: string;
      name: string;
      date: string;
      time: string;
    }) => {
      const res = await axiosInstance.post(EndPoints.user.appointment, payload);
      return res.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Appointment booked!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
    },
  });
};

export const useDoctorList = () => {
  return useQuery<TDoctorListResponse>({
    queryKey: [QUERY_KEY.DOCTOR_LIST],
    queryFn: async () => {
      const res = await axiosInstance.post(EndPoints.doctor.list, {});
      return res.data;
    },
  });
};

export const useUserHistory = () => {
  return useQuery({
    queryKey: [QUERY_KEY.HISTORY],
    queryFn: async () => {
      const res = await axiosInstance.get<THistoryResponse>(
        EndPoints.user.history,
      );
      return res.data;
    },
  });
};
export const useDiagnosticCenterList = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.DIAGNOSTIC_CENTER],
    mutationFn: async (payload: { lat: number; lng: number }) => {
      const res = await axiosInstance.get<TDiagnosticCenterList>(
        EndPoints.diagnosticCenter.list({ ...payload }),
      );
      return res.data;
    },
  });
};

export const useLocationSearch = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}&limit=5`,
      );

      if (!response.ok) {
        throw new Error("Failed to search location");
      }

      return (await response.json()) as TNominatimResult[];
    },
  });
};
