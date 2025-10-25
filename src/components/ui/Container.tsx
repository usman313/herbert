import React from "react";

export type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return <div className={className}>{children}</div>;
}


