const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map(c => (
        <li key={c.name.common}>{c.name.common}</li>
      ))}
    </ul>
  )
}

export default CountryList;