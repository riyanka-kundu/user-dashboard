"use client";

import { useEffect, useMemo, useState } from "react";

import "@/lib/leaflet-icon";
import "leaflet/dist/leaflet.css";

import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import { MapSearch } from "@/components/user/location-search";
import { useDiagnosticCenterList, useUserDashboard } from "@/hooks/user";
import { createUserAvatarIcon } from "@/lib/leaflet-utils";

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
}

export default function DiagnosticCenterMap() {
  const { mutate, data, isPending } = useDiagnosticCenterList();
  const { data: user, isLoading } = useUserDashboard();

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locationError, setLocationError] = useState("");

  const browserNotSupported =
    typeof window !== "undefined" && !navigator.geolocation;

  const userIcon = useMemo(
    () =>
      createUserAvatarIcon({
        first_name: user?.first_name,
        last_name: user?.last_name,
        isLoading,
      }),
    [user?.first_name, user?.last_name, isLoading],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });
        mutate({ lat, lng });
      },
      () => {
        setLocationError(
          "Location access is required to find nearby diagnostic centers.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [mutate]);

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    mutate({ lat, lng });
  };

  if (!location && !browserNotSupported && !locationError) {
    return (
      <div
        className="flex items-center justify-center bg-white text-sm font-medium text-slate-600 dark:bg-slate-950 dark:text-slate-400"
        style={{ height: "calc(100vh - 80px)" }}
      >
        Getting your location...
      </div>
    );
  }

  if (browserNotSupported || locationError) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-white p-6 text-center dark:bg-slate-950"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Location Required
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {browserNotSupported
            ? "Your browser does not support location services."
            : locationError}
        </p>

        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
          Please enable location access and refresh the page.
        </p>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <MapSearch onLocationSelect={handleLocationChange} />

      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap lat={location.lat} lng={location.lng} />

        <Circle
          center={[location.lat, location.lng]}
          radius={5000}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#2563eb",
            fillOpacity: 0.1,
            weight: 2,
          }}
        />

        <Marker position={[location.lat, location.lng]} icon={userIcon}>
          <Popup>Your Selected Location</Popup>
        </Marker>

        {data?.data?.map((center) => {
          const [lng, lat] = center.location.coordinates;

          return (
            <Marker key={center._id} position={[lat, lng]}>
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-semibold">{center.name}</h3>
                  <p className="text-sm">{center.address}</p>
                  <p className="text-sm">{center.phone}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {isPending && (
        <div className="absolute bottom-4 left-1/2 z-1000 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Loading nearby diagnostic centers...
        </div>
      )}
    </div>
  );
}
