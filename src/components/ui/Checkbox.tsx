import React from "react";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
};

export default function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer ${className ?? ""}`}
        {...rest}
      />
      {label ? (
        <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
      ) : null}
    </label>
  );
}


