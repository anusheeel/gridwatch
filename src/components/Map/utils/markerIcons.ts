import L from 'leaflet';

const iconColors = {
  operational: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
  maintenance: '#6B7280'
};

export function getMarkerIcon(status: string) {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${iconColors[status]};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 2px ${iconColors[status]};
      "></div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
}