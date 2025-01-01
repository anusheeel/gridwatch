import { useQuery } from '@tanstack/react-query';

interface WeatherCell {
  id: string;
  bounds: [[number, number], [number, number]];
  severity: number;
}

const mockWeatherGrid: WeatherCell[] = [
  {
    id: '1',
    bounds: [[51.51, -0.1], [51.5, -0.08]],
    severity: 0.7
  }
];

export function useWeatherData() {
  return useQuery({
    queryKey: ['weatherGrid'],
    queryFn: async () => mockWeatherGrid,
    staleTime: 60000
  });
}