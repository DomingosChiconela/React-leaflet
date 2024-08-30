import { useState,useEffect } from 'react'

import './App.css'
import { MapContainer,Marker,TileLayer,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css";



function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]); 
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }, []);

  console.log(userLocation);
  

  return (
    <div className='p-5 bg-zinc-800 flex justify-center w-fit h-fit m-auto'>
      <div className='leaflet-container'>
        {userLocation ? (
          <MapContainer center={userLocation} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
              url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
            <Marker position={userLocation}>
              <Popup>
                Sua localização
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Obtendo localização...</p> 
        )}
      </div>
    </div>
  );
}

export default App;