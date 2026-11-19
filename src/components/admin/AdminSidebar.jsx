
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   ShoppingBag,
//   Star,
//   LogOut,
// } from "lucide-react";

// import useAdminAuth from "../../hooks/admin/useAdminAuth";
// import Button from "../Button";

// function AdminSidebar() {
//   const navigate = useNavigate();
//   const { logout } = useAdminAuth();

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/admin/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Products",
//       path: "/admin/products",
//       icon: Package,
//     },
//     {
//       name: "Users",
//       path: "/admin/users",
//       icon: Users,
//     },
//     {
//       name: "Orders",
//       path: "/admin/orders",
//       icon: ShoppingBag,
//     },
//     {
//       name: "Reviews",
//       path: "/admin/reviews",
//       icon: Star,
//     },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate("/admin/login");
//   };

//   return (
//     <aside className="flex min-h-screen w-64 flex-col bg-luxe-brown text-white">
//       <div className="border-b border-white/20 px-6 py-6">
//         <h1 className="text-2xl font-bold">LuxeSkin</h1>
//         <p className="mt-1 text-sm text-white/60">
//           Admin Panel
//         </p>
//       </div>

//       <nav className="flex-1 space-y-2 px-4 py-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.name}
//               to={item.path}
//             //   className={({ isActive }) =>
//             //     `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
//             //       isActive
//             //         ? "bg-white text-luxe-brown font-semibold"
//             //         : "text-white/80 hover:bg-white/10"
//             //     }`
//             //   }
//             className={({ isActive }) =>
//   `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-none ${
//     isActive
//       ? "bg-white !text-black font-bold"
//       : "text-white/80"
//   }`
// }
//             >
//               <Icon size={19} />
//               {item.name}
//             </NavLink>
//           );
//         })}
//       </nav>

//       <div className="border-t border-white/20 p-4">
//         {/* <button
//           onClick={handleLogout}
//           className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
//         >
//           <LogOut size={19} />
//           Logout
//         </button> */}
        
//       </div>
//     </aside>
//   );
// }

// export default AdminSidebar;








import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Star,
} from "lucide-react";

import useAdminAuth from "../../hooks/admin/useAdminAuth";

function AdminSidebar({ onNavigate }) {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
    onNavigate?.();
  };

  return (
    <aside className="flex h-full min-h-screen w-64 flex-col bg-luxe-brown text-white">
      <div className="border-b border-white/20 px-6 py-6">
        <h1 className="text-2xl font-bold">LuxeSkin</h1>
        <p className="mt-1 text-sm text-white/60">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-none ${
                  isActive
                    ? "bg-white !text-black font-bold"
                    : "text-white/80"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/20 p-4">
        {/* Logout button can be added here later if needed */}
      </div>
    </aside>
  );
}

export default AdminSidebar;
