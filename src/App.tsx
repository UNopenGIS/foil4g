import './App.css'
import { ArcGisWorldImagery } from './components/ArcGisWorldImagery'
import { OpenStreetMapFrHotRaster } from './components/OpenStreetMapFrHotRaster'
import { OpenStreetMapOrgRaster } from './components/OpenStreetMapOrgRaster'

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
        <OpenStreetMapOrgRaster />
        <OpenStreetMapFrHotRaster />
        <ArcGisWorldImagery />
      </div>
    </div>
  )
}

export default App
