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
// import Profile from "../pages/Profile";

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

//         {/* Protected User Profile */}
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream">
//               <h2 className="text-2xl font-light">
//                 Page not found
//               </h2>

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





// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import ProtectedRoute from "../components/ProtectedRoute";

// import AdminRoutes from "./admin/AdminRoutes";

// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ProductDetails from "../pages/ProductDetails";
// import Cart from "../pages/Cart";
// import Wishlist from "../pages/Wishlist";
// import Checkout from "../pages/Checkout";
// import Orders from "../pages/Orders";
// import Profile from "../pages/Profile";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* Admin Routes */}
//         <Route path="/admin/*" element={<AdminRoutes />} />

//         {/* User Routes */}
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
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream">
//               <h2 className="text-2xl font-light">
//                 Page not found
//               </h2>

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




import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Customer components
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// Customer pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import ProductDetails from "../pages/ProductDetails";

// Admin routes
import AdminRoutes from "./admin/AdminRoutes";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}


// Customer layout
function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <ScrollToHash />
      <Routes>
        {/* Admin section - No customer navbar */}
        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

        {/* Customer section - With customer navbar */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
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

          <Route
            path="/products/:productName"
            element={<ProductDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
