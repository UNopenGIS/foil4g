import { ArmedConflictPMTilesSource } from "./Datasets/ArmedConflict/source";
import { OpenCellIdPMTilesSource } from "./Datasets/OpenCellId/source";
import { OvertureMapsPMTilesSource } from "./Datasets/OvertureMaps/source";

export const PMTilesSourceOptions = {
  "Armed Conflict": ArmedConflictPMTilesSource,
  OpenCellId: OpenCellIdPMTilesSource,
  "Overture Maps": OvertureMapsPMTilesSource,
};
