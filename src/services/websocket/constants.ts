export const UPDATE_TYPES = {
  SUBSTATION: 'substation_update',
  TRANSMISSION: 'transmission_update',
  WEATHER: 'weather_update',
} as const;

export const QUERY_KEYS = {
  SUBSTATIONS: ['substations'],
  TRANSMISSION_LINES: ['transmissionLines'],
  WEATHER_GRID: ['weatherGrid'],
} as const;