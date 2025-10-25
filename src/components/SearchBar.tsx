"use client";

import React from "react";
import Input from "./ui/Input";
import Dropdown from "./ui/Dropdown";
import Button from "./ui/Button";

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const { value, onChange, filter, onFilterChange } = props;

  return (
    <div className="flex gap-3 mb-4">
      <Input
        wrapperClassName="flex-1"
        type="text"
        placeholder="Search for name or suburb"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <Button
            variant="primary"
            size="sm"
            iconOnly
            aria-label="Search"
          >
            <i className="fas fa-search text-sm" />
          </Button>
        }
      />

      <Dropdown value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option>All types of facilities</option>
        <option>Parks</option>
        <option>Sports Centers</option>
        <option>Swimming Pools</option>
        <option>Tennis Courts</option>
        <option>Basketball Courts</option>
      </Dropdown>
    </div>
  );
}


