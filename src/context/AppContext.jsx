import React, { createContext, useContext, useReducer } from 'react';
import { appReducer } from '../reducer/appReducer';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const initialState = {
  theme: 'light',
  favorites: [],
  cart: [],
  user: {
    name: 'Arushi',
    email: '23bai70126@cuchd.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const addToFavorites = (item) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  const removeFromFavorites = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: itemId });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,
    toggleTheme,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
