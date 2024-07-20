import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const GSISeamlessPhoto = () => {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 4,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/cyberjapandata.gsi.go.jp/xyz/seamlessphoto/style.json"
    />
  );
};
