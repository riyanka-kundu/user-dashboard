"use client";

import BookingConfirm from "@/components/user/booking-confirm";
import SlotList from "@/components/user/slot-list";
import { Clock, IndianRupee, X } from "lucide-react";
import { useState } from "react";

import { TDoctor } from "@/type";

interface Props {
  doctor: TDoctor;
  onClose: () => void;
}
export default function BookingModal({ doctor, onClose }: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
              {doctor.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {doctor.name}
              </h2>
              <p className="text-sm text-blue-500 dark:text-blue-400">
                {doctor.department?.name || "General Department"}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <IndianRupee className="h-3 w-3" />₹{doctor.fees}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  {doctor.schedule?.startTime} - {doctor.schedule?.endTime}
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => onClose()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>

        <SlotList
          doctorId={doctor._id}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

        {selectedSlot && (
          <BookingConfirm
            doctorId={doctor._id}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSuccess={onClose}
          />
        )}
      </div>
    </div>
  );
}
