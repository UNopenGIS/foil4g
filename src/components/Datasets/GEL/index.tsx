import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { GELPMTilesSource as source } from "./source";

export const GELMap = () => {
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
        longitude: 0,
        latitude: 0,
        zoom: 6,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={true}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
    >
      <Source key={source.id} {...source}>
        {source.layers?.map((layer) => <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />)}
      </Source>
    </Map>
  );
};
