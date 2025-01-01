import { useQuery } from '@tanstack/react-query';

interface TransmissionLine {
  id: string;
  coordinates: [number, number][];
  load: number;
  capacity: number;
}

const mockTransmissionLines: TransmissionLine[] = [
  {
    id: '1',
    coordinates: [
      [51.505, -0.09],
      [51.499, -0.1]
    ],
    load: 85,
    capacity: 1000
  }
];

export function useTransmissionLines() {
  return useQuery({
    queryKey: ['transmissionLines'],
    queryFn: async () => mockTransmissionLines,
    staleTime: 30000
  });
}