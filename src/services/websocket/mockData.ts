import { WebSocketMessage } from './types';
import { Substation } from '../../types/monitoring';

const mockSubstations: Substation[] = [
  {
    id: '1',
    name: 'North Station',
    location: { lat: 51.505, lng: -0.09 },
    status: 'operational',
    voltage: 132,
    current: 1000,
    powerFactor: 0.95,
    frequency: 50,
    transformerLoad: 75,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'South Station',
    location: { lat: 51.499, lng: -0.1 },
    status: 'warning',
    voltage: 132,
    current: 1200,
    powerFactor: 0.92,
    frequency: 49.9,
    transformerLoad: 85,
    lastUpdated: new Date().toISOString()
  }
];

export function generateMockUpdate(): WebSocketMessage {
  const station = { ...mockSubstations[Math.floor(Math.random() * mockSubstations.length)] };
  
  // Simulate random changes
  station.voltage += (Math.random() - 0.5) * 2;
  station.transformerLoad += (Math.random() - 0.5) * 5;
  station.frequency += (Math.random() - 0.5) * 0.1;
  station.lastUpdated = new Date().toISOString();

  return {
    type: 'substation_update',
    payload: station,
    timestamp: new Date().toISOString()
  };
}