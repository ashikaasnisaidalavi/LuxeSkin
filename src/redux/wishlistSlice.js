import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  userId: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlistUser: (state, action) => {
      const userId = action.payload?.id ?? action.payload;

      state.userId = userId;

      if (userId) {
        const savedWishlist = localStorage.getItem(
          `wishlist_${userId}`
        );

        state.items = savedWishlist
          ? JSON.parse(savedWishlist)
          : [];
      } else {
        state.items = [];
      }
    },

    addToWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.id === product.id
      );

      if (!alreadyExists) {
        state.items.push(product);
      }

      if (state.userId) {
        localStorage.setItem(
          `wishlist_${state.userId}`,
          JSON.stringify(state.items)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      if (state.userId) {
        localStorage.setItem(
          `wishlist_${state.userId}`,
          JSON.stringify(state.items)
        );
      }
    },

    clearWishlist: (state) => {
      state.items = [];

      if (state.userId) {
        localStorage.setItem(
          `wishlist_${state.userId}`,
          JSON.stringify([])
        );
      }
    },
  },
});

export const {
  setWishlistUser,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
