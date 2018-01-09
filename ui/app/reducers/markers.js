import { LOAD_MARKERS, CLEAR_MARKERS } from '../actions/markers';

const initialState = [];

export default function markers(state = initialState, action) {
  switch (action.type) {
    case LOAD_MARKERS:
      return action.markers;
    case CLEAR_MARKERS:
      return [];
    default:
      return state;
  }
}
