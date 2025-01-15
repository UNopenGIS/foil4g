import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layer, Map, Source } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { ArmedConflictPMTilesSource } from "../../Datasets/ArmedConflict/source";
import { KonturPopulationPMTilesSource } from "../../Datasets/KonturPopulation/source";
import { Rwanda10PMTilesSource } from "../../Datasets/Rwanda10/source";

interface LayerControl {
  id: string;
  label: string;
  enabled: boolean;
}

export const UNClearMapRaster = () => {
  const [layerControls, setLayerControls] = useState<LayerControl[]>([
    { id: "armed-conflict", label: "Armed Conflict Data", enabled: true },
    { id: "population", label: "Population Density", enabled: true },
    { id: "terrain", label: "Terrain", enabled: true },
  ]);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  const toggleLayer = (id: string) => {
    setLayerControls(controls =>
      controls.map(control =>
        control.id === id ? { ...control, enabled: !control.enabled } : control
      )
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 4,
          pitch: 45,
        }}
        dragPan={true}
        scrollZoom={true}
        hash={false}
        style={{ width: "100%", height: "100%" }}
        mapStyle="stylejson/geoservices.un.org/clearmap/style.json"
        terrain={
          layerControls.find(c => c.id === "terrain")?.enabled
            ? { source: Rwanda10PMTilesSource.id, exaggeration: 1.5 }
            : undefined
        }
      >
        {/* Armed Conflict Data */}
        {layerControls.find(c => c.id === "armed-conflict")?.enabled && (
          <Source
            key={ArmedConflictPMTilesSource.id}
            id={ArmedConflictPMTilesSource.id}
            type={ArmedConflictPMTilesSource.type}
            url={ArmedConflictPMTilesSource.url}
            maxzoom={ArmedConflictPMTilesSource.maxzoom}
            minzoom={ArmedConflictPMTilesSource.minzoom}
          >
            {ArmedConflictPMTilesSource.layers?.map(layer => (
              <Layer
                key={layer.id}
                id={layer.id}
                type={layer.type}
                paint={layer.paint}
                source={ArmedConflictPMTilesSource.id}
                source-layer={layer.sourceLayer}
              />
            ))}
          </Source>
        )}

        {/* Population Data */}
        {layerControls.find(c => c.id === "population")?.enabled && (
          <Source
            key={KonturPopulationPMTilesSource.id}
            id={KonturPopulationPMTilesSource.id}
            type={KonturPopulationPMTilesSource.type}
            url={KonturPopulationPMTilesSource.url}
            maxzoom={KonturPopulationPMTilesSource.maxzoom}
            minzoom={KonturPopulationPMTilesSource.minzoom}
          >
            {KonturPopulationPMTilesSource.layers?.map(layer => (
              <Layer
                key={layer.id}
                id={layer.id}
                type={layer.type}
                paint={layer.paint}
                source={KonturPopulationPMTilesSource.id}
                source-layer={layer.sourceLayer}
              />
            ))}
          </Source>
        )}

        {/* Terrain Data */}
        {layerControls.find(c => c.id === "terrain")?.enabled && (
          <Source
            key={Rwanda10PMTilesSource.id}
            id={Rwanda10PMTilesSource.id}
            type={Rwanda10PMTilesSource.type}
            tiles={Rwanda10PMTilesSource.tiles}
            maxzoom={Rwanda10PMTilesSource.maxzoom}
            minzoom={Rwanda10PMTilesSource.minzoom}
            tileSize={Rwanda10PMTilesSource.tileSize}
          >
            {Rwanda10PMTilesSource.layers?.map(layer => (
              <Layer
                key={layer.id}
                id={layer.id}
                type={layer.type}
                paint={layer.paint}
                source={Rwanda10PMTilesSource.id}
              />
            ))}
          </Source>
        )}
      </Map>

      {/* Layer Controls */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "white",
          padding: "10px",
          borderRadius: "4px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>Layer Controls</h3>
        {layerControls.map(control => (
          <div key={control.id} style={{ marginBottom: "5px" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={control.enabled}
                onChange={() => toggleLayer(control.id)}
                style={{ marginRight: "5px" }}
              />
              {control.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
