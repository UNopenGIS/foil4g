import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { KonturPopulationPMTilesSource as source } from "./source";

export const KonturPopulationMap = () => {
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
        longitude: 28.034088,
        latitude: -26.195246,
        zoom: 6,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
      terrain={{ source: source.id }}
    >
      <Source key={source.id} {...source}>
        {source.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
    </Map>
  );
};
