
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice";
import cartReducer from "../redux/cartSlice";
import wishlistReducer from "../redux/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
