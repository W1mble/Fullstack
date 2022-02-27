import React, { useState, useEffect  } from 'react'
import axios from 'axios'

const Filter = ({ filterName, handleFilterMapChange }) => {
  return (
    <>
      Find countries
      <input value={filterName} onChange={handleFilterMapChange} />
    </>
  )
}

const ErrorMessage = (
  <p>
    No results or over 10 results. Please try adding more letters or trying
    again.
  </p>
)

const Result = ({ results }) => {
  return (
    <>
      {results.map((country) => (
        <div key={country.cca3}>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {Object.keys(country.languages).map((language) => (
              <li key={language}>{country.languages[language]}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            style={{ height: "130px" }}
            alt="Country flag"
          />
        </div>
      ))}
    </>
  )
}

const OnetoTenResults = ({ results, setFilterName }) => {
  return (
    <>
      {results.map((country) => (
        <p key={country.cca3}>
          {" "}
          {country.name.common}{" "}
          {
            <button onClick={() => setFilterName(country.name.common)}>
              Show
            </button>
          }
        </p>
      ))}
    </>
  )
}

const FilterCountries = ({ countries, filterName, setFilterName }) => {
  let results = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterName.toLowerCase())
  )

  if (results.length > 1 && results.length < 11) {
    return (
      <>
        <OnetoTenResults results={results} setFilterName={setFilterName} />
      </>
    )
  } else if (results.length === 1) {
    return (
      <>
        <Result results={results}/>
      </>
    )
  } else {
    return ErrorMessage
  }
}

const SearchCountries = ({ countries, filterName, setFilterName }) => {
  if (filterName === "") {
    return <p>Search something</p>
  } else
    return (
      <>
        <FilterCountries
          countries={countries}
          filterName={filterName}
          setFilterName={setFilterName}
        />
      </>
    )
}

function App() {
  const [filterName, setFilterName] = useState("")
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleFilterMapChange = (event) => {

    setFilterName(event.target.value)
  }

  return (
    <>
      <Filter
        filterName={filterName}
        handleFilterMapChange={handleFilterMapChange}
      />
      <SearchCountries
        countries={countries}
        filterName={filterName}
        setFilterName={setFilterName}
      />
    </>
  )
}

export default App