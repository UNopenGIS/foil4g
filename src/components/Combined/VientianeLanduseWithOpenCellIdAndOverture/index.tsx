import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { VientianeLandusePMTilesSource as landuseDataSource } from "../../Datasets/VientianeLanduse/source";
import { OpenCellIdPMTilesSource as cellIdDataSource } from "../../Datasets/OpenCellId/source";
import { OvertureMapsTransportationOnlyPMTilesSource as transportationSource } from "../../Datasets/OvertureMaps/source";

export const VientianeLanduseWithOpenCellIdAndOverture: React.FC<{ mapStyle: string }> = ({
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
        longitude: 102.57100068372142,
        latitude: 18.116012774056472,
        zoom: 9.15,
      }}
      dragPan={true}
      scrollZoom={true}
      hash={true}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
    >
      <Source key={cellIdDataSource.id} {...cellIdDataSource}>
        {cellIdDataSource.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
      <Source key={transportationSource.id} {...transportationSource}>
        {transportationSource.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
      <Source key={landuseDataSource.id} {...landuseDataSource}>
        {landuseDataSource.layers?.map((layer) => (
          <Layer key={layer.id} source-layer={layer.sourceLayer} {...layer} />
        ))}
      </Source>
    </Map>
  );
};
