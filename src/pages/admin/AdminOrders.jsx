import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Search, Package } from "lucide-react";
import Button from "../../components/Button";

import { getOrders, updateOrder } from "../../services/orderService";
import { adminQueryKeys } from "../../app/admin/queryKeys";

function AdminOrders() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  const statuses = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: adminQueryKeys.orders.all,
    queryFn: getOrders,
  });

  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }) =>
      updateOrder(orderId, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.orders.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  // Search and filter
  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      String(order.id).toLowerCase().includes(search) ||
      order.customer?.fullName?.toLowerCase().includes(search) ||
      order.customer?.email?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const handleStatusChange = (orderId, status) => {
    statusMutation.mutate({ orderId, status });
  };

  const getStatusStyle = (status) => {
    const styles = {
      Placed: "bg-blue-100 text-blue-700",
      Processing: "bg-yellow-100 text-yellow-700",
      Shipped: "bg-purple-100 text-purple-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load orders. Please try again.
      </p>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-luxe-brown">
          Order Management
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View customer orders and manage their status.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {orders.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Placed Orders</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {orders.filter((order) => order.status === "Placed").length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {orders.filter((order) => order.status === "Delivered").length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
          <Search size={19} className="text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search order ID, customer or email..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="All">All Statuses</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {statusMutation.isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to update order status. Please try again.
        </p>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Update Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                  #{order.id}
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {order.customer?.fullName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {order.customer?.email}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                  ₹{order.total}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(order.id, event.target.value)
                    }
                    disabled={statusMutation.isPending}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none disabled:opacity-50"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
            <td className="px-5 py-4">
  <Button
    to={`/admin/orders/${order.id}`}
    className="rounded-lg px-4 py-2"
    style={{
      backgroundColor: "#5b3928",
      color: "#ffffff",
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    View Details
  </Button>
</td>
              </tr>
            ))}

            {currentOrders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  <Package className="mx-auto mb-2" size={24} />
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
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

export default AdminOrders;
