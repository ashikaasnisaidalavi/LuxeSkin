import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../../pages/admin/AdminLogin";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminProducts from "../../pages/admin/AdminProducts";
import AdminUsers from "../../pages/admin/AdminUsers";
import AdminOrders from "../../pages/admin/AdminOrders";
import AdminOrderDetails from "../../pages/admin/AdminOrderDetails";
import AdminReviews from "../../pages/admin/AdminReviews";

import AdminProtectedRoute from "../../components/admin/AdminProtectedRoute";
import AdminLayout from "../../layouts/admin/AdminLayout";

function AdminRoutes() {
  return (
    <Routes>
      {/* Admin login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected admin pages */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>

          {/* Default admin page */}
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="orders/:orderId"
            element={<AdminOrderDetails />}
          />

          <Route
            path="reviews"
            element={<AdminReviews />}
          />

        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
