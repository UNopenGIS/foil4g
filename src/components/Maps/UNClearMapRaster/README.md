# UNClearMapRaster Component

An enhanced UN Clear Map component that integrates multiple operational data layers for UN field operations support.

## Features

- **Base Map**: UN Clear Map style for standardized visualization
- **Armed Conflict Data**: Visualization of conflict events using PMTiles
- **Population Density**: Demographic data overlay using Kontur Population dataset
- **Terrain Visualization**: 3D terrain rendering with elevation data
- **Interactive Controls**: Layer visibility toggles for operational data

## Usage

```tsx
import { UNClearMapRaster } from "./components/Maps/UNClearMapRaster";

function App() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <UNClearMapRaster />
    </div>
  );
}
```

## Data Sources

- **UN Clear Map**: Base map style from UN Geospatial
- **Armed Conflict**: Uppsala Conflict Data Program
- **Population**: Kontur Population Dataset
- **Terrain**: Rwanda 10m DEM (Digital Elevation Model)

## Layer Controls

The component includes an interactive control panel that allows users to:
- Toggle armed conflict data visibility
- Toggle population density overlay
- Toggle terrain visualization
- Adjust map view parameters

## Technical Details

- Built with MapLibre GL JS and React
- Uses PMTiles for efficient data storage
- Implements terrain visualization with elevation exaggeration
- Supports multiple vector and raster data sources
