import { OPEN_FLIGHT } from '../actions/app';

const initialState = {
  openFlight: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FLIGHT:
      return { ...state, openFlight: action.name };
    default:
      return state;
  }
};
