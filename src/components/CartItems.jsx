import React from 'react';
import { useCart } from '../context/CartContext';
import { FaChevronUp, FaChevronDown, FaTrash } from 'react-icons/fa';

const CartItems = ({ onClose }) => {
  const { cartItems, total, removeItem, toggleAmount, clearCart } = useCart();

  return (
    <div className="cart-items">
      <div className="cart-items-header">
        <h3>Your Bag</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h4>is currently empty</h4>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <h5>${item.price}</h5>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="amount-btns">
                  <button 
                    className="amount-btn"
                    onClick={() => toggleAmount(item.id, 'inc')}
                  >
                    <FaChevronUp />
                  </button>
                  <p className="amount">{item.amount}</p>
                  <button 
                    className="amount-btn"
                    onClick={() => toggleAmount(item.id, 'dec')}
                  >
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-footer">
            <div className="cart-total">
              <h4>Total: <span>${total}</span></h4>
            </div>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
