import { connect } from 'react-redux';
import component from './App';

// Inital state of the component
const initialState = {

}

// Actions recieve dispatch and getState
const actions = {

};

// Action reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Map state to component props
const mapState = ({App}) => {
  return {

  }
}

// Map actions to component props
const mapActions = (dispatch) => {
  return {

  }
}

// Connect state and actions to component
const App = connect(mapState, mapActions)(component);

export { App, actions, reducer }