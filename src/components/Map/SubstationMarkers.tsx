import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useSubstations } from '../../hooks/useSubstations';
import { getMarkerIcon } from './utils/markerIcons';

export function SubstationMarkers() {
  const { data: substations = [] } = useSubstations();

  return (
    <>
      {substations.map((substation) => (
        <Marker
          key={substation.id}
          position={[substation.location.lat, substation.location.lng]}
          icon={getMarkerIcon(substation.status)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{substation.name}</h3>
              <div className="text-sm mt-2">
                <p>Voltage: {substation.voltage} kV</p>
                <p>Load: {substation.transformerLoad}%</p>
                <p>Status: {substation.status}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}