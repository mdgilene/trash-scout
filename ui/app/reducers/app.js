import { LOAD_FLIGHT, UNLOAD_FLIGHT, SET_DEVICE_LOCATION } from '../actions/app';

const initialState = {
  loadedFlight: {},
  deviceLocation: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FLIGHT:
      return { ...state, loadedFlight: action.flight };
    case UNLOAD_FLIGHT:
      return { ...state, loadedFlight: {} };
    case SET_DEVICE_LOCATION:
      return { ...state, deviceLocation: action.deviceLocation };
    default:
      return state;
  }
};
