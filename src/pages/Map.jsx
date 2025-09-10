import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const Map = () => {
  // Center map roughly over Madhya Pradesh, Tripura, Odisha, Telangana region
  const position = [22.5, 82.5]; // Central India region

  const [claims] = useState([
    { id: 1, position: [23.2599, 81.8282], village: 'Village A', status: 'Approved' }, // MP
    { id: 2, position: [23.9408, 91.9882], village: 'Village B', status: 'Pending' },  // Tripura
    { id: 3, position: [20.9517, 85.0985], village: 'Village C', status: 'Approved' }, // Odisha
    { id: 4, position: [17.3850, 78.4867], village: 'Village D', status: 'Pending' },  // Telangana
  ]);

  const [search, setSearch] = useState('');

  const filteredClaims = claims.filter(claim =>
    claim.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Interactive WebGIS Map</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by village"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="h-96 w-full">
        <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Claims">
              <LayerGroup>
                {filteredClaims.map(claim => (
                  <Marker key={claim.id} position={claim.position}>
                    <Popup>
                      <div>
                        <h3>{claim.village}</h3>
                        <p>Status: {claim.status}</p>
                        <p>Claim ID: {claim.id}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>

          <FeatureGroup>
            <EditControl
              position='topleft'
              draw={{
                rectangle: true,
                polygon: true,
                circle: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
