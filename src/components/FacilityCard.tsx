"use client";

import React from "react";
import Typography from "./ui/Typography";
import Pill from "./ui/Pill";

export type FacilityTag = {
  iconClass: string;
  label: string;
};

export type FacilityCardProps = {
  typeLabel: string;
  title: string;
  addressLines: string[];
  tags: FacilityTag[];
  selected?: boolean;
  onClick?: () => void;
};

export default function FacilityCard(props: FacilityCardProps) {
  const { typeLabel, title, addressLines, tags, selected, onClick } = props;

  return (
    <div
      className={
        "facility-card bg-gray-50 rounded-2xl p-6 cursor-pointer border " +
        (selected
          ? "border-blue-200 bg-white ring-2 ring-blue-500"
          : "border-transparent hover:border-blue-200 hover:bg-white")
      }
      onClick={onClick}
      role="button"
      aria-pressed={selected}
    >
      <div className="mb-3">
        <Typography variant="subtitle">{typeLabel}</Typography>
        <Typography as="h3" variant="h3" className="mt-1">
          {title}
        </Typography>
      </div>
      <div className="space-y-1">
        {addressLines.map((line, index) => (
          <Typography key={index} variant={index === 1 ? "body_strong" : "body"}>
            {line}
          </Typography>
        ))}
      </div>
      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {tags.map((tag, index) => (
            <Pill key={index} iconClass={tag.iconClass}>
              {tag.label}
            </Pill>
          ))}
        </div>
      ) : null}
    </div>
  );
}


