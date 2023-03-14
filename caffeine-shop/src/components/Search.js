import React from 'react';
import '../styles/Search.scss'

function SearchBar() {
  return (
    <div>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        aria-label="Search"
      />
    </div>
  );
}

export default SearchBar;
