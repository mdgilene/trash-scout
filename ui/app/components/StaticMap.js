import React, { Component } from 'react';

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

type Props = {
  markers: [],
  center: {},
  zoom: number
};

// Component logic and rendering
class StaticMap extends Component<Props> {
  props: Props;

  render() {
    const { markers, center, zoom } = this.props;

    return (
      <GoogleMap defaultZoom={zoom || 4} center={center} defaultMapTypeId="satellite">
        {markers.map((marker, index) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            key={index}
            onClick={() => console.log(marker.lat, marker.lng)}
          />
        ))}
      </GoogleMap>
    );
  }
}

// Export
export default withScriptjs(withGoogleMap(StaticMap));
