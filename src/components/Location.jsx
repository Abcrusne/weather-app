import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import { GoogleMap, Marker } from "react-google-maps"

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: {
            latitude: "",
            longitude:"",
            altitude:"",
            heading: "",
            speed: ""
            },

    timestamp: "", // timestamp of when the last position was retrieved
    isGeolocationAvailable: "", // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled: "", // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError: "", // oobject with the error returned from the Geolocation API call
        }}
        componentDidMount(){
navigator.geolocation.getCurrentPosition(function(position){
    console.log("latitude: "+ position.coords.latitude);
    console.log("Longitude is :"+ position.coords.longitude);
})
        }
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
        <div>
      <table>
        <tbody>
          <tr>
            <td>latitude</td>
            <td>{this.props.coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td>{this.props.coords.longitude}</td>
          </tr>
          <tr>
            <td>altitude</td>
            <td>{this.props.coords.altitude}</td>
          </tr>
          <tr>
            <td>heading</td>
            <td>{this.props.coords.heading}</td>
          </tr>
          <tr>
            <td>speed</td>
            <td>{this.props.coords.speed}</td>
          </tr>
        </tbody>
      </table>

    <GoogleMap
     defaultZoom={8}
     defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />

      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
//   <div>
{
  /* <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </div> */
}
//     );
//   }
// }
