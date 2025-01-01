import React from 'react';
import { Rectangle } from 'react-leaflet';
import { useWeatherData } from '../../hooks/useWeatherData';
import { getWeatherColor } from './utils/weatherStyles';

export function WeatherOverlay() {
  const { data: weatherGrid = [] } = useWeatherData();

  return (
    <>
      {weatherGrid.map((cell) => (
        <Rectangle
          key={cell.id}
          bounds={cell.bounds}
          pathOptions={{
            color: getWeatherColor(cell.severity),
            fillOpacity: 0.3,
            weight: 0
          }}
        />
      ))}
    </>
  );
}