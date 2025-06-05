import {useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {MapboxOverlay} from "@deck.gl/mapbox";
import {ArcLayer} from "@deck.gl/layers";

const arcs = [
  {source: [-122.41669, 37.7853], target: [-77.032, 38.913]},
  {source: [-122.41669, 37.7853], target: [139.6917, 35.6895]},
];

export const DeckGLArcLayer: React.FC<{mapStyle: string}> = ({mapStyle}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [0, 0],
      zoom: 2,
    });

    const overlay = new MapboxOverlay({
      interleaved: true,
      layers: [
        new ArcLayer({
          id: "arc-layer",
          data: arcs,
          getSourcePosition: (d) => d.source,
          getTargetPosition: (d) => d.target,
          getSourceColor: [255, 0, 0],
          getTargetColor: [0, 128, 255],
          strokeWidth: 2,
        }),
      ],
    });
    map.addControl(overlay);

    return () => {
      overlay.finalize();
      map.remove();
    };
  }, [mapStyle]);

  return <div ref={containerRef} style={{width: "100%", height: "100%"}} />;
};
