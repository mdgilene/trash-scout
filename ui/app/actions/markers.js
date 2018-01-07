export const LOAD_MARKERS = 'LOAD_MARKERS';
export const CLEAR_MARKERS = 'CLEAR_MARKER';

export function loadMarkers() {
  return {
    type: LOAD_MARKERS,
    payload: generateRandomMarkers(10)
  };
}

export function clearMarkers() {
  return {
    type: CLEAR_MARKERS
  };
}

function generateRandomMarkers(count) {
  const results = [];
  for (let i = 0; i < count; i += 1) {
    results.push({ lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 });
  }
  results.push({ lat: -90, lng: 0 });
  return results;
}
