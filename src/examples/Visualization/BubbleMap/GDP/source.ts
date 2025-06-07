import { GeoJSONSource } from "../../../../types/GeoJSONSource";

export const GDPBubbleMapSource: GeoJSONSource = {
  id: "gdp-bubble",
  type: "geojson",
  url: "data/ne_10m_admin_0_countries.geojson",
  attribution: "GDP data",
  layers: [
    {
      id: "gdp-circle-layer",
      type: "circle",
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["get", "GDP_MD"],
          0,
          2,
          1e3,
          5,
          1e4,
          10,
          5e4,
          15,
          1e5,
          20,
          5e5,
          25,
          1e6,
          30,
          5e6,
          40,
          2e7,
          50
        ],
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "GDP_MD"],
          0,
          "#fff7ec",
          1e3,
          "#fee8c8",
          1e4,
          "#fdd49e",
          5e4,
          "#fdbb84",
          1e5,
          "#fc8d59",
          5e5,
          "#ef6548",
          1e6,
          "#d7301f",
          5e6,
          "#b30000",
          2e7,
          "#7f0000"
        ],
        "circle-opacity": 0.8,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1,
        "circle-stroke-opacity": 0.9
      }
    }
  ]
};

