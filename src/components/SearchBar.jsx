import React from 'react';
import { useProducts } from '../context/ProductContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
