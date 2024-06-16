import './App.css'
import { ArcGISWorldImagery } from './components/ArcGISWorldImagery'
import { OpenStreetMapFrHotRaster } from './components/OpenStreetMapFrHotRaster'
import { OpenStreetMapJpOSMBrightVector } from './components/OpenStreetMapJpOSMBrightVector'
import { OpenStreetMapOrgRaster } from './components/OpenStreetMapOrgRaster'
import { UNClearMapRaster } from './components/UNClearMapRaster'

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
