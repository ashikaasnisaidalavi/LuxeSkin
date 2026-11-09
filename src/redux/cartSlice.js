
import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user") || "null");

const getCartKey = (userId) => `cartItems_${userId}`;

const initialState = {
  userId: savedUser?.id || null,
  items: savedUser?.id
    ? JSON.parse(localStorage.getItem(getCartKey(savedUser.id)) || "[]")
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Load the cart belonging to the logged-in user
    setCartUser: (state, action) => {
      state.userId = action.payload;

      state.items = JSON.parse(
        localStorage.getItem(getCartKey(action.payload)) || "[]"
      );
    },

    // Hide the cart on logout without deleting saved products
    deactivateCart: (state) => {
      state.userId = null;
      state.items = [];
    },

    addToCart: (state, action) => {
      if (!state.userId) return;

      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
        }
      } else if (product.stock > 0) {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      if (!state.userId) return;

      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items)
      );
    },

    updateQuantity: (state, action) => {
      if (!state.userId) return;

      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item && quantity >= 1 && quantity <= item.stock) {
        item.quantity = quantity;
      }

      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      if (state.userId) {
        localStorage.setItem(
          getCartKey(state.userId),
          JSON.stringify([])
        );
      }
    },
  },
});

export const {
  setCartUser,
  deactivateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
