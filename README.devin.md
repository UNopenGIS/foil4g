# FOIL4G Developer Documentation

> **Important Note**: This repository (yuiseki/foil4g) is a fork of [UNopenGIS/foil4g](https://github.com/UNopenGIS/foil4g). All pull requests should be submitted to the upstream repository (UNopenGIS/foil4g) rather than this fork.

## Core Systems and Services

FOIL4G (Free and Open Information Library for Geospatial) is a comprehensive geospatial information platform built with:
- React + TypeScript frontend using Vite
- MapLibre GL for map rendering
- PMTiles for efficient tile storage
- Storybook for component documentation

### Key Features
1. Web-based mapping application
2. Multiple map source integrations
3. Geospatial data processing
4. Component-based architecture

## Project Structure

```
foil4g/
├── src/                    # Frontend source code
│   ├── App.tsx            # Main application component
│   └── components/
│       └── Maps/          # Map components
│           ├── OpenStreetMap/
│           └── SatelliteImagery/
├── lib/                    # Core library functionality
│   ├── api/               # API definitions for geospatial services
│   ├── data/              # Geospatial data source definitions
│   ├── skills/            # Geospatial processing skills
│   └── tasks/             # Data processing workflows
├── public/
│   └── stylejson/         # Map style configurations
└── .storybook/            # Storybook configuration
```

## Main Components and Classes

### Map Components
- `OpenStreetMapOrgRaster`: OSM standard raster tiles
- `OpenStreetMapFrHotRaster`: Humanitarian OSM tiles
- `OpenStreetMapJpOSMBrightVector`: Vector tiles with bright style
- `ArcGISWorldImagery`: Satellite imagery
- `UNClearMapRaster`: UN base map

### Core Libraries
1. `maplibre-gl`: Main mapping library
2. `pmtiles`: Efficient tile storage format
3. `react-map-gl`: React wrapper for MapLibre GL

## Development Setup

### Prerequisites
- Node.js
- npm/pnpm

### Installation
```bash
npm ci
```

### Development Commands
```bash
# Start development server
npm run dev

# Build project
npm run build

# Run linting
npm run lint

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## API and Data Structures

### API Definition Structure
Required fields in api/*.yaml:
- `api_id`: Unique identifier
- `description`: API purpose
- `endpoint_url`: Access URL
- `parameters`: Input parameters

### Data Source Structure
Required fields in data/*.yaml:
- `data_id`: Unique identifier
- `license`: Usage license
- `attributions`: Required credits
- `description`: Data description
- `data_format`: Format type
- `file_format`: File type
- `file_size`: Data size
- `url`: Access URL

### Task Definition Structure
Required fields in tasks/*.yaml:
- `task_id`: Unique identifier
- `description`: Task purpose
- `goal`: Task objective
- `input`: Required data sources
- `steps`: Processing instructions

## Glossary

- **FOIL4G**: Free and Open Information Library for Geospatial
- **PMTiles**: Efficient tile storage format for geospatial data
- **Vector Tiles**: Map data in vector format for flexible rendering
- **Raster Tiles**: Pre-rendered map images
- **MapLibre GL**: Open-source library for interactive maps
- **OSM**: OpenStreetMap
- **UN Clear Map**: United Nations base map style
