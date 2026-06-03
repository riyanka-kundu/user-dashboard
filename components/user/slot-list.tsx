"use client";

import { useSlotList } from "@/hooks/user";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

interface Slot {
  _id: string;
  date: string;
  doctorId: string;
  time: string;
  isBooked: boolean;
}

interface Props {
  doctorId: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedSlot: string;
  setSelectedSlot: (slot: string) => void;
}

export default function SlotList({
  doctorId,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
}: Props) {
  const { mutate: fetchSlots, data: slotData, isPending } = useSlotList();

  const slots: Slot[] = slotData?.data || [];

  const handleGetSlots = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setSelectedSlot("");

    fetchSlots({
      doctorId,
      date: selectedDate,
    });
  };

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div className="flex items-center gap-2 mb-1">
        <CalendarDays className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Select Date
        </h3>
      </div>

      <div className="flex gap-3">
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot("");
          }}
          className="flex-1 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm
                     bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-slate-500
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500
                     scheme-light dark:scheme-dark"
        />

        <button
          onClick={handleGetSlots}
          disabled={isPending}
          className="px-5 py-2.5 bg-black dark:bg-blue-600 text-white rounded-xl text-sm font-medium
                     hover:bg-gray-800 dark:hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Get Slots"}
        </button>
      </div>

      {/* Slots */}
      {slots.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Available Slots
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => setSelectedSlot(slot.time)}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  selectedSlot === slot.time
                    ? "bg-black dark:bg-blue-600 text-white border-black dark:border-blue-600"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-black dark:hover:border-blue-500"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {slotData && slots.length === 0 && (
        <p className="text-sm text-center text-gray-400 dark:text-slate-500 py-3">
          No slots available for this date.
        </p>
      )}
    </div>
  );
}
