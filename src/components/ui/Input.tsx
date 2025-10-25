import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
};

export default function Input({ endAdornment, wrapperClassName, className, ...rest }: InputProps) {
  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      <input
        {...rest}
        className={`w-full px-5 py-3.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl search-input text-gray-700 placeholder-gray-400 text-sm transition-all duration-200 ${className ?? ""}`}
      />
      {endAdornment ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div>
      ) : null}
    </div>
  );
}


