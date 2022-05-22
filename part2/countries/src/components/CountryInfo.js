import React from 'react'

 const CountryInfo = ({country}) => {
  return (
    <div>
     <h3>{country.name.common}</h3>
     <p>capital {country.capital}</p>
    </div>
  )
}

export default CountryInfo;