import axios from 'axios';

export const LOAD_MARKERS = 'LOAD_MARKERS';
export const CLEAR_MARKERS = 'CLEAR_MARKER';

let markerid = 0;

function loadMarkersAction(markers) {
  return {
    type: LOAD_MARKERS,
    markers
  };
}

export function loadMarkersFromDatabase(flightName) {
  return (dispatch) => {
    axios.get('http://localhost:3000/flights', { params: { name: flightName } })
      .then(res => dispatch(loadMarkersAction(res.data.markers)))
      .catch(console.log);
  };
}

export function addMarker() {
  return (dispatch) => {
    axios.post('http://localhost:3000/flights/Flight-0/markers', [{ lat: 0, lng: 0, id: markerid++}])
      .then(() => dispatch(loadMarkersFromDatabase('Flight-0')))
      .catch(console.log);
  };
}
