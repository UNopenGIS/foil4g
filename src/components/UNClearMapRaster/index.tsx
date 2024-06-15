import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const UNClearMapRaster = () => {
  return (
    <div>
      <h2>
        https://unopengis.github.io/foil4g/stylejson/geoservices.un.org/clearmap/style.json
      </h2>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 4,
        }}
        dragPan={false}
        scrollZoom={false}
        hash={false}
        style={{ width: "100%", height: "400px" }}
        mapStyle="stylejson/geoservices.un.org/clearmap/style.json"
      />
    </div>
  );
};