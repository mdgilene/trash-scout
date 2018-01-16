// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import * as FlightsActions from '../actions/flights';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
}

function mapStateToProps(state) {
  return {
    flights: state.flights
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FlightsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
