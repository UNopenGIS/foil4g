// MapLibre GL JS v6 cannot locate its worker inside a bundle, so point it
// at the worker that Vite emits. Import this module once, before any map
// is created.
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
