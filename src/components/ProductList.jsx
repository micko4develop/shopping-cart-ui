import React from 'react';
import { useProducts } from '../context/ProductContext';
import Product from './Product';
import Loading from './Loading';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';
import Pagination from './Pagination';

const ProductList = () => {
  const { paginatedProducts, loading, error, filteredProducts } = useProducts();

  if (loading) return <Loading />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="products">
      <div className="products-filters">
        <SearchBar />
        <SortSelector />
      </div>
      
      <div className="products-container">
        {paginatedProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          paginatedProducts.map(product => (
            <Product key={product.id} product={product} />
          ))
        )}
      </div>
      
      <Pagination />
    </section>
  );
};

export default ProductList;
