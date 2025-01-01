import { WebSocketMessage } from './types';
import { QUERY_KEYS } from './constants';

export function getQueryKeyForMessageType(message: WebSocketMessage) {
  switch (message.type) {
    case 'substation_update':
      return QUERY_KEYS.SUBSTATIONS;
    case 'transmission_update':
      return QUERY_KEYS.TRANSMISSION_LINES;
    case 'weather_update':
      return QUERY_KEYS.WEATHER_GRID;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
}