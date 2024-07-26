import { PMTilesSource } from "../../../types/PMTilesSource";

export const GoogleOpenBuildingsSource: PMTilesSource = {
  id: "google-open-buildings-source",
  url: "pmtiles://https://data.source.coop/cholmes/google-open-buildings/google-open-buildings.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://sites.research.google/open-buildings/">Google Open Buildings</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "buildings-layer",
      sourceLayer: "buildings",
      type: "fill",
      paint: {
        "fill-color": "rgba(117, 169, 160, 0.8)",
      },
    },
  ],
};
