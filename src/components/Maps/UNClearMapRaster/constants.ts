import { LayerControl } from "./types";
import { ArmedConflictPMTilesSource } from "../../Datasets/ArmedConflict/source";
import { KonturPopulationPMTilesSource } from "../../Datasets/KonturPopulation/source";
import { Rwanda10PMTilesSource } from "../../Datasets/Rwanda10/source";

export const DEFAULT_LAYER_CONTROLS: LayerControl[] = [
  { id: "armed-conflict", label: "Armed Conflict Data", enabled: true },
  { id: "population", label: "Population Density", enabled: true },
  { id: "terrain", label: "Terrain", enabled: true },
];

export const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 0,
  zoom: 4,
  pitch: 45,
};

export const TERRAIN_CONFIG = {
  source: Rwanda10PMTilesSource.id,
  exaggeration: 1.5,
};

export const MAP_SOURCES = {
  armedConflict: ArmedConflictPMTilesSource,
  population: KonturPopulationPMTilesSource,
  terrain: Rwanda10PMTilesSource,
};

export const CONTROL_PANEL_STYLE = {
  position: "absolute" as const,
  top: 10,
  right: 10,
  background: "white",
  padding: "10px",
  borderRadius: "4px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

export const CONTROL_TITLE_STYLE = {
  margin: "0 0 10px 0",
};

export const CONTROL_ITEM_STYLE = {
  marginBottom: "5px",
};

export const CONTROL_LABEL_STYLE = {
  display: "flex" as const,
  alignItems: "center",
};

export const CONTROL_CHECKBOX_STYLE = {
  marginRight: "5px",
};
