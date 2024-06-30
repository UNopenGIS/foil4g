export type PMTilesSource = {
  id: string;
  url: string;
  type: "vector" | "raster" | "raster-dem";
  attribution: string;
  maxzoom?: number;
  minzoom?: number;
  layers?: LayerProps[];
};
