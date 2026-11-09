
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";

import {
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

function createProductSlug(name) {
  return encodeURIComponent(
    name.toLowerCase().trim().replace(/\s+/g, "-")
  );
}

export default function Wishlist() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  function handleAddToCart(product) {
    const cartItem = cartItems.find((item) => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (product.stock <= currentQuantity) {
      return;
    }

    dispatch(addToCart(product));
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
            Your saved favourites
          </p>

          <h1 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
            My wishlist
          </h1>

          <p className="mt-3 text-sm text-luxe-muted">
            Keep the products you love close at hand.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <Heart
              size={42}
              strokeWidth={1}
              className="mx-auto text-luxe-gold"
            />

            <h2 className="mt-6 text-2xl font-light text-luxe-brown">
              Nothing saved just yet
            </h2>

            <p className="mt-3 text-sm text-luxe-muted">
              Save your favourite skincare products and find them here.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => {
              const cartItem = cartItems.find(
                (item) => item.id === product.id
              );

              const currentQuantity = cartItem ? cartItem.quantity : 0;
              const outOfStock = product.stock <= 0;
              const stockLimitReached =
                !outOfStock && currentQuantity >= product.stock;

              const productSlug = createProductSlug(product.name);

              return (
                <article key={product.id} className="group">
                  <div className="relative overflow-hidden bg-stone-100">
                    <Link to={`/products/${productSlug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(removeFromWishlist(product.id))
                      }
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                    >
                      <Heart
                        size={18}
                        fill="currentColor"
                        className="text-rose-700"
                      />
                    </button>

                    {outOfStock && (
                      <span className="absolute bottom-3 left-3 bg-white px-3 py-2 text-xs text-stone-600">
                        Out of stock
                      </span>
                    )}
                  </div>

                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-wider text-luxe-gold">
                      {product.category}
                    </p>

                    <Link
                      to={`/products/${productSlug}`}
                      className="mt-2 block text-base text-luxe-brown hover:text-luxe-gold"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-2 font-medium text-luxe-brown">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      disabled={outOfStock || stockLimitReached}
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 flex w-full items-center justify-center gap-2 border border-luxe-brown px-4 py-3 text-sm text-luxe-brown transition hover:bg-luxe-brown hover:text-white disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-transparent disabled:hover:text-stone-400"
                    >
                      <ShoppingBag size={16} />
                      {outOfStock
                        ? "Unavailable"
                        : stockLimitReached
                          ? "Stock limit reached"
                          : "Add to bag"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(removeFromWishlist(product.id))
                      }
                      className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-xs text-luxe-muted transition hover:text-red-700"
                    >
                      <Trash2 size={14} />
                      Remove from wishlist
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
