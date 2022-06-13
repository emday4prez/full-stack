import React from 'react'

const CountryInfo = ({country}) => {
  const languages = country.languages
  const arrayOfLanguages = Object.keys(languages).map(key => languages[key])
  const flagImages = country.flags
  const imageSrcArray = Object.keys(flagImages).map(key => flagImages[key])
  console.log(languages)
  return (
    <div>
      <h3>{`${country.name.common } ${country.flag}`}</h3>
      <p>capital: {country.capital}
      <br/>
      area: {country.area}
      </p>
      <h3>languages</h3>
      <ul>
        {arrayOfLanguages.map(language => {
        return <li key={language}>{language}</li>
      })}
      </ul>
      <div>
        <img src={imageSrcArray[0]} alt={`flag of ${country.name.common}`} />
      </div>
    </div>
  )
}

export default CountryInfo;