import { useState, useEffect } from 'react'; 
import weatherService from '../services/weather';
import Notification from './Notification';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (text, type) => { 
    setNotification({ text, type }); 
    setTimeout(() => setNotification(null), 5000); 
  }

  useEffect(() => { 
    const city = country.capital[0];
    weatherService 
      .getWeather(city) 
      .then(data => {
        setWeather(data);
        showNotification(`Weather loaded for ${city}`, 'success');
    }
    ) 
    .catch(err => { 
        console.error('Weather fetch failed:', err);
        showNotification(`Failed to load weather for ${city}`, 'error');
      });
  }, [country]);
  return (
    <div>
      <Notification message={notification} />
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    <h3>Weather in {country.capital}</h3> 
    {weather ? 
      ( <div> 
          <p>temperature: {weather.main.temp} °C</p> 
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /> <
            p>wind: {weather.wind.speed} m/s</p> </div> ) 
            : 
            ( <p>Loading weather...</p> )} </div> 
    ); 
}

export default CountryDetails;