export function getWeatherColor(severity: number) {
  if (severity >= 0.8) return '#DC2626';
  if (severity >= 0.6) return '#F59E0B';
  if (severity >= 0.4) return '#FCD34D';
  return '#10B981';
}