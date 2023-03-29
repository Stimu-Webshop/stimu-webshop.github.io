import React from 'react';
import '../styles/Search.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const response = await axios.get(`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/search.php?q=${query}`);
        setResults(response.data);
      } else {
        setResults([]);
      }
    };
    fetchData();
  }, [query]);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleResultClick = (result) => {
    // Do something with the selected result
    console.log(result);
  
    // Clear the search query and results
    setQuery('');
    setResults([]);
  
  };

  return (
    <form>
      <input className="search-bar-input" type="text" placeholder="Search..." value={query} onChange={handleQueryChange} />
      <ul>
        {results.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result)} >
            <Link to={`/productpage/${result.id}`}>
              <img src={result.img} alt={result.name} />
              {result.name}
              <p>{result.name} eur</p>
            </Link>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SearchBar;
