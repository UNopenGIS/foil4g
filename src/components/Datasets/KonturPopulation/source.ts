import { PMTilesSource } from "../../../types/PMTilesSource";

export const KonturPopulationPMTilesSource: PMTilesSource = {
  id: "kpop-source",
  url: "pmtiles://https://data.source.coop/smartmaps/foil4gr1/kpop.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://data.humdata.org/m/dataset/kontur-population-dataset">Kontur Population: Global Population Density for 400m H3 Hexagons</a>',
  maxzoom: 14,
  minzoom: 0,
  layers: [
    {
      id: "kpop-layer",
      type: "fill",
      source: "kpop-source",
      sourceLayer: "kpop",
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["number", ["get", "pop"]],
          0,
          "rgba(0, 255, 0, 0.01)",
          100000,
          "rgba(0, 255, 0, 0.6)",
        ],
      },
    },
  ],
};
