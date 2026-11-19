import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Search,
  Users,
  ShieldCheck,
  ShieldBan,
} from "lucide-react";

import { getUsers, updateUser } from "../../services/userService";
import { adminQueryKeys } from "../../app/admin/queryKeys";

function AdminUsers() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const usersPerPage = 5;

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: adminQueryKeys.users.all,
    queryFn: getUsers,
  });

  // Block or unblock a user
  const statusMutation = useMutation({
    mutationFn: ({ userId, isBlocked }) =>
      updateUser(userId, { isBlocked }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.users.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // User counts
  const activeUsers = users.filter(
    (user) => !user.isBlocked
  );

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  );

  // Select users based on clicked card
  const statusFilteredUsers = users.filter((user) => {
    if (selectedStatus === "active") {
      return !user.isBlocked;
    }

    if (selectedStatus === "blocked") {
      return user.isBlocked;
    }

    return true;
  });

  // Search by name or email
  const filteredUsers = statusFilteredUsers.filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const startIndex = (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Change selected category
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // Block or unblock user
  const handleStatusChange = (user) => {
    const newBlockedStatus = !user.isBlocked;

    const action = newBlockedStatus ? "block" : "unblock";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${user.name}?`
    );

    if (!confirmed) return;

    statusMutation.mutate({
      userId: user.id,
      isBlocked: newBlockedStatus,
    });
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load users. Please try again.
      </p>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-luxe-brown">
          User Management
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View and manage registered customers.
        </p>
      </div>

      {/* User Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Users */}
        <button
          type="button"
          onClick={() => handleStatusFilter("all")}
          className={`rounded-xl border bg-white p-5 text-left transition hover:shadow-md ${
            selectedStatus === "all"
              ? "border-luxe-brown ring-1 ring-luxe-brown"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className="text-luxe-brown" size={22} />

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {users.length}
              </p>
            </div>
          </div>
        </button>

        {/* Active Users */}
        <button
          type="button"
          onClick={() => handleStatusFilter("active")}
          className={`rounded-xl border bg-white p-5 text-left transition hover:shadow-md ${
            selectedStatus === "active"
              ? "border-green-500 ring-1 ring-green-500"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" size={22} />

            <div>
              <p className="text-sm text-gray-500">
                Active Users
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {activeUsers.length}
              </p>
            </div>
          </div>
        </button>

        {/* Blocked Users */}
        <button
          type="button"
          onClick={() => handleStatusFilter("blocked")}
          className={`rounded-xl border bg-white p-5 text-left transition hover:shadow-md ${
            selectedStatus === "blocked"
              ? "border-red-500 ring-1 ring-red-500"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldBan className="text-red-500" size={22} />

            <div>
              <p className="text-sm text-gray-500">
                Blocked Users
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {blockedUsers.length}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Selected Category Heading */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-luxe-brown">
          {selectedStatus === "active"
            ? "Active Users"
            : selectedStatus === "blocked"
              ? "Blocked Users"
              : "All Users"}
        </h3>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Mutation Error */}
      {statusMutation.isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to update user status. Please try again.
        </p>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4 font-medium text-gray-800">
                  {user.name || "Unnamed User"}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => handleStatusChange(user)}
                    disabled={statusMutation.isPending}
                    className={`rounded-lg px-4 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.isBlocked
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {statusMutation.isPending
                      ? "Updating..."
                      : user.isBlocked
                        ? "Unblock"
                        : "Block"}
                  </button>
                </td>
              </tr>
            ))}

            {currentUsers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + usersPerPage,
              filteredUsers.length
            )}{" "}
            of {filteredUsers.length} users
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage >= totalPages}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
