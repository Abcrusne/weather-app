import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

export const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
    <div>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lng }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.lat, lng: props.lng }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
  <i> Rusne Petrauskaite</i>
  </div>
));
