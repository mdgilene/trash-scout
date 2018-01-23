import React, { Component } from 'react';

import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon } from 'react-google-maps';

type Props = {
  center: {},
  zoom: number
};

// Component logic and rendering
class DynamicMap extends Component<Props> {
  props: Props;

  constructor() {
    super();

    this.state = {
      markerCounter: 0,
      markers: []
    };

    this.placeMarker = this.placeMarker.bind(this);
  }

  placeMarker(event) {
    const { markerCounter, markers } = this.state;
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    const newMarkers = markers.slice();
    newMarkers[markerCounter] = newMarker;
    const newMarkerCounter = markerCounter < 3 ? markerCounter + 1 : 0;
    this.setState({ markers: newMarkers, markerCounter: newMarkerCounter });
  }

  render() {
    const { center, zoom } = this.props;
    const { markers } = this.state;

    return (
      <GoogleMap defaultZoom={zoom || 4} center={center} onClick={this.placeMarker}>
        {markers.map((marker, index) => <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />)}
        {markers.length === 4 && <Polygon paths={markers} onClick={this.placeMarker} />}
      </GoogleMap>
    );
  }
}

// Export
export default withScriptjs(withGoogleMap(DynamicMap));
