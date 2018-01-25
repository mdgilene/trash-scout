import React, { Component } from 'react';

import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon, Rectangle } from 'react-google-maps';

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
      markers: [],
      mode: 'poly'
    };

    this.placeMarker = this.placeMarker.bind(this);
    this.getRect = this.getRect.bind(this);
  }

  placeMarker(event) {
    const { markerCounter, markers, mode } = this.state;
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    const newMarkers = markers.slice();
    newMarkers[markerCounter] = newMarker;
    let newMarkerCounter;
    if (mode === 'poly') {
      newMarkerCounter = markerCounter < 3 ? markerCounter + 1 : 0;
    }
    if (mode === 'rect') {
      newMarkerCounter = markerCounter < 1 ? markerCounter + 1 : 0;
    }
    this.setState({ markers: newMarkers, markerCounter: newMarkerCounter });
  }

  getRect() {
    const { markers } = this.state;
    const north = Math.max(markers[0].lat, markers[1].lat);
    const south = Math.min(markers[0].lat, markers[1].lat);
    const east = Math.max(markers[0].lng, markers[1].lng);
    const west = Math.min(markers[0].lng, markers[1].lng);
    return (
      <Rectangle
        onClick={this.placeMarker}
        bounds={{
          north,
          south,
          east,
          west
        }}
      />);
  }

  render() {
    const { center, zoom } = this.props;
    const { markers, mode } = this.state;

    return (
      <GoogleMap
        defaultZoom={zoom || 4}
        center={center}
        onClick={this.placeMarker}
        defaultMapTypeId="satellite"
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
        {mode === 'rect' && markers.length >= 2 && this.getRect()}
        {mode === 'poly' && markers.length === 4 && <Polygon paths={markers} onClick={this.placeMarker} />}
      </GoogleMap>
    );
  }
}

// Export
export default withScriptjs(withGoogleMap(DynamicMap));
