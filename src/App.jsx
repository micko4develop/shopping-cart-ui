import React from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <ProductList />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;