import { LOAD_FLIGHTS, NEW_FLIGHT } from '../actions/flights';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FLIGHTS:
      return action.flights;
    case NEW_FLIGHT:
      return state;
    default:
      return state;
  }
};
