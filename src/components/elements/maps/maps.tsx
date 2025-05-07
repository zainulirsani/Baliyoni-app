import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Contoh data GeoJSON kabupaten di Bali (gunakan data GeoJSON asli untuk wilayah)
const baliGeoJSON = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [115.016, -8.364],
          [115.122, -8.372],
          [115.118, -8.29],
          [115.016, -8.27],
          [115.016, -8.364]
        ]
      ]
    },
    "properties": {
      "kabupaten": "Badung",
      "color": "#FF0000" // Warna untuk Badung
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [115.188, -8.409],
          [115.30, -8.415],
          [115.30, -8.35],
          [115.188, -8.35],
          [115.188, -8.409]
        ]
      ]
    },
    "properties": {
      "kabupaten": "Denpasar",
      "color": "#0000FF" // Warna untuk Denpasar
    }
  },
  // Data kabupaten lainnya di Bali dapat ditambahkan di sini
];

const Maps = () => {
  // Koordinat tengah Indonesia (Bali)
  const center: [number, number] = [-8.409518, 115.188919]; // Koordinat Bali

  // Fungsi untuk memberikan warna pada masing-masing kabupaten/kota
  const onEachCounty = (feature: any, layer: any) => {
    layer.setStyle({
      fillColor: feature.properties.color, // Warna dari GeoJSON
      weight: 2,
      opacity: 1,
      color: 'white', // Garis tepi
      dashArray: '3',
      fillOpacity: 0.7,
    });

    layer.bindPopup(`<b>${feature.properties.kabupaten}</b>`); // Menampilkan nama kabupaten pada popup
  };

  return (
    <MapContainer center={center} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Menambahkan GeoJSON kabupaten Bali dengan warna berdasarkan data */}
      <GeoJSON data={baliGeoJSON} onEachFeature={onEachCounty} />
    </MapContainer>
  );
};

export default Maps;
