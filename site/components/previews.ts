// Which map preview to show on which data source card, keyed by the card's
// frontmatter id. Each entry loads its component only when the card is opened.
import type { ComponentType } from "react";

type Loader = () => Promise<ComponentType>;

export const previews: Record<string, Loader> = {
  smartmaps_uppsala_conflict_pmtiles: () =>
    import("../../src/components/Datasets/ArmedConflict").then((m) => m.ArmedConflictMap),
};
