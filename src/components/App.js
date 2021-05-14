//for forecast openWeatherMap api key is not free
// for detectin user location and show his weather - other url with lat and lng
import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import axios from 'axios';
import Loading from './Loading/Loading';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  //response
  const [apiData, setApiData] = useState({});
  //location
  const [getState, setGetState] = useState('Vilnius');
  const [state, setState] = useState('Vilnius');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getState}&appid=224bb361e3ad47d86e2a4dabad9fdb5d`;

  useEffect(() => {
    axios.get(apiUrl).then((res) => setApiData(res.data));
  });

  const handleChange = (event) => {
    event.preventDefault();

    setGetState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState(getState);
  };
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(1);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2> Weather App</h2>
      </header>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="mt-3 d-flex flex-column justify-content-center align-items-center"
        >
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Please enter location:
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control mb-2"
              onChange={handleChange}
              value={getState}
            />
          </div>
        </form>

        <div>
          <table className="table mt-1 mb-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Temperature</th>
                <th scope="col">City</th>
                <th scope="col">The lowest temperature</th>
                <th scope="col">The highest temperature</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            {apiData.main ? (
              <tbody>
                <tr>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                      alt="weather status icon"
                      className="weather-icon"
                    />
                  </td>
                  <td>{kelvinToFarenheit(apiData.main.temp)}&deg; C</td>
                  <td>{apiData.name}</td>
                  <td> {kelvinToFarenheit(apiData.main.temp_min)}&deg; C</td>
                  <td> {kelvinToFarenheit(apiData.main.temp_max)}&deg; C</td>
                  <td>{apiData.weather[0].main}</td>
                  <td>
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official',
                    })}
                  </td>
                </tr>
              </tbody>
            ) : (
              <Loading />
            )}
          </table>
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}
export default App;
