import React from 'react';
import { useProducts } from '../context/ProductContext';

const SortSelector = () => {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div className="sort-selector">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="name">Name (A-Z)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
};

export default SortSelector;
