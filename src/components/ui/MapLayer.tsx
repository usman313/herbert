import React from "react";
import { Layer as BaseLayer } from "react-map-gl/mapbox";

export type MapLayerProps = React.ComponentProps<typeof BaseLayer>;

export default function MapLayer(props: MapLayerProps) {
  return <BaseLayer {...props} />;
}
