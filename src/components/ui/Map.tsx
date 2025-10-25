import React from "react";
import BaseMap from "react-map-gl/mapbox";

export type MapProps = React.ComponentProps<typeof BaseMap>;

export default function Map(props: MapProps) {
  return <BaseMap {...props} />;
}
