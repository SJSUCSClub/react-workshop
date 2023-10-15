import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
    console.log(data)
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase())
    })
    setData(filteredData);
  }

  return (
    <div>
      <input
        value={search}
        type="text"
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {data.map((country, index) => (
        <div key={index}>
          <h2>{country.name.common}</h2>
          <p>{country.capital}</p>
          <img src={country.flags.png} alt={country.name.common} />
        </div>
      ))}
    </div>
  );
}

export default App;