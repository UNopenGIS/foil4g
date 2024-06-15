import './App.css'
import { ArcGisWorldImagery } from './components/ArcGisWorldImagery'
import { OpenStreetMapFrHotRaster } from './components/OpenStreetMapFrHotRaster'
import { OpenStreetMapOrgRaster } from './components/OpenStreetMapOrgRaster'

function App() {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <OpenStreetMapOrgRaster />
        <OpenStreetMapFrHotRaster />
        <ArcGisWorldImagery />
      </div>
    </>
  )
}

export default App
