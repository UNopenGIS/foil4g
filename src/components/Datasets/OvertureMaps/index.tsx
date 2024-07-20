import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { OvertureMapsPMTilesSource as source } from "./source";

export const OvertureMaps = () => {
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
        longitude: 139.75288,
        latitude: 35.68458,
        zoom: 14,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
    >
      <Source key={source.id} {...source}>
        {source.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
    </Map>
  );
};
