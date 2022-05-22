import {useEffect, useState} from 'react'
import axios from 'axios';

import TooManyMatches from './components/TooMany';
import Search from './components/Search'
import CountryInfo from './components/CountryInfo';

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }
  const filterCountries = countries.filter(country => {
    return country.name.common.toLocaleLowerCase().includes(filter)
  })

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  return (
    <div className="App">
    <Search filter={filter} handleFilterChange={handleFilterChange}/>
      {filterCountries.length === 1 ? filterCountries.map(country => {
        return <CountryInfo country={country} key={country.name.common} />
      }) : filterCountries.length < 10 ? 
        filterCountries.map(country => {
        return <CountryName key={country.name.common} country={country} />
      }) : <TooManyMatches/>}
    </div>
  );
}

const CountryName = ({country, setShowInfo}) => {

  return(
    <>
      <p>{country.name.common}</p>
      <button onClick={() => setShowInfo(true)}>showInfo</button>
    </>
  )
}

export default App;
