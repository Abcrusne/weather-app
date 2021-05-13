import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import { MapComponent } from '../Location/MapComponent';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 52,
      lng: 25,
      isMarkerShown: false,
      timestamp: '', // timestamp of when the last position was retrieved
      isGeolocationAvailable: '', // boolean flag indicating that the browser supports the Geolocation API
      isGeolocationEnabled: '', // boolean flag indicating that the user has allowed the use of the Geolocation API
      positionError: '', // oobject with the error returned from the Geolocation API call
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude });
      this.setState({ lng: position.coords.longitude });
      console.log('latitude: ' + this.state.lat);
      console.log('Longitude is :' + this.state.lng);
    });
    this.delayedShowMarker();
  }
  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        <MapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    ) : (
      <div>Getting the location... </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
{
}
