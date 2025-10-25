import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-black text-white hover:bg-gray-800 focus:ring-blue-500 border border-transparent",
  secondary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
  white:
    "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 focus:ring-blue-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent focus:ring-blue-500",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, { default: string; icon: string }> = {
  sm: { default: "h-9 px-3 text-sm", icon: "w-9 h-9 text-sm" },
  md: { default: "h-10 px-4 text-sm", icon: "w-10 h-10 text-sm" },
  lg: { default: "h-12 px-5 text-base", icon: "w-12 h-12 text-base" },
};

export default function Button({
  variant = "primary",
  size = "md",
  iconOnly = false,
  startIcon,
  endIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const variantClass = variantClasses[variant];
  const sizeClass = iconOnly ? sizeClasses[size].icon : sizeClasses[size].default;
  const classes = `inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-20 ${variantClass} ${sizeClass} ${className ?? ""}`;

  return (
    <button className={classes} {...rest}>
      {startIcon ? <span className="mr-2 inline-flex items-center">{startIcon}</span> : null}
      {!iconOnly ? <span>{children}</span> : children}
      {endIcon ? <span className="ml-2 inline-flex items-center">{endIcon}</span> : null}
    </button>
  );
}
