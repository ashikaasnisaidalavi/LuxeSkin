
// import { createSlice } from "@reduxjs/toolkit";

// const savedUser = JSON.parse(localStorage.getItem("user") || "null");

// const getCartKey = (userId) => `cartItems_${userId}`;

// const initialState = {
//   userId: savedUser?.id || null,
//   items: savedUser?.id
//     ? JSON.parse(localStorage.getItem(getCartKey(savedUser.id)) || "[]")
//     : [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     // Load the cart belonging to the logged-in user
//     setCartUser: (state, action) => {
//       state.userId = action.payload;

//       state.items = JSON.parse(
//         localStorage.getItem(getCartKey(action.payload)) || "[]"
//       );
//     },

//     // Hide the cart on logout without deleting saved products
//     deactivateCart: (state) => {
//       state.userId = null;
//       state.items = [];
//     },

//     addToCart: (state, action) => {
//       if (!state.userId) return;

//       const product = action.payload;

//       const existingItem = state.items.find(
//         (item) => item.id === product.id
//       );

//       if (existingItem) {
//         if (existingItem.quantity < product.stock) {
//           existingItem.quantity += 1;
//         }
//       } else if (product.stock > 0) {
//         state.items.push({
//           ...product,
//           quantity: 1,
//         });
//       }

//       localStorage.setItem(
//         getCartKey(state.userId),
//         JSON.stringify(state.items)
//       );
//     },

//     removeFromCart: (state, action) => {
//       if (!state.userId) return;

//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );

//       localStorage.setItem(
//         getCartKey(state.userId),
//         JSON.stringify(state.items)
//       );
//     },

//     updateQuantity: (state, action) => {
//       if (!state.userId) return;

//       const { id, quantity } = action.payload;

//       const item = state.items.find(
//         (item) => item.id === id
//       );

//       if (item && quantity >= 1 && quantity <= item.stock) {
//         item.quantity = quantity;
//       }

//       localStorage.setItem(
//         getCartKey(state.userId),
//         JSON.stringify(state.items)
//       );
//     },

//     clearCart: (state) => {
//       state.items = [];

//       if (state.userId) {
//         localStorage.setItem(
//           getCartKey(state.userId),
//           JSON.stringify([])
//         );
//       }
//     },
//   },
// });

// export const {
//   setCartUser,
//   deactivateCart,
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUserCart,
  saveUserCart,
} from "../services/cartService";

// Get the logged-in user from the existing authentication session
const savedUser = JSON.parse(
  localStorage.getItem("user") || "null"
);

const initialState = {
  userId: savedUser?.id || null,
  items: [],
  loading: false,
  error: null,
};

// Fetch the logged-in user's cart from JSON Server
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return [];

      const cart = await getUserCart(userId);

      return cart?.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { userId, items } = getState().cart;

      if (!userId) {
        return rejectWithValue("Please log in first.");
      }

      const existingItem = items.find(
        (item) => item.id === product.id
      );

      let updatedItems;

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return items;
        }
      } else if (product.stock > 0) {
        updatedItems = [
          ...items,
          { ...product, quantity: 1 },
        ];
      } else {
        return items;
      }

      await saveUserCart(userId, updatedItems);

      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { userId, items } = getState().cart;

      if (!userId) {
        return rejectWithValue("Please log in first.");
      }

      const updatedItems = items.filter(
        (item) => item.id !== productId
      );

      await saveUserCart(userId, updatedItems);

      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update the quantity of a cart product
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { userId, items } = getState().cart;

      if (!userId) {
        return rejectWithValue("Please log in first.");
      }

      const { id, quantity } = data;

      const item = items.find(
        (item) => item.id === id
      );

      let updatedItems = items;

      if (
        item &&
        quantity >= 1 &&
        quantity <= item.stock
      ) {
        updatedItems = items.map((item) =>
          item.id === id
            ? { ...item, quantity }
            : item
        );
      }

      await saveUserCart(userId, updatedItems);

      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear the user's cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userId } = getState().cart;

      if (!userId) return [];

      await saveUserCart(userId, []);

      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Hide cart items on logout without deleting server data
    deactivateCart: (state) => {
      state.userId = null;
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch user's cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.meta.arg;
        state.items = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add product
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Remove product
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Update quantity
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Clear cart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { deactivateCart } = cartSlice.actions;

export default cartSlice.reducer;
