import React from 'react';
import '../styles/Search.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <form>
        <input className="search-bar-input" type="text" placeholder="Search..." value={query} onChange={handleQueryChange} />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </form>
  );
}

export default SearchBar;
