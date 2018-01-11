// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapComponent from '../components/MapComponent';
import MarkerList from '../components/MarkerList';
import styles from './ViewFlightPage.css';

import * as MarkersActions from '../actions/markers';

type Props = {
  markers: [],
  loadMarkersFromDatabase: (name: string) => void,
  clearMarkers: () => void,
  addMarker: () => void
};

class ViewFlightpage extends Component<Props> {
  props: Props;

  render() {
    const {
      markers,
      loadMarkersFromDatabase,
      clearMarkers,
      addMarker
    } = this.props;

    return (
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <MarkerList markers={markers} />
          <button onClick={addMarker}>Add Marker</button>
          <button onClick={() => loadMarkersFromDatabase('Flight-0')}>Load Markers</button>
          <button onClick={() => clearMarkers()}>Clear Markers</button>
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