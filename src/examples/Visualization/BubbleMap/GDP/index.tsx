import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { featureCollection, centroid } from "@turf/turf";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
} from "geojson";

import { GDPBubbleMapSource as source } from "./source";

export const GDPBubbleMap = () => {
  const [pointData, setPointData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    if (!source.url) {
      console.error("Source URL is not defined.");
      return;
    }
    fetch(source.url)
      .then((res) => res.json())
      .then((geojson: FeatureCollection) => {
        // ポリゴン Feature を重心 Point に変換
        const points = geojson.features.map((feat: Feature) => {
          const pt = centroid(feat);
          // 元のプロパティをコピー
          if (!feat.properties || !feat.properties.GDP_MD) {
            console.warn("Feature does not have GDP_MD property:", feat);
            return pt;
          }
          pt.properties = {
            ...feat.properties,
            GDP_MD: Number(feat.properties.GDP_MD),
          };
          return pt;
        });
        // Point の FeatureCollection を作成
        setPointData(featureCollection(points));
      })
      .catch((err) => {
        console.error("Error fetching GeoJSON data:", err);
      });
  }, []);

  if (!pointData) return null;

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 2,
      }}
      dragPan
      scrollZoom
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json"
    >
      <Source
        key={`${source.id}-source`}
        id={`${source.id}-source`}
        type={source.type}
        data={pointData}
        attribution={source.attribution}
      >
        {source.layers?.map((layer) => {
          if (layer.type !== "circle") return null;
          return (
            <Layer
              key={`${layer.id}-layer`}
              id={`${layer.id}-layer`}
              source={`${source.id}-source`}
              type={layer.type}
              paint={layer.paint}
            />
          );
        })}
      </Source>
    </Map>
  );
};
