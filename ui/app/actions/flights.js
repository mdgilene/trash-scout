import axios from 'axios';

export const LOAD_FLIGHTS = 'LOAD_FLIGHTS';
export const NEW_FLIGHT = 'NEW_FLIGHT';

function loadFlightsAction(flights) {
  return {
    type: LOAD_FLIGHTS,
    flights
  };
}

function newFlightAction() {
  return {
    type: NEW_FLIGHT
  };
}

export function loadFlights() {
  return (dispatch) => {
    axios.get('http://localhost:3000/flights')
      .then(res => dispatch(loadFlightsAction(res.data)))
      .catch(err => {
        console.log(err);
        return [];
      });
  };
}

export function newFlight(flightName) {
  return (dispatch) => {
    axios.post('http://localhost:3000/flights', { name: flightName })
      .then(() => {
        dispatch(newFlightAction());
        return dispatch(loadFlights());
      })
      .catch(console.log);
  };
}
