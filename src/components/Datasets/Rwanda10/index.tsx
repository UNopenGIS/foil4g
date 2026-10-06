import { Protocol } from "pmtiles";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { sourceProps } from "../../sourceProps";
import { useEffect } from "react";
import { Rwanda10PMTilesSource as source } from "./source";

export const Rwanda10Map = () => {
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
        longitude: 30.07232666015625,
        latitude: -1.9826364384297364,
        pitch: 60,
        zoom: 8,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
      terrain={{ source: source.id, exaggeration: 2 }}
    >
      <Source key={source.id} {...sourceProps(source)}>
        {source.layers?.map((layer) => <Layer key={layer.id} {...layer} />)}
      </Source>
    </Map>
  );
};
