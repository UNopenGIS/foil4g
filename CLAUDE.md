# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
- `npm run dev` - Start Vite development server
- `npm run preview` - Preview production build locally

### Build and Lint
- `npm run build` - TypeScript compilation + Vite build
- `npm run lint` - ESLint check (max 0 warnings)

### Storybook
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build static Storybook

## Architecture Overview

FOIL4G is a React-based web mapping library that provides reusable components for displaying geospatial data. The application follows a component-based architecture centered around mapping libraries and geospatial data sources.

### Core Technology Stack
- **React 18** with TypeScript and Vite
- **MapLibre GL JS** as primary mapping engine
- **react-map-gl** for React MapLibre integration
- **PMTiles** for efficient vector tile serving
- **Storybook** for component development and documentation

### Component Structure

#### Maps (`src/components/Maps/`)
Reusable map components that combine base maps with specific styling:
- OpenStreetMap variants (raster tiles, vector tiles, HOT style)
- Satellite imagery (ArcGIS World Imagery, GSI seamless photos)  
- UN Clear Map (raster and dark variants)

#### Datasets (`src/components/Datasets/`)
Standalone data layer components with PMTiles sources:
- Armed conflict data (Uppsala Conflict Data Program)
- Population density (Kontur Population)
- Cell tower locations (OpenCellID)
- Building footprints (Google Open Buildings, Overture Maps)
- Terrain data (DEM1A, GEL, Rwanda 10m)

#### Examples (`src/examples/`)
Complex compositions showing how to combine multiple datasets:
- Combined visualizations (conflict + population + terrain)
- Story-based examples (Rwanda mapping scenarios)
- Visualization types (bubble maps, choropleth, heatmaps)

### PMTiles Integration Pattern

All geospatial datasets follow a consistent pattern:
1. Source definition in `{Dataset}/source.ts` using `PMTilesSource` type
2. Component implementation in `{Dataset}/index.tsx`
3. Storybook story in `{Dataset}/index.stories.ts`

PMTiles sources define:
- Data URL (typically from data.source.coop)
- Layer styling (paint properties)
- Zoom levels and attribution

### Key Files

- `src/types/PMTilesSource.d.ts` - Type definitions for PMTiles sources
- `src/components/PMTilesSourceOptions.ts` - Centralized source registry
- `public/stylejson/` - MapLibre style definitions for base maps
- `.storybook/` - Storybook configuration for component development

### Development Patterns

1. **Component Creation**: New map components should include both implementation and Storybook story
2. **Data Sources**: New datasets require source definition, component, and story
3. **Styling**: Follow existing paint property patterns for consistency
4. **File Organization**: Maintain parallel structure between Maps, Datasets, and Examples

### Work Note System (from copilot-instructions.md)

When working on this codebase, maintain work notes in `tmp/note/yyyy/MM/dd/` using these prefixes:
- 📝 Confirmed specifications/status
- ⬜ Pending tasks  
- 🔨 In-progress tasks
- ✅ Completed tasks
- ❌ Failed tasks
- 🚫 Rejected tasks

Update notes before and after implementation or command execution.