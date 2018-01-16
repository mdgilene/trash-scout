// @flow
import axios from 'axios';

export const LOAD_FLIGHTS = 'LOAD_FLIGHTS';
export const NEW_FLIGHT = 'NEW_FLIGHT';

export type FlightParams = {
  name: string,
  imageDensity: number
};

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

export function newFlight(flightParams: FlightParams) {
  return (dispatch) => {
    axios.post('http://localhost:3000/flights', { ...flightParams })
      .then(() => {
        dispatch(newFlightAction());
        return dispatch(loadFlights());
      })
      .catch(console.log);
  };
}
