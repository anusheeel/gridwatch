export function getLineStyle(load: number) {
  const getColor = (load: number) => {
    if (load >= 90) return '#EF4444';
    if (load >= 75) return '#F59E0B';
    return '#10B981';
  };

  return {
    color: getColor(load),
    weight: 3,
    opacity: 0.8
  };
}