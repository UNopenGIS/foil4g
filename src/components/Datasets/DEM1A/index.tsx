import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { DEM1APMTilesSource as source } from "./source";

export const DEM1AMap = () => {
  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: 141.49156,
        latitude: 38.46212,
        pitch: 50,
        bearing: -180,
        zoom: 18,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={true}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
      terrain={{ source: source.id }}
    >
      <Source key={source.id} {...source}>
        {source.layers?.map((layer) => <Layer key={layer.id} {...layer} />)}
      </Source>
    </Map>
  );
};
