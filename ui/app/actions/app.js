import axios from 'axios';

export const LOAD_FLIGHT = 'LOAD_FLIGHT';
export const UNLOAD_FLIGHT = 'UNLOAD_FLIGHT';

function loadFlightAction(flight) {
  return {
    type: LOAD_FLIGHT,
    flight
  };
}

export function unloadLoadedFlight() {
  return {
    type: UNLOAD_FLIGHT
  };
}

export function loadFlight(name) {
  return (dispatch) => {
    axios.get(`http://localhost:3000/flights/${name}`)
      .then(res => dispatch(loadFlightAction(res.data)))
      .catch(console.log);
  };
}
