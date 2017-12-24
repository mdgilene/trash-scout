import { connect } from 'react-redux';
import component from './App';

const INCREMENT = 'App/INCREMENT';

// Inital state of the component
const initialState = {
  counter: 0
}

// Actions recieve dispatch and getState
const actions = {
  increment: (amount) => ({
    type: INCREMENT,
    payload: amount
  })
};

// Action reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload
      };
    default:
      return state;
  }
};

// Map state to component props
const mapState = ({App}) => {
  return {
    counter: App.counter
  }
}

// Map actions to component props
const mapActions = (dispatch) => {
  return {
    increment: () => dispatch(actions.increment(5))
  }
}

// Connect state and actions to component
const App = connect(mapState, mapActions)(component);

export { App, actions, reducer }