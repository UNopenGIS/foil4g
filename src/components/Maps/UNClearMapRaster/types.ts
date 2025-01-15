export interface LayerControl {
  id: string;
  label: string;
  enabled: boolean;
}

export interface TerrainConfig {
  source: string;
  exaggeration: number;
}

export interface LayerConfig {
  id: string;
  type: string;
  paint: Record<string, unknown>;
  sourceLayer?: string;
}

export interface SourceConfig {
  id: string;
  type: string;
  url?: string;
  tiles?: string[];
  tileSize?: number;
  maxzoom: number;
  minzoom: number;
  attribution?: string;
  layers?: LayerConfig[];
}
