import { PMTilesSource } from "../../../types/PMTilesSource";

export const OvertureMapsPMTilesSource: PMTilesSource = {
  id: "overture-maps-source",
  url: "pmtiles://https://tile.openstreetmap.jp/static/overture.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://overturemaps.org/">Overture Maps Foundation</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "building-layer",
      sourceLayer: "building",
      type: "fill",
      paint: {
        "fill-color": "rgba(141, 211, 199, 0.8)",
      },
    },
    {
      id: "transportation-layer",
      sourceLayer: "transportation",
      type: "line",
      paint: {
        "line-color": "rgba(255, 255, 179, 0.8)",
        "line-width": 1,
      },
    },
    {
      id: "water-layer",
      sourceLayer: "water",
      type: "fill",
      paint: {
        "fill-color": "rgba(173, 216, 230, 0.8)",
      },
    },
  ],
};

export const OvertureMapsTransportationOnlyPMTilesSource: PMTilesSource = {
  id: "overture-maps-source",
  url: "pmtiles://https://tile.openstreetmap.jp/static/overture.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://overturemaps.org/">Overture Maps Foundation</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "transportation-layer",
      source: "overture-maps-source",
      sourceLayer: "transportation",
      type: "line",
      paint: {
        "line-color": "rgba(255, 255, 179, 0.8)",
        "line-width": 1,
      },
    },
  ],
};
