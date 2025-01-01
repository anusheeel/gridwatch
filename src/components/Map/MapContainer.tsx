// MapContainer.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

interface MapContainerProps {
  substations: Array<{ id: number; location: { lat: number; lng: number }; name: string }>;
  onSubstationSelect: (name: string) => void;
  onSensorDataUpdate: (data: Record<string, any>) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  substations, 
  onSubstationSelect, 
  onSensorDataUpdate 
}) => {
  const center = [51.505, -0.09];
  const zoom = 13;
  const [sensorData, setSensorData] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log('Substations:', substations);
  }, [substations]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Data received:', data);
        if (data.type === 'SENSOR_UPDATE' && Array.isArray(data.payload)) {
          const mapped = data.payload.reduce((acc, sensor) => {
            const fullName = `Sensor ${sensor.name}`;
            acc[fullName] = {
              ...sensor,
              name: fullName
            };
            return acc;
          }, {});
          console.log('Mapped sensor data:', mapped);
          setSensorData(mapped);
          onSensorDataUpdate(mapped);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onSensorDataUpdate]);

  return (
    <div className="map-container">
      <LeafletMap center={center} zoom={zoom} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MarkerClusterGroup>
          {substations.map((substation) => (
            <Marker 
              key={substation.id} 
              position={[substation.location.lat, substation.location.lng]}
              eventHandlers={{
                click: () => onSubstationSelect(substation.name)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold mb-2">{substation.name}</h3>
                  {sensorData[substation.name] ? (
                    <>
                      <p>Voltage: {sensorData[substation.name].voltage.toFixed(2)} kV</p>
                      <p>Current: {sensorData[substation.name].current.toFixed(2)} A</p>
                      <p>Power Factor: {sensorData[substation.name].powerFactor.toFixed(2)}</p>
                      <p>Frequency: {sensorData[substation.name].frequency.toFixed(2)} Hz</p>
                      <p>Last Updated: {new Date(sensorData[substation.name].lastUpdated).toLocaleString()}</p>
                    </>
                  ) : (
                    <p>No sensor data available for {substation.name}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </LeafletMap>
    </div>
  );
};

export default MapContainer;