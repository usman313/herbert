"use client";

import React from "react";
import SearchBar from "./SearchBar";
import FacilityCard, { FacilityTag } from "./FacilityCard";
import Typography from "./ui/Typography";
import Container from "./ui/Container";

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
        <Container className="p-6 lg:p-8 space-y-4">
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
        </Container>
      </div>
    </div>
  );
}


