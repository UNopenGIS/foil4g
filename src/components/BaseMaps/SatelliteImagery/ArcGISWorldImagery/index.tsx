import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const ArcGISWorldImagery = () => {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 4,
      }}
      dragPan={false}
      scrollZoom={false}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/server.arcgisonline.com/world_imagery/style.json"
    />
  );
};
