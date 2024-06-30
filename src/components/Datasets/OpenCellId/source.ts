import { PMTilesSource } from "../../../types/PMTilesSource";

export const OpenCellIdPMTilesSource: PMTilesSource = {
  id: "opencellid-source",
  url: "pmtiles://https://data.source.coop/smartmaps/opencellid/cellid.pmtiles",
  type: "vector",
  attribution: '<a href="https://opencellid.org/">OpenCelliD</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "cell-layer",
      sourceLayer: "a",
      type: "circle",
      paint: {
        "circle-radius": 8,
        "circle-color": "rgba(141, 211, 199, 0.8)",
      },
    },
  ],
};
