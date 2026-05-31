"use client";

import { ArrowLeft, Clock, IndianRupee } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import BookingConfirm from "@/components/user/booking-confirm";
import SlotList from "@/components/user/slot-list";
import { useDoctorList } from "@/hooks/user";
import { TDoctor } from "@/type";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data } = useDoctorList();

  const doctors = data?.data || [];

  const doctor = doctors.find((d: TDoctor) => d._id === id);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBookingSuccess = () => {
    toast.success("Appointment booked successfully");

    setSelectedSlot("");
    setSelectedDate("");

    router.push("/appointments");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </button>

        {/* Doctor Info */}
        {doctor && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                {doctor.name?.charAt(0)}
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {doctor.name}
                </h1>

                <p className="text-sm text-blue-500 mt-0.5">
                  {doctor.department?.name || "General Department"}
                </p>

                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <IndianRupee className="h-3.5 w-3.5" />₹{doctor.fees}
                  </span>

                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    {doctor.schedule?.startTime} - {doctor.schedule?.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slot List */}
        <SlotList
          doctorId={id as string}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

        {/* Booking Confirm */}
        {selectedSlot && (
          <BookingConfirm
            doctorId={id as string}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </div>
  );
}
