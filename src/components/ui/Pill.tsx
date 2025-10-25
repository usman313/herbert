import React from "react";

export type PillProps = {
  iconClass?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ iconClass, children, className }: PillProps) {
  return (
    <span className={`px-3 py-1.5 bg-white rounded-lg text-gray-700 font-medium border border-gray-200 ${className ?? ""}`}>
      {iconClass ? <i className={`${iconClass} mr-1.5`} /> : null}
      {children}
    </span>
  );
}


