
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import {
  removeFromCart,
  updateQuantity,
} from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  }

  function increaseQuantity(item) {
    if (item.quantity < item.stock) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity + 1,
        })
      );
    }
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-5 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-luxe-muted hover:text-luxe-brown"
        >
          <ArrowLeft size={17} />
          Continue shopping
        </Link>

        <div className="mt-8 border-b border-stone-200 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Your selection
          </p>

          <h1 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
            Shopping bag
          </h1>

          <p className="mt-3 text-sm text-luxe-muted">
            {items.length} {items.length === 1 ? "product" : "products"} in
            your bag
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag
              size={42}
              strokeWidth={1}
              className="mx-auto text-luxe-gold"
            />

            <h2 className="mt-6 text-2xl font-light text-luxe-brown">
              Your bag is waiting
            </h2>

            <p className="mt-3 text-sm text-luxe-muted">
              Discover skincare essentials for your daily ritual.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_340px]">
            {/* Cart items */}
            <div className="space-y-0">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[100px_1fr] gap-4 border-b border-stone-200 py-6 sm:grid-cols-[140px_1fr] sm:gap-6"
                >
                  <Link
                    to={`/products/${item.id}`}
                    className="overflow-hidden bg-stone-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-full object-cover sm:h-40"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-luxe-gold">
                        {item.category}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-2 block text-base text-luxe-brown hover:text-luxe-gold"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-sm text-luxe-muted">
                        ₹{Number(item.price).toLocaleString("en-IN")} each
                      </p>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="mt-4 inline-flex items-center gap-2 text-xs text-stone-500 transition hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col items-start justify-between sm:items-end">
                      <p className="font-medium text-luxe-brown">
                        ₹
                        {Number(item.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <div>
                        <div className="flex items-center border border-stone-300">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="p-2 disabled:opacity-40"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-9 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item)}
                            disabled={item.quantity >= item.stock}
                            aria-label={`Increase ${item.name} quantity`}
                            className="p-2 disabled:opacity-40"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {item.quantity >= item.stock && (
                          <p className="mt-2 text-right text-xs text-luxe-muted">
                            Stock limit reached
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order summary */}
            <aside className="border border-stone-200 bg-white/60 p-6 sm:p-7 lg:sticky lg:top-24">
              <h2 className="text-xl font-light text-luxe-brown">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-luxe-muted">
                  <span>Subtotal</span>
                  <span>
                    ₹{Number(subtotal).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-luxe-muted">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <div className="flex justify-between gap-4 text-base text-luxe-brown">
                    <span>Estimated total</span>
                    <span className="font-medium">
                      ₹{Number(subtotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-luxe-muted">
                    Shipping charges, if any, will be confirmed at checkout.
                  </p>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-7 flex w-full items-center justify-center bg-luxe-brown px-6 py-4 text-sm transition hover:bg-luxe-gold"
              >
                Proceed to checkout
              </Link>

              <Link
                to="/"
                className="mt-4 block text-center text-sm text-luxe-muted underline underline-offset-4 hover:text-luxe-brown"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
