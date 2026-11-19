// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   userId: null,
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,

//   reducers: {
//     setWishlistUser: (state, action) => {
//       const userId = action.payload?.id ?? action.payload;

//       state.userId = userId;

//       if (userId) {
//         const savedWishlist = localStorage.getItem(
//           `wishlist_${userId}`
//         );

//         state.items = savedWishlist
//           ? JSON.parse(savedWishlist)
//           : [];
//       } else {
//         state.items = [];
//       }
//     },

//     addToWishlist: (state, action) => {
//       const product = action.payload;

//       const alreadyExists = state.items.some(
//         (item) => item.id === product.id
//       );

//       if (!alreadyExists) {
//         state.items.push(product);
//       }

//       if (state.userId) {
//         localStorage.setItem(
//           `wishlist_${state.userId}`,
//           JSON.stringify(state.items)
//         );
//       }
//     },

//     removeFromWishlist: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );

//       if (state.userId) {
//         localStorage.setItem(
//           `wishlist_${state.userId}`,
//           JSON.stringify(state.items)
//         );
//       }
//     },

//     clearWishlist: (state) => {
//       state.items = [];

//       if (state.userId) {
//         localStorage.setItem(
//           `wishlist_${state.userId}`,
//           JSON.stringify([])
//         );
//       }
//     },
//   },
// });

// export const {
//   setWishlistUser,
//   addToWishlist,
//   removeFromWishlist,
//   clearWishlist,
// } = wishlistSlice.actions;

// export default wishlistSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUserWishlist,
  saveUserWishlist,
} from "../services/wishlistService";

// Initial state
const initialState = {
  items: [],
  userId: null,
  loading: false,
  error: null,
};

// Fetch the logged-in user's wishlist
export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return [];

      const wishlist = await getUserWishlist(userId);

      return wishlist?.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { userId, items } = getState().wishlist;

      if (!userId) {
        return rejectWithValue("Please log in first.");
      }

      const alreadyExists = items.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) return items;

      const updatedItems = [...items, product];

      await saveUserWishlist(userId, updatedItems);

      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { userId, items } = getState().wishlist;

      if (!userId) {
        return rejectWithValue("Please log in first.");
      }

      const updatedItems = items.filter(
        (item) => item.id !== productId
      );

      await saveUserWishlist(userId, updatedItems);

      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear wishlist
export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userId } = getState().wishlist;

      if (!userId) return [];

      await saveUserWishlist(userId, []);

      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    // Hide wishlist on logout without deleting server data
    deactivateWishlist: (state) => {
      state.items = [];
      state.userId = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.meta.arg;
        state.items = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add product
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Remove product
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Clear wishlist
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { deactivateWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
