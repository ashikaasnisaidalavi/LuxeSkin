import { LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAdminAuth from "../../hooks/admin/useAdminAuth";
import Button from "../Button";

function AdminHeader() {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();


const handleLogout = async () => {
  await logout();
  navigate("/admin/login", { replace: true });
};

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">

      <div>
        <h2 className="text-xl font-semibold text-luxe-brown">
          Admin Panel
        </h2>
        <p className="text-sm text-gray-500">
          Manage your LuxeSkin store
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <ShieldCheck size={19} className="text-luxe-brown" />
          <span>{admin?.name || "Administrator"}</span>
        </div>

        <Button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium"
          style={{
            backgroundColor: "#6b4b3e",
            color: "#ffffff",
          }}
        >
          <LogOut size={14} />
          Logout
        </Button>

      </div>
    </header>
  );
}

export default AdminHeader;
