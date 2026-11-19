



import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAdminSession,
  getAdminById,
} from "../../services/admin/adminService";

function AdminProtectedRoute() {
  const { isLoggedIn, user, signIn } = useAuth();

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      // A logged-in customer must not access admin pages
      if (isLoggedIn && user?.role !== "admin") {
        setStatus("not-admin");
        return;
      }

      const sessionId = sessionStorage.getItem("adminSessionId");

      if (!sessionId) {
        setStatus("unauthenticated");
        return;
      }

      try {
        // 1. Fetch the session from JSON Server
        const session = await getAdminSession(sessionId);

        if (session.role !== "admin") {
          throw new Error("Invalid admin session");
        }

        // 2. Fetch the admin account using the session's adminId
        const adminData = await getAdminById(session.adminId);

        if (!adminData) {
          throw new Error("Admin not found");
        }

        // 3. Remove password
        const { password, ...safeAdmin } = adminData;

        // 4. Restore admin information in Redux if needed
        if (
          !isLoggedIn ||
          user?.role !== "admin" ||
          String(user.id) !== String(adminData.id)
        ) {
          signIn({
            ...safeAdmin,
            role: "admin",
          });
        }

        if (!cancelled) {
          setStatus("authorized");
        }
      } catch {
        if (!cancelled) {
          setStatus("unauthenticated");
        }
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, user?.id, user?.role]);

  if (status === "checking") {
    return <p>Checking admin session...</p>;
  }

  if (status === "not-admin") {
    return <Navigate to="/" replace />;
  }

  if (status !== "authorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
