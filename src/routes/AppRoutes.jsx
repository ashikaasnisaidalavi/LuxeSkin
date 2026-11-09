
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import ProtectedRoute from "../components/ProtectedRoute";

// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ProductDetails from "../pages/ProductDetails";
// import Cart from "../pages/Cart";
// import Wishlist from "../pages/Wishlist";
// import Checkout from "../pages/Checkout";
// import Orders from "../pages/Orders";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/products/:productName"
//           element={<ProductDetails />}
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/wishlist"
//           element={
//             <ProtectedRoute>
//               <Wishlist />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute>
//               <Orders />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream">
//               <h2 className="text-2xl font-light">Page not found</h2>
//               <a
//                 href="/"
//                 className="mt-5 border border-luxe-brown px-6 py-3 text-sm"
//               >
//                 Back to Home
//               </a>
//             </div>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;



import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/products/:productName"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Protected User Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream">
              <h2 className="text-2xl font-light">
                Page not found
              </h2>

              <a
                href="/"
                className="mt-5 border border-luxe-brown px-6 py-3 text-sm"
              >
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;