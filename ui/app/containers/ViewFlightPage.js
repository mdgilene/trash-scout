import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapComponent from '../components/MapComponent';
import MarkerList from '../components/MarkerList';
import styles from './ViewFlightPage.css';

import * as MarkersActions from '../actions/markers';

class ViewFlightpage extends Component {
  render() {
    const { markers, loadMarkers, clearMarkers } = this.props;

    return (
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <MarkerList markers={markers} />
          <button onClick={loadMarkers}>Load Markers</button>
          <button onClick={clearMarkers}>Clear Markers</button>
        </div>
        <div className={styles.content}>
          <MapComponent
            markers={markers}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div className={styles.loadingElement} />}
            containerElement={<div className={styles.mapContainer} />}
            mapElement={<div className={styles.mapElement} />}
          />
        </div>
        <div className={styles['sidebar-large']} />
      </div>
    );
  }
}

// Prop Validation
ViewFlightpage.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })).isRequired,
  loadMarkers: PropTypes.func.isRequired,
  clearMarkers: PropTypes.func.isRequired
};

// Connect to state
function mapStateToProps(state) {
  return {
    markers: state.markers
  };
}

// Connect to actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MarkersActions, dispatch);
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ViewFlightpage);
