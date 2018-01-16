import { LOAD_FLIGHT, UNLOAD_FLIGHT } from '../actions/app';

const initialState = {
  loadedFlight: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FLIGHT:
      return { ...state, loadedFlight: action.flight };
    case UNLOAD_FLIGHT:
      return { ...state, loadedFlight: {} };
    default:
      return state;
  }
};
