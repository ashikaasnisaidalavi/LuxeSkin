import { useState, useEffect } from "react";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  createOrder,
  getUserOrders,
} from "../services/orderService";

import { clearCart } from "../redux/cartSlice";
import { useAuth } from "../hooks/useAuth";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const items = useSelector((state) => state.cart.items);

  // Get Buy Now product from ProductDetails page
  const buyNowProduct = location.state?.buyNowProduct;
  const buyNowQuantity = location.state?.buyNowQuantity || 1;

  // Decide which products should be checked out
  const checkoutItems = buyNowProduct
    ? [
        {
          ...buyNowProduct,
          quantity: buyNowQuantity,
        },
      ]
    : items;

  const isBuyNow = Boolean(buyNowProduct);

  // Fetch previous orders belonging to this user
  const {
    data: previousOrders = [],
  } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => getUserOrders(user.id),
    enabled: Boolean(user?.id),
  });

  const [form, setForm] = useState({
    fullName: user?.name || user?.fullName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Prefill checkout using the latest previous order
  useEffect(() => {
    if (!user) return;

    // Find the latest order
    const latestOrder = [...previousOrders].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    setForm({
      fullName:
        latestOrder?.customer?.fullName ||
        user.name ||
        user.fullName ||
        "",

      email:
        latestOrder?.customer?.email ||
        user.email ||
        "",

      phone:
        latestOrder?.customer?.phone || "",

      address:
        latestOrder?.shippingAddress?.address || "",

      city:
        latestOrder?.shippingAddress?.city || "",

      pincode:
        latestOrder?.shippingAddress?.pincode || "",
    });
  }, [previousOrders, user]);

  const subtotal = checkoutItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const orderMutation = useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      // Clear cart only for normal checkout
      if (!isBuyNow) {
        dispatch(clearCart());
      }

      navigate("/orders", { replace: true });
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;

    // Allow only 10 digits in phone number
    if (name === "phone") {
      const numbersOnly = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setForm((previous) => ({
        ...previous,
        phone: numbersOnly,
      }));

      return;
    }

    // Allow only 6 digits in PIN code
    if (name === "pincode") {
      const numbersOnly = value
        .replace(/\D/g, "")
        .slice(0, 6);

      setForm((previous) => ({
        ...previous,
        pincode: numbersOnly,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (checkoutItems.length === 0) return;

    // Validate phone number
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return;
    }

    // Validate PIN code
    if (!/^[0-9]{6}$/.test(form.pincode)) {
      return;
    }

    const order = {
      userId: user.id,

      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },

      shippingAddress: {
        address: form.address,
        city: form.city,
        pincode: form.pincode,
      },

      items: checkoutItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),

      subtotal,
      total: subtotal,

      status: "Placed",

      createdAt: new Date().toISOString(),
    };

    orderMutation.mutate(order);
  }

  if (checkoutItems.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream px-5 text-center">
        <h1 className="text-3xl font-light">
          Your bag is empty
        </h1>

        <p className="mt-3 text-luxe-muted">
          Add some products before checking out.
        </p>

        <Link
          to="/"
          className="mt-6 bg-luxe-brown px-6 py-3 text-sm text-white"
        >
          Explore Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-5 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">

        <section>
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Almost Yours
          </p>

          <h1 className="mt-3 text-3xl font-light">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
            />

            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              title="Please enter exactly 10 digits"
              required
              className="w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address"
              required
              className="w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="min-w-0 w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
              />

              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="PIN code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="min-w-0 w-full border border-[#e2d8cc] bg-white px-4 py-3 outline-none focus:border-luxe-gold"
              />
            </div>

            {orderMutation.isError && (
              <p className="text-sm text-red-700">
                {orderMutation.error.message ||
                  "Unable to place your order. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={orderMutation.isPending}
              className="w-full bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:opacity-50"
            >
              {orderMutation.isPending
                ? "Placing Order..."
                : `Place Order · ₹${subtotal.toLocaleString("en-IN")}`}
            </button>
          </form>
        </section>

        <aside className="h-fit border border-[#e2d8cc] bg-white p-6 md:p-8">
          <h2 className="text-xl font-light">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">
            {checkoutItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-luxe-muted">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="text-sm">
                  ₹{(
                    Number(item.price) * item.quantity
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#e2d8cc] pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-luxe-muted">
                Subtotal
              </span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-luxe-muted">
                Shipping
              </span>

              <span>Free</span>
            </div>

            <div className="mt-5 flex justify-between border-t border-[#e2d8cc] pt-5 font-medium">
              <span>Total</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}

export default Checkout;
