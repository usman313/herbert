"use client";

import React from "react";
import SearchBar from "./SearchBar";
import FacilityCard, { FacilityTag } from "./FacilityCard";
import Typography from "./ui/Typography";
import Container from "./ui/Container";
import { gsap } from "gsap";

export type Facility = {
  id: string;
  typeLabel: string;
  title: string;
  addressLines: string[];
  tags: FacilityTag[];
};

export type SidebarProps = {
  facilities: Facility[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (value: string) => void;
  filter: string;
  onFilter: (value: string) => void;
};

export default function Sidebar(props: SidebarProps) {
  const { facilities, selectedId, onSelect, search, onSearch, filter, onFilter } = props;
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".facility-card");
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out", stagger: 0.1 }
    );
  }, [facilities.length]);

  return (
    <div className="w-full md:w-[480px] lg:w-[520px] bg-white shadow-xl flex flex-col">
      <Container className="p-6 lg:p-8 border-b border-gray-100">
        <Typography as="h1" variant="h1" className="mb-6">Sydney Facilities Locator</Typography>
        <SearchBar value={search} onChange={onSearch} filter={filter} onFilterChange={onFilter} />
        <Typography variant="body" className="text-gray-500 font-medium">
          <span className="text-gray-700 font-semibold">{facilities.length}</span> facilities found
        </Typography>
      </Container>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-6 lg:p-8 space-y-4" ref={listRef}>
          {facilities.map((f) => (
            <FacilityCard
              key={f.id}
              typeLabel={f.typeLabel}
              title={f.title}
              addressLines={f.addressLines}
              tags={f.tags}
              selected={selectedId === f.id}
              onClick={() => onSelect(f.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


