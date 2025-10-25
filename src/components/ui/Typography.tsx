import React from "react";

export type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "subtitle"
    | "body"
    | "body_strong"
    | "caption"
    | "overline";
  className?: string;
  children: React.ReactNode;
};

const variantToClasses: Record<NonNullable<TypographyProps["variant"]>, string> = {
  h1: "text-3xl lg:text-4xl font-bold text-gray-900",
  h2: "text-2xl font-bold text-gray-900",
  h3: "text-xl font-bold text-gray-900",
  subtitle: "text-sm font-semibold text-gray-500 uppercase tracking-wider",
  body: "text-sm text-gray-600",
  body_strong: "text-sm text-gray-700 font-medium",
  caption: "text-xs text-gray-500",
  overline: "text-xs text-gray-500 uppercase tracking-wider",
};

export default function Typography({ as, variant = "body", className, children }: TypographyProps) {
  const Component = as ?? "p";
  const base = variantToClasses[variant];
  const classes = className ? `${base} ${className}` : base;
  return <Component className={classes}>{children}</Component>;
}


