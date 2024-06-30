import { PMTilesSource } from "../../../types/PMTilesSource";

export const DEM1APMTilesSource: PMTilesSource = {
  id: "dem1a-source",
  tiles: [
    "pmtiles://https://data.source.coop/smartmaps/dem1a/dem1a.pmtiles/{z}/{x}/{y}.webp",
  ],
  tileSize: 512,
  type: "raster-dem",
  attribution: "測量法に基づく国土地理院長承認（使用）R 6JHs 133",
  maxzoom: 17,
  minzoom: 2,
  terrain: {
    source: "dem1a-source",
  },
  layers: [
    {
      id: "dem1a-hills",
      type: "hillshade",
      source: "dem1a-source",
      paint: {
        "hillshade-shadow-color": "#473B24",
      },
    },
  ],
};
