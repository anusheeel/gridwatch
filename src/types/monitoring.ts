export interface Substation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  voltage: number;
  current: number;
  powerFactor: number;
  frequency: number;
  transformerLoad: number;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  substation?: string;
  acknowledged: boolean;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  alerts: string[];
}
export interface WebSocketConfig {
  WS_URL: string;
  MAX_RETRIES: number;
  RETRY_INTERVAL: number;
}