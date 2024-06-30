import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";

const source = {
  id: "overture-maps-source",
  url: "pmtiles://https://tile.openstreetmap.jp/static/overture.pmtiles",
  attribution: '<a href="https://overturemaps.org/">Overture Maps Foundation</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "building-layer",
      sourceLayer: "building",
      type: "fill",
      paint: {
        "fill-color": "rgba(141, 211, 199, 0.8)",
      },
    },
    {
      id: "transportation-layer",
      sourceLayer: "transportation",
      type: "line",
      paint: {
        "line-color": "rgba(255, 255, 179, 0.8)",
        "line-width": 1,
      },
    },
    {
      id: "water-layer",
      sourceLayer: "water",
      type: "fill",
      paint: {
        "fill-color": "rgba(173, 216, 230, 0.8)",
      },
    }
  ]
};

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
      <Source
        key={`${source.id}-source`}
        id={`${source.id}-source`}
        type="vector"
        url={source.url}
        attribution={source.attribution}
        maxzoom={source.maxzoom}
        minzoom={source.minzoom}
      >
        {source.layers.map((layer) => {
          switch (layer.type) {
            case "fill":
            case "line":
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
