# FOIL4G Developer Documentation

> **Important Note**: This is the main UNopenGIS/foil4g repository, a significant contribution to the UN Open GIS Initiative. The project supports the initiative's mission of leveraging open-source geospatial solutions for UN peacekeeping and humanitarian operations. If you're working with a fork, please ensure all pull requests are submitted here rather than to other forks to ensure proper contribution tracking.

## Project Mission

FOIL4G actively supports the UN Open GIS Initiative's goals by:
- Providing open-source geospatial solutions for UN field operations
- Supporting decision-making with accurate location-based data
- Enabling collaborative mapping and data validation
- Contributing to the UN Maps ecosystem for peacekeeping missions
- Fostering knowledge sharing through the UN Maps Learning Hub

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

## Contributing

FOIL4G welcomes contributions that enhance UN peacekeeping and humanitarian operations through open-source geospatial solutions. By contributing, you demonstrate technical capabilities in:
- Geospatial data processing and visualization
- Open-source GIS development
- UN Maps ecosystem integration
- Collaborative mapping solutions
- Humanitarian technology applications

### Pull Request Workflow
When contributing to this project, follow these steps:

1. Fork the repository to your account if you haven't already
2. Create a new branch with a descriptive name
3. Make your changes and commit them
4. Create a pull request to your fork first
5. After the PR is created, you can change the base to point to UNopenGIS/foil4g

> **Note**: Due to authentication requirements, it's recommended to first create your PR to your own fork and then change the base repository to UNopenGIS/foil4g. This helps bypass potential authentication issues that may occur when trying to create PRs directly to the upstream repository.

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
- **UN Open GIS Initiative**: UN partnership established in 2016 to leverage open-source geospatial solutions for peacekeeping operations
- **UN Maps**: Program supporting UN field operations with geospatial data and collaborative mapping
- **UN Clear Map**: United Nations base map style for standardized visualization
- **PMTiles**: Efficient tile storage format for geospatial data
- **Vector Tiles**: Map data in vector format for flexible rendering
- **Raster Tiles**: Pre-rendered map images
- **MapLibre GL**: Open-source library for interactive maps
- **OSM**: OpenStreetMap, a collaborative mapping platform
