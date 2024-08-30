import { useState } from 'react'

import './App.css'
import { MapContainer,Marker,TileLayer,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css";

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='p-5 bg-zinc-800 flex justify-center w-fit h-fit m-auto'>
    <div  className='leaflet-container'>

      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        
          // url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

    </div></div>
    
    
  )
}

export default App
