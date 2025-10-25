import React from "react";

export type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  rightIconClassName?: string;
};

export default function Dropdown({ className, rightIconClassName, children, ...rest }: DropdownProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={`appearance-none px-5 py-3.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm cursor-pointer hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 ${className ?? ""}`}
      >
        {children}
      </select>
      <i className={`fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none ${rightIconClassName ?? ""}`} />
    </div>
  );
}


