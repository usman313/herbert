import { ReactNode } from "react";

interface StoryblokProviderProps {
  children: ReactNode;
}

export default function StoryblokProvider({ children }: StoryblokProviderProps) {
  return <>{children}</>;
}
