import React from 'react';
import { useCart } from '../context/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="product">
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <button 
          className="btn add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
