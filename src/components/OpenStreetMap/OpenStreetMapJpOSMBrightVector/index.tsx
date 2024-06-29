import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const OpenStreetMapJpOSMBrightVector = () => {
  return (
    <div>
      <h2>
        https://tile.openstreetmap.jp/styles/osm-bright/style.json
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
        mapStyle="https://tile.openstreetmap.jp/styles/osm-bright/style.json"
      />
    </div>
  );
};
