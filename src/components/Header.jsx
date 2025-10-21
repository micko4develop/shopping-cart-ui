import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartItems from './CartItems';

const Header = () => {
  const { amount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-center">
        <h1>Shopping Cart</h1>
        <div className="cart-btn-container">
          <button 
            className="cart-btn"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <FaShoppingCart />
            <span className="cart-value">{amount}</span>
          </button>
          {isCartOpen && <CartItems onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
