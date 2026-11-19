
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import Button from "../components/Button";

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
    <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-6 sm:py-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Continue shopping */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown"
        >
          <ArrowLeft size={17} />
          Continue shopping
        </Link>

        {/* Page heading */}
        <div className="mt-7 border-b border-stone-200 pb-6 sm:mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
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
          /* Empty cart */
          <div className="py-16 text-center sm:py-20">
            <ShoppingBag
              size={42}
              strokeWidth={1}
              className="mx-auto text-luxe-gold"
            />

            <h2 className="mt-6 text-2xl font-light text-luxe-brown">
              Your bag is waiting
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-luxe-muted">
              Discover skincare essentials for your daily ritual.
            </p>

            {/* <Button
              to="/"
              className="mt-7 inline-flex items-center gap-2 bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold"
            >
              Explore products
            </Button> */}
            {/* <Button
  to="/"
  style={{
    color: "#ffffff",
    backgroundColor: "#624737",
  }}
  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-semibold no-underline"
>
  Explore products
</Button> */}
{/* <Button
  to="/#collection"
  style={{
    color: "#ffffff",
    backgroundColor: "#624737",
  }}
  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-semibold no-underline"
>
  Explore products
</Button> */}
{/* <Link
  to="/#collection"
  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-semibold no-underline"
  style={{
    color: "#ffffff",
    backgroundColor: "#624737",
  }}
>
  Explore products
</Link> */}
<Button
  to="/#collection"
  style={{
    color: "#ffffff",
    backgroundColor: "#624737",
  }}
  className="mt-7 px-6 py-4"
>
  Explore Collection
</Button>
          </div>
        ) : (
          <div className="mt-7 grid items-start gap-8 lg:mt-8 lg:grid-cols-[1fr_340px] lg:gap-10">
            {/* Cart items */}
            <div className="min-w-0 space-y-0">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[90px_minmax(0,1fr)] gap-3 border-b border-stone-200 py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-5 sm:py-6 lg:grid-cols-[140px_minmax(0,1fr)] lg:gap-6"
                >
                  {/* Product image */}
                  <Link
                    to={`/products/${item.id}`}
                    className="h-28 overflow-hidden bg-stone-100 sm:h-36 lg:h-40"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Product information */}
                  <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:gap-5">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-luxe-gold">
                        {item.category}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-2 block break-words text-sm text-luxe-brown hover:text-luxe-gold sm:text-base"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-xs text-luxe-muted sm:text-sm">
                        ₹{Number(item.price).toLocaleString("en-IN")} each
                      </p>

                      <Button
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                        className="mt-3 inline-flex items-center gap-2 text-xs text-stone-500 transition hover:text-red-700 sm:mt-4"
                      >
                        <Trash2 size={14} />
                        Remove
                      </Button>
                    </div>

                    {/* Price and quantity */}
                    <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <p className="text-sm font-medium text-luxe-brown sm:text-base">
                        ₹
                        {Number(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
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
                          <p className="mt-2 text-right text-[10px] text-luxe-muted sm:text-xs">
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
            <aside className="border border-stone-200 bg-white/60 p-5 sm:p-7 lg:sticky lg:top-24">
              <h2 className="text-xl font-light text-luxe-brown">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-luxe-muted">
                  <span>Subtotal</span>
                  <span className="shrink-0">
                    ₹{Number(subtotal).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-1 text-luxe-muted min-[380px]:flex-row min-[380px]:gap-4">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <div className="flex justify-between gap-4 text-base text-luxe-brown">
                    <span>Estimated total</span>
                    <span className="shrink-0 font-medium">
                      ₹{Number(subtotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-luxe-muted">
                    Shipping charges, if any, will be confirmed at checkout.
                  </p>
                </div>
              </div>

              <Button
                to="/checkout"
                style={{ color: "#ffffff" }}
                className="mt-7 flex w-full items-center justify-center bg-[#624737] px-4 py-4 text-center text-sm font-serif font-medium uppercase tracking-widest text-white transition hover:bg-luxe-gold sm:px-6 sm:text-base"
              >
                Proceed to checkout
              </Button>

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
