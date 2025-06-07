import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { PopulationChoroplethMapSource as source } from "./source";
import { useEffect, useState } from "react";

export const PopulationChoroplethMap = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!source.url) {
      console.error("Source URL is not defined.");
      return;
    }
    fetch(source.url)
      .then((response) => response.json())
      .then((geojson) => {
        setData(geojson);
      })
      .catch((error) => {
        console.error("Error fetching GeoJSON data:", error);
      });
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 2,
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
        data={data}
        attribution={source.attribution}
      >
        {source.layers?.map((layer) => {
          switch (layer.type) {
            case "fill":
              return (
                <Layer
                  key={`${layer.id}-layer`}
                  id={`${layer.id}-layer`}
                  source={`${source.id}-source`}
                  type={layer.type}
                  paint={layer.paint}
                />
              );
            case "line":
              return (
                <Layer
                  key={`${layer.id}-layer`}
                  id={`${layer.id}-layer`}
                  source={`${source.id}-source`}
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
