"use client";

import React from "react";
import Sidebar, { Facility } from "@/components/Sidebar";
import MapSection from "@/components/MapSection";
import useFacilityData from "@/hooks/useFacilityData";

type HomeClientProps = {
  homeData: any | null;
};

export default function HomeClient({ homeData }: HomeClientProps) {
  const [selectedFacilityId, setSelectedFacilityId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("All types of facilities");
  const [geoFacilities, setGeoFacilities] = React.useState<Facility[]>([]);

  React.useEffect(() => {
    console.log("Home API response:", homeData);
  }, [homeData]);

  function normalizeFacilitiesFromHome(data: any): Facility[] {
    const candidates =
      (data && (data.facilities || data.items || data.list)) ||
      data?.story?.content?.facilities ||
      data?.data?.facilities ||
      [];

    if (!Array.isArray(candidates)) return [];
    return candidates.map((item: any, index: number): Facility => {
      const id = String(item?.id ?? item?._uid ?? index + 1);
      const typeLabel = String(
        item?.typeLabel ?? item?.type ?? item?.category ?? "Facility"
      );
      const title = String(item?.title ?? item?.name ?? "Facility");
      const addressLine1 =
        item?.addressLines?.[0] ?? item?.address ?? item?.street ?? "";
      const addressLine2 =
        item?.addressLines?.[1] ?? item?.suburb ?? item?.city ?? "";
      const tagsRaw = Array.isArray(item?.tags) ? item.tags : [];
      const tags = tagsRaw.map((t: any) => ({
        iconClass: String(t?.iconClass ?? "fas fa-tag"),
        label: String(t?.label ?? t ?? "Tag"),
      }));
      return {
        id,
        typeLabel,
        title,
        addressLines: [addressLine1, addressLine2].filter(Boolean),
        tags,
      };
    });
  }

  React.useEffect(() => {
    let cancelled = false;
    fetch("/data/Sports_and_recreation_facilities.geojson")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load GeoJSON"))))
      .then((geojson) => {
        if (cancelled) return;
        const features = Array.isArray(geojson?.features) ? geojson.features : [];
        const mapped: Facility[] = features
          .filter((f: any) => f?.geometry?.type === "Point")
          .map((f: any, idx: number) => {
            const normalized = useFacilityData(f.properties ?? {});
            const id = normalized.id || String(idx);
            const typeLabel = normalized.facilityType || "Sport Facility";
            const title = normalized.name || "Location";
            const addressLines = [normalized.address, normalized.suburb].filter(Boolean);
            return { id, typeLabel, title, addressLines, tags: [] } as Facility;
          });
        setGeoFacilities(mapped);
      })
      .catch(() => setGeoFacilities([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const apiFacilities = React.useMemo(() => normalizeFacilitiesFromHome(homeData), [homeData]);
  const facilities: Facility[] = apiFacilities.length > 0 ? apiFacilities : geoFacilities;
  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch = [f.title, ...f.addressLines]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All types of facilities" || f.typeLabel === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-gray-50 antialiased">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          facilities={filteredFacilities}
          selectedId={selectedFacilityId}
          onSelect={setSelectedFacilityId}
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
        />
        <MapSection />
      </div>
    </div>
  );
}


