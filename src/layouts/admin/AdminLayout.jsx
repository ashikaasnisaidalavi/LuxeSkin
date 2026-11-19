// import { Outlet } from "react-router-dom";

// import AdminSidebar from "../../components/admin/AdminSidebar";
// import AdminHeader from "../../components/admin/AdminHeader";

// function AdminLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Fixed Sidebar */}
//       <div className="fixed left-0 top-0 z-50 h-screen w-64">
//         <AdminSidebar />
//       </div>

//       {/* Main Section */}
//       <div className="ml-64 flex h-screen flex-col">

//         {/* Fixed Header */}
//         <div className="sticky top-0 z-40 shrink-0">
//           <AdminHeader />
//         </div>

//         {/* Scrollable Page Content */}
//         <main className="flex-1 overflow-y-auto p-8">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }

// export default AdminLayout;




import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Menu Button */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow md:hidden">
        <h1 className="text-lg font-bold text-luxe-brown">
          LuxeSkin Admin
        </h1>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg p-2 text-luxe-brown hover:bg-gray-100"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onNavigate={closeSidebar} />
      </div>

      {/* Main Section */}
      <div className="flex h-screen flex-col md:ml-64">

        {/* Header */}
        <div className="sticky top-0 z-30 mt-14 shrink-0 md:mt-0">
          <AdminHeader />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;
