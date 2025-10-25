"use client";

import React from "react";
import { gsap } from "gsap";
import { Marker, Popup } from "react-map-gl/mapbox";
import Typography from "./Typography";
import useHover from "@/hooks/useHover";

export type MapMarkerProps = {
  id: string | number;
  longitude: number;
  latitude: number;
  name: string;
  address?: string;
  suburb?: string;
  facilityType?: string;
};

export default function MapMarker(props: MapMarkerProps) {
  const { id, longitude, latitude, name, address, suburb, facilityType } = props;
  const { ref, isHovered, eventProps } = useHover<HTMLDivElement>();
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!bubbleRef.current) return;
    gsap.fromTo(
      bubbleRef.current,
      { autoAlpha: 0, scale: 0.6, y: 10 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      <Marker key={id} longitude={longitude} latitude={latitude} anchor="bottom">
        <div
          ref={(el: HTMLDivElement | null) => {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            bubbleRef.current = el;
          }}
          className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white cursor-pointer"
          {...eventProps}
        >
          <i className="fas fa-map-marker-alt text-xs" />
        </div>
      </Marker>

      {isHovered ? (
        <Popup
          longitude={longitude}
          latitude={latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="top"
          offset={12}
          onClose={() => {}}
        >
          <div className="min-w-[220px] space-y-1">
            <Typography variant="body_strong" className="text-gray-800">
              {name}
            </Typography>
            {facilityType ? (
              <Typography variant="caption" className="text-gray-600">
                {facilityType}
              </Typography>
            ) : null}
            {address || suburb ? (
              <Typography variant="caption" className="text-gray-600">
                {[address, suburb].filter(Boolean).join(", ")}
              </Typography>
            ) : null}
            <Typography variant="caption" className="text-gray-500">
              {`Lng: ${longitude.toFixed(6)}, Lat: ${latitude.toFixed(6)}`}
            </Typography>
          </div>
        </Popup>
      ) : null}
    </>
  );
}
