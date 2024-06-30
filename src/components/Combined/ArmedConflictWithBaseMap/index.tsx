import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";

const source = {
  id: "uppsala-conflict",
  url: "pmtiles://https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles",
  attribution: '<a href="https://opencellid.org/">OpenCelliD</a>',
  maxzoom: 18,
  minzoom: 2,
};

export const ArmedConflictWithBaseMap: React.FC<{ mapStyle: string }> = ({
  mapStyle,
}) => {
  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

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
        key={`${source.id}-source`}
        id={`${source.id}-source`}
        type="vector"
        url={source.url}
        attribution={source.attribution}
        maxzoom={source.maxzoom}
        minzoom={source.minzoom}
      >
        <Layer
          key={`${source.id}-layer`}
          id={`${source.id}-layer`}
          source={`${source.id}-source`}
          source-layer="event"
          type="circle"
          paint={{
            "circle-radius": 8,
            "circle-color": "rgba(141, 211, 199, 0.8)",
          }}
        />
      </Source>
    </Map>
  );
};
