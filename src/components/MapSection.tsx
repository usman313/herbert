"use client";

import React from "react";
import Checkbox from "./ui/Checkbox";
import Container from "./ui/Container";
import Typography from "./ui/Typography";
import Map from "./ui/Map";
import MapSource from "./ui/MapSource";
import MapLayer from "./ui/MapLayer";
import Button from "./ui/Button";
import MapMarker from "./ui/MapMarker";
import useFacilityData from "@/hooks/useFacilityData";

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
  const [geojson, setGeojson] = React.useState<any | null>(null);
  const [isClustered, setIsClustered] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch("/data/Sports_and_recreation_facilities.geojson")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load GeoJSON"))))
      .then(setGeojson)
      .catch(() => setGeojson(null));
  }, []);

  return (
    <div className="hidden md:flex flex-1 relative bg-linear-to-br from-blue-50 to-blue-100">
      <div id="map" className="w-full h-full relative overflow-hidden">
        {hasToken ? (
          <Map
            key={isClustered ? "clustered" : "unclustered"}
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            initialViewState={{ longitude: 151.2093, latitude: -33.8688, zoom: 11 }}
            style={{ width: "100%", height: "100%" }}
            interactiveLayerIds={isClustered ? ["clusters", "unclustered-point"] : []}
          >
            {geojson ? (
              isClustered ? (
                <MapSource
                  id="facilities"
                  type="geojson"
                  data={geojson}
                  cluster={true}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                >
                  <MapLayer
                    id="clusters"
                    source="facilities"
                    type="circle"
                    filter={[">", ["get", "point_count"], 0]}
                    paint={{
                      "circle-color": "#3b82f6",
                      "circle-radius": ["step", ["get", "point_count"], 14, 20, 18, 50, 22],
                      "circle-stroke-width": 2,
                      "circle-stroke-color": "#fff",
                    }}
                  />
                  <MapLayer
                    id="cluster-count"
                    source="facilities"
                    type="symbol"
                    filter={[">", ["get", "point_count"], 0]}
                    layout={{ "text-field": ["get", "point_count_abbreviated"], "text-size": 12 }}
                    paint={{ "text-color": "#ffffff" }}
                  />
                  <MapLayer
                    id="unclustered-point"
                    source="facilities"
                    type="circle"
                    filter={["!", ["has", "point_count"]] as any}
                    paint={{
                      "circle-color": "#2563eb",
                      "circle-radius": 6,
                      "circle-stroke-width": 2,
                      "circle-stroke-color": "#fff",
                    }}
                  />
                </MapSource>
              ) : (
                Array.isArray(geojson?.features)
                  ? geojson.features
                      .filter((f: any) => f?.geometry?.type === "Point")
                      .map((f: any, idx: number) => {
                        const coords = f.geometry.coordinates;
                        if (!Array.isArray(coords) || coords.length < 2) return null;
                        const [lng, lat] = coords as [number, number];
                        const normalized = useFacilityData(f.properties ?? {});
                        const id = normalized.id || String(idx);
                        return (
                          <MapMarker
                            key={id}
                            id={id}
                            longitude={lng}
                            latitude={lat}
                            name={normalized.name}
                            address={normalized.address}
                            suburb={normalized.suburb}
                            facilityType={normalized.facilityType}
                          />
                        );
                      })
                  : null
              )
            ) : null}
          </Map>
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}

        <Container className="absolute top-6 right-6 bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center gap-3">
            <Checkbox defaultChecked label={"Search as I move the map"} />
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Button
                variant={isClustered ? "white" : "primary"}
                size="sm"
                aria-pressed={!isClustered}
                onClick={() => setIsClustered(false)}
              >
                Unclustered
              </Button>
              <Button
                variant={isClustered ? "primary" : "white"}
                size="sm"
                aria-pressed={isClustered}
                onClick={() => setIsClustered(true)}
              >
                Clustered
              </Button>
            </div>
          </div>
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


