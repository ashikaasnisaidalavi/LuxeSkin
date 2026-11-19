
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
store.subscribe(() => {
  const user = store.getState().auth.user;

  if (user) {
    sessionStorage.setItem("authUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("authUser");
  }
});
