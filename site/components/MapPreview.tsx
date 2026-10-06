import { useEffect, useState, type ComponentType } from "react";
import "../../src/maplibreWorker";
import { previews } from "./previews";

// Rendered with client:only="react": MapLibre needs the browser.
export default function MapPreview({ id }: { id: string }) {
  const [Map, setMap] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const load = previews[id];
    if (!load) return;
    load()
      .then((component) => setMap(() => component))
      .catch(() => setFailed(true));
  }, [id]);

  if (failed) return <p>地図のプレビューを読み込めませんでした。</p>;
  return <div style={{ width: "100%", height: "100%" }}>{Map ? <Map /> : null}</div>;
}
