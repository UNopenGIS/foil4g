import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { OpenCellIdPMTilesSource as source } from "./source";

export const OpenCellId = () => {
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
        zoom: 4,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
    >
      <Source
        key={`${source.id}-source`}
        id={`${source.id}-source`}
        type={source.type}
        url={source.url}
        attribution={source.attribution}
        maxzoom={source.maxzoom}
        minzoom={source.minzoom}
      >
        {source.layers?.map((layer) => {
          switch (layer.type) {
            case "circle":
              return (
                <Layer
                  key={`${layer.id}-layer`}
                  id={`${layer.id}-layer`}
                  source={`${source.id}-source`}
                  source-layer={layer.sourceLayer}
                  type={layer.type}
                  paint={layer.paint}
                />
              );
            default:
              return null;
          }
        })}
      </Source>
    </Map>
  );
};
