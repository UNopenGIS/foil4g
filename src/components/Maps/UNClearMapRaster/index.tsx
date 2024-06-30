import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const UNClearMapRaster = () => {
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
      mapStyle="stylejson/geoservices.un.org/clearmap/style.json"
    />
  );
};
