"use client";

import { Skeleton } from "@/components/ui/skeleton";
import BookingModal from "@/components/user/booking-modal";
import DoctorCard from "@/components/user/doctor-card";
import { useDoctorList } from "@/hooks/user";
import { TDoctor } from "@/type";
import { useState } from "react";

export default function DoctorPage() {
  const { data, isLoading } = useDoctorList();
  const doctors = data?.data || [];

  const [selectedDoctor, setSelectedDoctor] = useState<TDoctor | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-62.5 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-500 mb-6">Our Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {doctors.map((doctor: TDoctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onBook={(doc) => setSelectedDoctor(doc)}
          />
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
