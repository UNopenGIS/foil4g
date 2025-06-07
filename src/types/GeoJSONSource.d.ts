export type GeoJSONSource = {
  id: string;
  url?: string;
  tiles?: string[];
  tileSize?: number;
  type: "geojson";
  attribution: string;
  maxzoom?: number;
  minzoom?: number;
  layers?: LayerProps[];
  terrain?: {
    source: string;
  };
};
