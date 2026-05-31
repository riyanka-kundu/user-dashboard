"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TDoctor } from "@/type";
import { Clock, IndianRupee } from "lucide-react";

interface Props {
  doctor: TDoctor;
  onBook: (doctor: TDoctor) => void;
}

export default function DoctorCard({ doctor, onBook }: Props) {
  return (
    <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
            {doctor.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {doctor.name}
            </h2>
            <p className="text-sm text-blue-500 dark:text-blue-400">
              {doctor.department?.name || "General Department"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1.5 rounded-lg w-fit">
          <IndianRupee className="h-4 w-4" />
          Consultation: ₹{doctor.fees}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
          <Clock className="h-4 w-4" />
          {doctor.schedule?.startTime} - {doctor.schedule?.endTime}
          <span>({doctor.schedule?.slotDuration} mins)</span>
        </div>
      </CardHeader>

      <CardContent>
        <button
          onClick={() => onBook(doctor)}
          className="w-full rounded-xl bg-black dark:bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-all"
        >
          Book Appointment
        </button>
      </CardContent>
    </Card>
  );
}
