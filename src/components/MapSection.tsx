"use client";

import React from "react";
import Checkbox from "./ui/Checkbox";
import Container from "./ui/Container";
import Typography from "./ui/Typography";
import Map from "react-map-gl/mapbox";
import Button from "./ui/Button";

export type Marker = {
  id: string;
  left: string; // percentage like "25%"
  top: string; // percentage like "30%"
};

export type MapSectionProps = {
  markers: Marker[];
  selectedMarkerId?: string | null;
  onSelectMarker?: (id: string) => void;
};

export default function MapSection(props: MapSectionProps) {
  const token = process.env.MAP_BOX as string | undefined;
  const hasToken = Boolean(token && token.length > 0);

  return (
    <div className="hidden md:flex flex-1 relative bg-linear-to-br from-blue-50 to-blue-100">
      <div id="map" className="w-full h-full relative overflow-hidden">
        {hasToken ? (
          <Map
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            initialViewState={{ longitude: 151.2093, latitude: -33.8688, zoom: 11 }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}

        <Container className="absolute top-6 right-6 bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm bg-opacity-95">
          <Checkbox defaultChecked label={"Search as I move the map"} />
        </Container>

        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <Button variant="white" size="lg" iconOnly aria-label="Zoom in">
            <i className="fas fa-plus text-gray-700" />
          </Button>
          <Button variant="white" size="lg" iconOnly aria-label="Zoom out">
            <i className="fas fa-minus text-gray-700" />
          </Button>
          <Button variant="white" size="lg" iconOnly aria-label="Locate me">
            <i className="fas fa-location-arrow text-gray-700" />
          </Button>
        </div>

        <Container className="absolute bottom-6 left-6 bg-white px-5 py-4 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <i className="fas fa-star text-xs" />
            </div>
            <Typography variant="body_strong" className="text-gray-700">Sport Facility</Typography>
          </div>
        </Container>

        {!hasToken ? (
          <Container className="absolute top-6 left-6 bg-white px-5 py-3 rounded-xl shadow-lg border border-yellow-200 backdrop-blur-sm bg-opacity-95">
            <Typography variant="body_strong" className="text-yellow-800">Missing MAP_BOX token</Typography>
            <Typography variant="caption" className="text-gray-600">Set MAP_BOX in .env and restart dev server.</Typography>
          </Container>
        ) : null}
      </div>
    </div>
  );
}


