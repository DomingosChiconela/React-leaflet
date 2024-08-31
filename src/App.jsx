import { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents, ScaleControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
const provinces = {
  "MZ-MPM": "Maputo Cidade",
  "MZ-P": "Cabo Delgado",
  "MZ-G": "Gaza",
  "MZ-I": "Inhambane",
  "MZ-B": "Manica",
  "MZ-L": "Maputo Província",
  "MZ-N": "Nampula",
  "MZ-A": "Niassa",
  "MZ-S": "Sofala",
  "MZ-T": "Tete",
  "MZ-Q": "Zambézia"
};

function App() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [displayName, setDisplayName] = useState(null);

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
      click: async (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]);  // Atualiza o marcador para a nova posição
        console.log(`Mapa clicado em: Latitude ${lat}, Longitude ${lng}`);
  
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);

          console.log(response)
          
          let address = '';  
          
          if (response.data && response.data.address) {
            const data = response.data.address;  
            if (data.road) {
              address += data.road;
            }
            if (data.neighbourhood) {
              address += (address ? ', ' : '') + data.neighbourhood;  
            }
            
            if (data. residential) {
              address += (address ? ', ' : '') + data.residential;  
            }

            if (data.city_district) {
              address += (address ? ', ' : '') + data.city_district;
            }
            if (data.city && ["Sofala","Niassa","Nampula","Zambézia","Inhambane","Manica","Tete","Maputo"].includes(data.city)!= true) {
              address += (address ? ', ' : '') + `cidade de ${data.city}`;
            }
            if (data['ISO3166-2-lvl4']) {
              const provinceCode = data['ISO3166-2-lvl4'];
              const provinceName = provinces[provinceCode]; 
              if (provinceName) {
                address += (address ? ', ' : '') + provinceName;
              }
            }
            setDisplayName(address);  
          }
        } catch (error) {
          console.error('Erro ao buscar informações de localização:', error);
        }
      }
    });
  
    return null; 
  }
  return (
    <div className='p-5 bg-zinc-800 flex justify-center w-fit h-fit m-auto'>
      <div className='leaflet-container'>
        {markerPosition ? (
          <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
           <ScaleControl position={'bottomright'} />
            <TileLayer
              url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
            <MapClickHandler /> 
            <Marker position={markerPosition}>
              <Popup>
                {displayName?displayName:"sua localizacao"}
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
