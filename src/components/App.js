import { useState, useEffect } from 'react';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading/Loading';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

//sutvarkyt pagal save kaipsuprantu, jei nera location error, i prieki rodo orus, user location on map
function App() {
  // State
  //response
  const [apiData, setApiData] = useState({});
  //location
  const [getState, setGetState] = useState('Vilnius');
  const [state, setState] = useState('Vilnius');
  const [error, setError] = useState({});

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getState}&appid=224bb361e3ad47d86e2a4dabad9fdb5d`;

  useEffect(() => {
    axios.get(apiUrl).then((res) => setApiData(res.data));
  });

  const handleChange = (event) => {
    event.preventDefault();
    // const { name, value } = event.target;
    // const letters = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ  -/./,/]+$/;

    // switch (name) {
    //   case 'name':
    //     error =
    //       !value.match(letters) || value.length < 2 || value.length === 0
    //         ? 'Location title unavailable! '
    //         : '';
    //     break;
    //   default:
    //     break;
    // }
    // setError(error);
    setGetState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // let valid = true;
    // if (error != '') {
    //   valid = false;
    // }
    // return
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
              Please enter location :
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={handleChange}
              value={getState}
            />
          </div>
          {/* <button type="submit" className="btn btn-primary mt-2">
            Enter
          </button> */}
        </form>

        <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; C
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i className="fas fa-temperature-low "></i>{' '}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{' '}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {' '}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      {' '}
                      {countries.getName(apiData.sys.country, 'en', {
                        select: 'official',
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}
export default App;
