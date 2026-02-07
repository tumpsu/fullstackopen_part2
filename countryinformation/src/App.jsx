import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import Notification from './components/Notification';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 5000);
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(data => {
        setCountries(data);
        showNotification('Country data loaded successfully', 'success');
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        showNotification('Failed to load country data', 'error');
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Country Finder</h1>

      <Notification message={notification} />

      <Filter value={filter} onChange={handleFilterChange} />

      {filter === '' ? (
        <p>Type a country name</p>
      ) : filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        <CountryList countries={filtered} />
      ) : filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <p>No matches</p>
      )}
    </div>
  );
}

export default App;