import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

import { getOrderById } from "../../services/orderService";
import { adminQueryKeys } from "../../app/admin/queryKeys";
import Button from "../../components/Button";

function AdminOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: adminQueryKeys.orders.detail(orderId),
    queryFn: () => getOrderById(orderId),
  });

  if (isLoading) {
    return <p className="text-gray-500">Loading order details...</p>;
  }

  if (isError || !order) {
    return (
      <div>
        <p className="mb-4 text-red-500">
          Failed to load order details.
        </p>

        <Button
          onClick={() => navigate("/admin/orders")}
          className="rounded-lg bg-luxe-brown px-4 py-2 text-sm text-white"
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-luxe-brown">
            Order Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Order ID: #{order.id}
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Button>
      </div>

      {/* Customer and Shipping Details */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-luxe-brown">
            Customer Information
          </h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium text-gray-700">Name: </span>
              {order.customer?.fullName}
            </p>

            <p>
              <span className="font-medium text-gray-700">Email: </span>
              {order.customer?.email}
            </p>

            <p>
              <span className="font-medium text-gray-700">Phone: </span>
              {order.customer?.phone}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-luxe-brown">
            Shipping Address
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}</p>
            <p>
              Pincode: {order.shippingAddress?.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-luxe-brown">
          Order Information
        </h3>

        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-gray-500">Order Date</p>
            <p className="mt-1 font-medium text-gray-800">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Order Status</p>
            <p className="mt-1 font-medium text-gray-800">
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="mt-1 font-semibold text-luxe-brown">
              ₹{order.total}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-5 text-lg font-semibold text-luxe-brown">
          Ordered Products
        </h3>

        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-4 last:border-0"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                  <Package className="text-gray-400" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-800">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-gray-800">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">₹{order.subtotal}</span>
          </div>

          <div className="flex justify-between text-base font-bold text-luxe-brown">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
