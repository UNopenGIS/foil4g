import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { VientianeLandusePMTilesSource as source } from "../../Datasets/VientianeLanduse/source";

export const VientianeLanduseMap: React.FC = () => {
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
        longitude: 102.57100068372142,
        latitude: 18.116012774056472,
        zoom: 9.15,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={true}
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
