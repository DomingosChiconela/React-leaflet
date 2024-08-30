import { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]); 
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }, []);

  
  function MapClickHandler() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]); 
        console.log(`Mapa clicado em: Latitude ${lat}, Longitude ${lng}`);
      }
    });
    return null; 
  }

  return (
    <div className='p-5 bg-zinc-800 flex justify-center w-fit h-fit m-auto'>
      <div className='leaflet-container'>
        {markerPosition ? (
          <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
              url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
            <MapClickHandler /> {/* Este componente está registrando os cliques no mapa */}
            <Marker position={markerPosition}>
              <Popup>
                Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
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
