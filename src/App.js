// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null)
    
    axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: '6f9787938440438e8dd123408240902', // Replace with your API key
        q: city,
      },
    })
    .then(response => {
      setWeather(response.data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      alert('Failed to fetch weather data');
    });
  };

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading data…</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
  <div className="weather-cards">
    {/* <div className="weather-card"> */}
      <div className="weather-item">
        <div><strong>Temperature</strong></div><div> {weather.current.temp_c} °C</div>
      </div>
      <div className="weather-item">
        <div><strong>Humidity</strong></div><div> {weather.current.humidity} %</div>
      </div>
      <div className="weather-item">
        <div><strong>Condition:</strong></div><div> {weather.current.condition.text}</div>
      </div>
      <div className="weather-item">
        <div><strong>Wind Speed:</strong></div><div> {weather.current.wind_kph} kph</div>
      </div>
    {/* </div> */}
  </div>
)}

    </div>
  );
};

export default App;
