import React from 'react';
import { LayersControl, ScaleControl } from 'react-leaflet';
import { WeatherOverlay } from './WeatherOverlay';
import { TransmissionLines } from './TransmissionLines';

export function MapControls() {
  return (
    <>
      <LayersControl position="topright">
        <LayersControl.Overlay name="Weather">
          <WeatherOverlay />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Transmission Lines" checked>
          <TransmissionLines />
        </LayersControl.Overlay>
      </LayersControl>
      <ScaleControl position="bottomleft" />
    </>
  );
}