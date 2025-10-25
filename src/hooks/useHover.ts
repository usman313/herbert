import React from "react";

export type UseHoverResult<T extends HTMLElement = HTMLElement> = {
  ref: React.RefObject<T>;
  isHovered: boolean;
  eventProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
};

export default function useHover<T extends HTMLElement = HTMLElement>(): UseHoverResult<T> {
  const ref = React.useRef<T>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const onMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const onMouseLeave = React.useCallback(() => setIsHovered(false), []);

  return { ref, isHovered, eventProps: { onMouseEnter, onMouseLeave } };
}
