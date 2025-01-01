export type WebSocketMessage = {
  type: 'substation_update' | 'transmission_update' | 'weather_update';
  payload: any;
  timestamp: string;
}

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';