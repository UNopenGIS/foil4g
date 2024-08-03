import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { ArmedConflictPMTilesSource as dataSource } from "../../../../../components/Datasets/ArmedConflict/source";
import { Rwanda10PMTilesSource as terrainSource } from "../../../../../components/Datasets/Rwanda10/source";
import { OvertureMapsTransportationOnlyPMTilesSource as transportationSource } from "../../../../../components/Datasets/OvertureMaps/source";

export const ArmedConflictWithRwanda10WithOverture: React.FC<{ mapStyle: string }> = ({
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
        longitude: 30.07232666015625,
        latitude: -1.9826364384297364,
        pitch: 60,
        zoom: 8,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
    >
      <Source key={dataSource.id} {...dataSource}>
        {dataSource.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
      <Source key={terrainSource.id} {...terrainSource}>
        {terrainSource.layers?.map((layer) => (
          <Layer key={layer.id} {...layer} />
        ))}
      </Source>
      <Source key={transportationSource.id} {...transportationSource}>
        {transportationSource.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
    </Map>
  );
};
