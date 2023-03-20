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

/* import React from 'react';
import '../styles/Search.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php?q=${query}`
    axios.get(PHP)
    .then(response => {
      const results = response.data
      console.log(results)
      setResults(results)
     })
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setSelectedItem(null); // Reset selected item when the search query changes
  };

  const filteredResults = query ? results.filter(result => result.name.toLowerCase().includes(query.toLowerCase())) : [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  return (
    <div>
      <form>
          <input className="search-bar-input" type="text" placeholder="Search..." value={query} onChange={handleQueryChange} />
        <ul>
          {filteredResults.map((result) => (
            <li key={result.id} onClick={() => handleItemClick(result)}>{result.name}</li>
          ))}
        </ul>
      </form>
      {selectedItem && (
        <div>
          <h2>{selectedItem.name}</h2>
          <p>{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar; */
