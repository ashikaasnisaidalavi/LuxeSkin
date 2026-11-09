import { useDispatch, useSelector } from "react-redux";

import { login, logout } from "../redux/authSlice";

import {
  setCartUser,
  deactivateCart,
} from "../redux/cartSlice";

import {
  setWishlistUser,
} from "../redux/wishlistSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  function signIn(userData) {
    dispatch(login(userData));

    dispatch(setCartUser(userData.id));

    dispatch(setWishlistUser(userData.id));
  }

  function signOut() {
    dispatch(deactivateCart());

    dispatch(setWishlistUser(null));

    dispatch(logout());
  }

  return {
    user,
    isLoggedIn,
    signIn,
    signOut,
  };
}
