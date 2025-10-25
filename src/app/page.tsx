"use client";
import React from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar, { Facility } from "@/components/Sidebar";
import MapSection, { Marker } from "@/components/MapSection";

export default function Home() {
  const [selectedFacilityId, setSelectedFacilityId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("All types of facilities");
  const [homeData, setHomeData] = React.useState<any | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    fetch("/api/home", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to fetch /api/home"))))
      .then((data) => {
        if (!isMounted) return;
        console.log("Home API response:", data);
        setHomeData(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Failed to load home API:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  const staticFacilities: Facility[] = [
    {
      id: "1",
      typeLabel: "Park",
      title: "Lyons Road Park",
      addressLines: ["Corner of Lyons Road and Lambert Street", "Camperdown, 2050"],
      tags: [
        { iconClass: "fas fa-wifi", label: "Wifi" },
        { iconClass: "fas fa-utensils", label: "Kitchen" },
        { iconClass: "fas fa-parking", label: "Free Parking" },
      ],
    },
    {
      id: "2",
      typeLabel: "Sports Center",
      title: "Victoria Park Pool",
      addressLines: ["Corner of City Road and Broadway", "Camperdown, 2050"],
      tags: [
        { iconClass: "fas fa-swimming-pool", label: "Pool" },
        { iconClass: "fas fa-shower", label: "Showers" },
        { iconClass: "fas fa-lock", label: "Lockers" },
      ],
    },
    {
      id: "3",
      typeLabel: "Park",
      title: "Sydney Park",
      addressLines: ["Sydney Park Road", "Alexandria, 2015"],
      tags: [
        { iconClass: "fas fa-bicycle", label: "Bike Path" },
        { iconClass: "fas fa-dog", label: "Dog Park" },
        { iconClass: "fas fa-tree", label: "Playground" },
      ],
    },
    {
      id: "4",
      typeLabel: "Tennis Court",
      title: "Redfern Tennis Courts",
      addressLines: ["Redfern Street", "Redfern, 2016"],
      tags: [
        { iconClass: "fas fa-calendar-check", label: "Booking" },
        { iconClass: "fas fa-lightbulb", label: "Night Lights" },
        { iconClass: "fas fa-parking", label: "Parking" },
      ],
    },
    {
      id: "5",
      typeLabel: "Basketball Court",
      title: "Surry Hills Basketball",
      addressLines: ["Crown Street", "Surry Hills, 2010"],
      tags: [
        { iconClass: "fas fa-basketball-ball", label: "Outdoor" },
        { iconClass: "fas fa-users", label: "Free Access" },
      ],
    },
  ];

  const apiFacilities = React.useMemo(() => normalizeFacilitiesFromHome(homeData), [homeData]);
  const facilities: Facility[] = apiFacilities.length > 0 ? apiFacilities : staticFacilities;
  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch = [f.title, ...f.addressLines]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All types of facilities" || f.typeLabel === filter;
    return matchesSearch && matchesFilter;
  });

  const markers: Marker[] = [
    { id: "m1", left: "25%", top: "30%" },
    { id: "m2", left: "45%", top: "25%" },
    { id: "m3", left: "55%", top: "45%" },
    { id: "m4", left: "35%", top: "55%" },
    { id: "m5", left: "65%", top: "35%" },
    { id: "m6", left: "50%", top: "60%" },
    { id: "m7", left: "70%", top: "50%" },
    { id: "m8", left: "40%", top: "70%" },
    { id: "m9", left: "60%", top: "65%" },
    { id: "m10", left: "30%", top: "40%" },
  ];

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
        <MapSection
          markers={markers}
          selectedMarkerId={null}
          onSelectMarker={() => {}}
        />
      </div>
    </div>
  );
}
