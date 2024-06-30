import { PMTilesSource } from "../../../types/PMTilesSource";

export const Rwanda10PMTilesSource: PMTilesSource = {
  id: "rwanda-10-source",
  tiles: [
    "pmtiles://https://data.source.coop/smartmaps/rwanda10/rwanda10.pmtiles/{z}/{x}/{y}.webp",
  ],
  tileSize: 512,
  type: "raster-dem",
  attribution:
    "Water and Sanitation Corporation (WASAC), National Land Authority (NLA)",
  maxzoom: 14,
  minzoom: 2,
  terrain: {
    source: "rwanda-10-source",
  },
  layers: [
    {
      id: "rwanda-10-hills",
      type: "hillshade",
      source: "rwanda-10-source",
      paint: {
        "hillshade-shadow-color": "#473B24",
      },
    },
  ],
};
