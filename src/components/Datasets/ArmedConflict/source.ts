import { PMTilesSource } from "../../../types/PMTilesSource";

export const ArmedConflictPMTilesSource: PMTilesSource = {
  id: "uppsala-armed-conflict",
  url: "pmtiles://https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://ucdp.uu.se/">Uppsala Conflict Data Program</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "event-layer",
      sourceLayer: "event",
      type: "circle",
      paint: {
        "circle-radius": 8,
        "circle-color": "rgba(141, 211, 199, 0.8)",
      },
    },
  ],
};
