"use client";

import { useState } from "react";

import { useLocationSearch } from "@/hooks/user";
import { Search } from "lucide-react";

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
};

export function MapSearch({ onLocationSelect }: Props) {
  const [query, setQuery] = useState("");

  const { mutate, data, isPending, reset } = useLocationSearch();

  return (
    <div className="absolute left-1/2 top-4 z-[1000] w-[450px] -translate-x-1/2">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!query.trim()) return;

          mutate(query);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a location..."
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="rounded-md border bg-background px-4 shadow-md"
          disabled={isPending}
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {data && data.length > 0 && (
        <div className="mt-2 max-h-72 overflow-y-auto rounded-md border bg-background shadow-lg">
          {data.map((result) => (
            <button
              key={`${result.lat}-${result.lon}`}
              type="button"
              className="block w-full border-b p-3 text-left text-sm hover:bg-muted"
              onClick={() => {
                onLocationSelect(Number(result.lat), Number(result.lon));

                setQuery(result.display_name);

                reset();
              }}
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
