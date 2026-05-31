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
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location services.");
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

  if (!location && !locationError) {
    return (
      <div className="flex h-150 items-center justify-center rounded-lg border">
        Getting your location...
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex h-150 flex-col items-center justify-center rounded-lg border p-6 text-center">
        <h2 className="text-lg font-semibold">Location Required</h2>

        <p className="mt-2 text-muted-foreground">{locationError}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Please enable location access and refresh the page.
        </p>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="relative h-210 w-full overflow-hidden rounded-lg border">
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
                  <div>
                    <h3 className="font-semibold">{center.name}</h3>

                    <p>{center.address}</p>

                    <p>{center.phone}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {isPending && (
        <p className="mt-4">Loading nearby diagnostic centers...</p>
      )}
    </div>
  );
}
