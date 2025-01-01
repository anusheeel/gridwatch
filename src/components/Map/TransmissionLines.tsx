import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import { useTransmissionLines } from '../../hooks/useTransmissionLines';
import { getLineStyle } from './utils/lineStyles';

export function TransmissionLines() {
  const { data: transmissionLines = [] } = useTransmissionLines();

  return (
    <>
      {transmissionLines.map((line) => (
        <Polyline
          key={line.id}
          positions={line.coordinates}
          pathOptions={getLineStyle(line.load)}
        >
          <Tooltip permanent>
            <div className="text-xs">
              Load: {line.load}%
              <br />
              Capacity: {line.capacity} MW
            </div>
          </Tooltip>
        </Polyline>
      ))}
    </>
  );
}