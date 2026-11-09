
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { setWishlistUser } from "./redux/wishlistSlice";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(setWishlistUser(user?.id ?? null));
  }, [dispatch, user?.id]);

  return <AppRoutes />;
}

export default App;
