import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const OpenStreetMapOrgRaster = () => {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 4,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={true}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.org/style.json"
    />
  );
};
