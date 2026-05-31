"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserHistory } from "@/hooks/user";
import { CalendarDays, Clock, IndianRupee, Stethoscope } from "lucide-react";

export default function HistoryPage() {
  const { data, isLoading } = useUserHistory();

  const appointments = data?.data || [];

  const statusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-30 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Appointment History
        </h1>
        <span className="text-sm text-gray-500">
          Total: {data?.totalAppointments || 0}
        </span>
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400 space-y-3">
          <CalendarDays className="h-12 w-12 text-gray-300" />
          <p className="text-lg">No appointments yet</p>
        </div>
      )}

      {/* Appointment Cards */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {appointment.doctorId?.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {appointment.doctorId?.name}
                  </h2>
                  <p className="text-sm text-blue-500">
                    {appointment.doctorId?.department?.name ||
                      "General Department"}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyle(
                  appointment.status,
                )}`}
              >
                {appointment.status || "pending"}
              </span>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                {appointment.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-400" />
                {appointment.time}
              </span>
              <span className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-gray-400" />₹
                {appointment.doctorId?.fees}
              </span>
              <span className="flex items-center gap-1.5">
                <Stethoscope className="h-4 w-4 text-gray-400" />
                {appointment.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
