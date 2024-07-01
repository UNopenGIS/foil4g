import { PMTilesSource } from "../../../types/PMTilesSource";

export const GELPMTilesSource: PMTilesSource = {
  id: "gel-source",
  url: "https://beta.source.coop/smartmaps/gel/gel.pmtiles",
  type: "raster",
  attribution: '<a href="https://lpdaac.usgs.gov/products/nasadem_hgtv001/">NASADEM</a>, <a href="https://globalmaps.github.io/">Global Map (ISCGM)</a>',
  maxzoom: 12,
  minzoom: 6,
  terrain: {
    source: "gel-source",
  },
  layers: [
    {
      id: "gel-hills",
      type: "hillshade",
      source: "gel-source",
      paint: {
        "hillshade-shadow-color": "#473B24",
      },
    },
  ],
};
