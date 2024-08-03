import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { OpenCellIdPMTilesSource as dataSource } from "../../../../../components/Datasets/OpenCellId/source";
import { DEM1APMTilesSource as terrainSource } from "../../../../../components/Datasets/DEM1A/source";
import { OvertureMapsTransportationOnlyPMTilesSource as transportationSource } from "../../../../../components/Datasets/OvertureMaps/source";

export const OpenCellIdWithDEM1AAndOverture: React.FC<{ mapStyle: string }> = ({
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
        longitude: 140.88,
        latitude: 36.988,
        zoom: 12,
        pitch: 50,
        bearing: 0,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      terrain={{ source: terrainSource.id }}
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
