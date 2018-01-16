export const OPEN_FLIGHT = 'OPEN_FLIGHT';

export function openFlight(name) {
  return {
    type: OPEN_FLIGHT,
    name
  };
}
