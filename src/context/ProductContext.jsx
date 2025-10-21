import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'name',
  currentPage: 1,
  itemsPerPage: 6
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload, filteredProducts: action.payload };
    case 'FETCH_PRODUCTS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    case 'FILTER_AND_SORT_PRODUCTS':
      return { ...state, filteredProducts: action.payload };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      console.log(data)
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...state.products];

    // Filter by search term
    if (state.searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    dispatch({ type: 'FILTER_AND_SORT_PRODUCTS', payload: filtered });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const setItemsPerPage = (itemsPerPage) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [state.products, state.searchTerm, state.sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedProducts = state.filteredProducts.slice(startIndex, endIndex);

  return (
    <ProductContext.Provider value={{ 
      ...state, 
      fetchProducts,
      setSearchTerm,
      setSortBy,
      setCurrentPage,
      setItemsPerPage,
      totalPages,
      startIndex,
      endIndex,
      paginatedProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
