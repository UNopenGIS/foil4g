import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";

export const ArmedConflictWithBaseMap:React.FC<{mapStyle: string}> = ({mapStyle}) => {
  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  const layer = {
    id: "uppsala-conflict",
    url: "pmtiles://https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles",
    attribution: '<a href="https://opencellid.org/">OpenCelliD</a>',
    maxzoom: 18,
    minzoom: 2,
  };

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 4,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
    >
      <Source
        key={`${layer.id}-source`}
        id={`${layer.id}-source`}
        type="vector"
        url={layer.url}
        attribution={layer.attribution}
        maxzoom={layer.maxzoom}
        minzoom={layer.minzoom}
      >
        <Layer
          id={`${layer.id}-layer`}
          source={`${layer.id}-source`}
          source-layer="event"
          type="circle"
          paint={{
            "circle-radius": 8,
            "circle-color": "rgba(231, 84, 128, 0.8)",
          }}
        />
      </Source>
    </Map>
  );
};
