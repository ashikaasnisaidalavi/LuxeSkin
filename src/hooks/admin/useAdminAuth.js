

import { useAuth } from "../useAuth";
import {
  getAdminByEmail,
  createAdminSession,
  deleteAdminSession,
} from "../../services/admin/adminService";

function useAdminAuth() {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  const login = async (email, password) => {
    const adminData = await getAdminByEmail(email);

    if (!adminData || adminData.password !== password) {
      throw new Error("Invalid email or password");
    }

    const { password: removedPassword, ...safeAdmin } = adminData;

    const sessionData = {
      adminId: adminData.id,
      role: "admin",
    };

    const createdSession = await createAdminSession(sessionData);

    sessionStorage.setItem("adminSessionId", createdSession.id);

    const adminSession = {
      ...safeAdmin,
      role: "admin",
    };

    signIn(adminSession);

    return adminSession;
  };

  const logout = async () => {
    const sessionId = sessionStorage.getItem("adminSessionId");

    if (sessionId) {
      await deleteAdminSession(sessionId);
      sessionStorage.removeItem("adminSessionId");
    }

    signOut();
  };

  const isAdminLoggedIn =
    isLoggedIn && user?.role === "admin";

  return {
    admin: isAdminLoggedIn ? user : null,
    isAdminLoggedIn,
    login,
    logout,
  };
}

export default useAdminAuth;

