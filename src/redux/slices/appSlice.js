import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  cart: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingFavorite = state.favorites.find(item => item.id === action.payload.id);
      if (!existingFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    addToCart: (state, action) => {
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        state.cart = state.cart.filter(item => item.id !== itemId);
      } else {
        const item = state.cart.find(item => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
