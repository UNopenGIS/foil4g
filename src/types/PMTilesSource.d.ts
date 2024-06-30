export type PMTilesSource = {
  id: string;
  url?: string;
  tiles?: string[];
  tileSize?: number;
  type: "vector" | "raster" | "raster-dem";
  attribution: string;
  maxzoom?: number;
  minzoom?: number;
  layers?: LayerProps[];
  terrain?: {
    source: string;
  };
};
