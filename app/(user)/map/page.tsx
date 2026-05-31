"use client";
import dynamic from "next/dynamic";

const NearbyDiagnostic = dynamic(
  () => import("@/components/user/nearby-diagnostic"),
  { ssr: false },
);

export default function Page() {
  return <NearbyDiagnostic />;
}
