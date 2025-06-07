import { GeoJSONSource } from "../../../../types/GeoJSONSource";

export const PopulationChoroplethMapSource: GeoJSONSource = {
  id: "population-choropleth",
  type: "geojson",
  url: "data/ne_10m_admin_0_countries.geojson",
  attribution: "Population data",
  layers: [
    {
      id: "population-fill-layer",
      type: "fill",
      paint: {
        // Color scale based on POP_EST property
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'POP_EST'],
          0,
          '#f7f4f9',
          1000000,
          '#e7e1ef',
          5000000,
          '#d4b9da',
          10000000,
          '#c994c7',
          25000000,
          '#df65b0',
          50000000,
          '#e7298a',
          100000000,
          '#ce1256',
          500000000,
          '#91003f'
        ],
        'fill-opacity': 0.8
      }
    },
    {
      id: "population-stroke-layer",
      type: "line",
      paint: {
        'line-color': '#627BC1',
        'line-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 0.5,
          5, 1,
          10, 2
        ],
        'line-opacity': 0.7
      }
    }
  ]
};