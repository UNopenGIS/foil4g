import './App.css'
import { ArcGISWorldImagery } from './components/Maps/SatelliteImagery/ArcGISWorldImagery'
import { OpenStreetMapFrHotRaster } from './components/Maps/OpenStreetMap/OpenStreetMapFrHotRaster'
import { OpenStreetMapJpOSMBrightVector } from './components/Maps/OpenStreetMap/OpenStreetMapJpOSMBrightVector'
import { OpenStreetMapOrgRaster } from './components/Maps/OpenStreetMap/OpenStreetMapOrgRaster'
import { UNClearMapRaster } from './components/Maps/UNClearMapRaster'

function App() {
  return (
    <div style={{
      margin: '0 20px',
    }}>
      <h1>FOIL4G - UN Open GIS</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <UNClearMapRaster />
        <OpenStreetMapOrgRaster />
        <OpenStreetMapFrHotRaster />
        <OpenStreetMapJpOSMBrightVector />
        <ArcGISWorldImagery />
      </div>
    </div>
  )
}

export default App
