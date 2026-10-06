import { PMTilesSource } from "../types/PMTilesSource";

// MapLibre GL JS v6 rejects a source specification that has unknown keys,
// so drop the fields that describe layers and terrain before passing a
// PMTilesSource to <Source>.
export const sourceProps = (source: PMTilesSource) => {
  const props = { ...source };
  delete props.layers;
  delete props.terrain;
  return props;
};
