import React, { Component } from 'react';

import { GoogleMap, Marker, Polyline, withGoogleMap, withScriptjs } from 'react-google-maps';

type Props = {
  markers: []
};

// Component logic and rendering
class MapComponent extends Component<Props> {
  props: Props;

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

// Export
export default withScriptjs(withGoogleMap(MapComponent));
