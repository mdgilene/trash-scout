import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, Marker, Polyline, withGoogleMap, withScriptjs } from 'react-google-maps';

// Component logic and rendering
class MapComponent extends Component {
  render() {
    const { markers } = this.props;

    return (
      <GoogleMap defaultZoom={3} center={{ lat: 0, lng: 0 }}>
        {markers.map((marker, index) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            key={index}
            onClick={() => console.log(marker.lat, marker.lng)}
          />
        ))}
        <Polyline path={markers} geodesic />
      </GoogleMap>
    );
  }
}

// PropType validation
MapComponent.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })).isRequired
};

// Export
export default withScriptjs(withGoogleMap(MapComponent));
