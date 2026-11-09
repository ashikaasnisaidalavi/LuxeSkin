import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Link } from "react-router-dom";

import {
  Package,
  ArrowLeft,
  XCircle,
} from "lucide-react";

import {
  getUserOrders,
  updateOrder,
} from "../services/orderService";

import { useAuth } from "../hooks/useAuth";

function Orders() {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.id],

    queryFn: () => getUserOrders(user.id),

    enabled: Boolean(user?.id),
  });

  const cancelMutation = useMutation({
    mutationFn: ({ orderId }) =>
      updateOrder(orderId, {
        status: "Cancelled",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", user?.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["userOrders", user?.id],
      });
    },
  });

  function handleCancelOrder(orderId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmed) {
      cancelMutation.mutate({ orderId });
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-luxe-cream">
        <p className="text-luxe-muted">
          Loading your orders...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-luxe-cream">
        <p className="text-red-500">
          Unable to load your orders.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-5 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Your Purchases
          </p>

          <h1 className="mt-3 text-3xl font-light text-luxe-brown">
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="border border-[#e2d8cc] bg-white px-6 py-16 text-center">
            <Package
              size={40}
              className="mx-auto text-luxe-gold"
            />

            <h2 className="mt-5 text-xl font-light text-luxe-brown">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-luxe-muted">
              Your order history will appear here.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block bg-luxe-brown px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-luxe-gold"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-[#e2d8cc] bg-white p-6 md:p-8"
              >

                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee5dc] pb-5">

                  <div>
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      Order ID
                    </p>

                    <p className="mt-1 text-sm text-luxe-brown">
                      #{order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      Order Date
                    </p>

                    <p className="mt-1 text-sm text-luxe-brown">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block text-xs ${
                        order.status === "Cancelled"
                          ? "text-[#b45f5f]"
                          : "text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                </div>

                {/* Ordered Products */}
                <div className="space-y-4 py-6">

                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-sm text-luxe-brown">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-luxe-muted">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm text-luxe-brown">
                        ₹{(
                          Number(item.price) * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>
                  ))}

                </div>

                {/* Delivery Details and Total */}
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#eee5dc] pt-5">

                  <div>
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      Delivery Details
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-luxe-brown">

                      <p>
                        {order.customer?.fullName}
                      </p>

                      <p>
                        {order.customer?.email}
                      </p>

                      <p>
                        {order.customer?.phone}
                      </p>

                      <p>
                        {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city} -{" "}
                        {order.shippingAddress?.pincode}
                      </p>

                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      Order Total
                    </p>

                    <p className="mt-2 text-xl font-light text-luxe-brown">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                {/* Cancel Order */}
                {order.status === "Placed" && (
                  <div className="mt-6 border-t border-[#eee5dc] pt-5">

                    <button
                      type="button"
                      onClick={() =>
                        handleCancelOrder(order.id)
                      }
                      disabled={cancelMutation.isPending}
                      className="inline-flex items-center gap-2 border border-[#c87979] bg-white px-5 py-2 text-xs uppercase tracking-[0.15em] text-[#b45f5f] transition-all duration-300 hover:bg-[#b45f5f] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      <XCircle size={15} />

                      {cancelMutation.isPending
                        ? "Cancelling..."
                        : "Cancel Order"}

                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Orders;
