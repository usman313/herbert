import React from "react";
import { Source as BaseSource } from "react-map-gl/mapbox";

export type MapSourceProps = React.ComponentProps<typeof BaseSource>;

export default function MapSource(props: MapSourceProps) {
  return <BaseSource {...props} />;
}
