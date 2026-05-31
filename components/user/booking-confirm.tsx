"use client";

import { useBookAppointment, useUserDashboard } from "@/hooks/user";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  doctorId: string;
  selectedDate: string;
  selectedSlot: string;
  onSuccess: () => void;
}

export default function BookingConfirm({
  doctorId,
  selectedDate,
  selectedSlot,
  onSuccess,
}: Props) {
  const [patientName, setPatientName] = useState("");

  const { data: userData } = useUserDashboard();

  const { mutate: bookAppointment, isPending } = useBookAppointment();

  const handleBooking = () => {
    if (!patientName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!userData?._id) {
      toast.error("User not found, please login again");
      return;
    }

    bookAppointment(
      {
        doctorId,
        userId: userData._id,
        name: patientName,
        date: selectedDate,
        time: selectedSlot,
      },
      { onSuccess },
    );
  };

  return (
    <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-slate-700 mt-2">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white">
        Confirm Booking
      </h3>

      {/* Selected Info */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-xl px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
        Slot: <span className="font-semibold">{selectedSlot}</span> on{" "}
        <span className="font-semibold">{selectedDate}</span>
      </div>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter your full name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm
                   bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                   placeholder:text-gray-400 dark:placeholder:text-slate-500
                   focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500"
      />

      {/* Book Button */}
      <button
        onClick={handleBooking}
        disabled={isPending}
        className="w-full py-3 bg-black dark:bg-blue-600 text-white rounded-xl font-medium
                   hover:bg-gray-800 dark:hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? "Booking..." : "Confirm Appointment"}
      </button>
    </div>
  );
}
