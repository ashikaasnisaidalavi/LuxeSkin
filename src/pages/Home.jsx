
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import { getProducts } from "../services/productService";
import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Categories are generated from the API data
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Generate URL from product name
  function createProductSlug(name) {
    return encodeURIComponent(
      name.toLowerCase().trim().replace(/\s+/g, "-")
    );
  }

  // Require login before cart or wishlist actions
  function handleProtectedAction(action) {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: {
            pathname: window.location.pathname,
            search: window.location.search,
          },
        },
      });
      return;
    }

    action();
  }

  // Filter products by search and category
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );
  }

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  function handleSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleCategory(value) {
    setCategory(value);
    setCurrentPage(1);
  }

  function handleSort(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  return (
    <main className="min-h-screen bg-luxe-cream">
      {/* Hero section */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            The Art of Skincare
          </p>

          <h1 className="mt-5 text-4xl font-light leading-tight md:text-6xl">
            Your skin,
            <br />
            your <span className="italic">ritual.</span>
          </h1>

          <p className="mt-5 max-w-md leading-7 text-luxe-muted">
            Thoughtfully selected skincare essentials for
            healthy, radiant-looking skin.
          </p>

          <a
            href="#collection"
            className="mt-8 inline-flex items-center gap-3 bg-luxe-brown px-7 py-3.5 text-sm text-white transition hover:bg-luxe-gold"
          >
          <span className="font-serif text-base font-medium tracking-wide text-white">
          Explore Collection
          </span>
            <ChevronRight size={17} />
          </a>
        </div>

        <div className="h-[300px] overflow-hidden md:h-[430px]">
          <img
            src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85"
            alt="Skincare products"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Product collection */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-5 py-12 lg:px-10"
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Discover Your Essentials
          </p>

          <h2 className="mt-3 text-3xl font-light md:text-4xl">
            The Collection
          </h2>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 border-b border-[#d9cfc2] py-2 lg:w-72">
            <Search size={18} className="text-luxe-muted" />

            <input
              type="text"
              placeholder="Search skincare..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-luxe-muted"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => handleCategory(item)}
                className={`px-4 py-2 text-xs transition ${
                  category === item
                    ? "bg-luxe-brown text-white"
                    : "border border-[#e2d8cc] hover:border-luxe-brown"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(event) => handleSort(event.target.value)}
            className="border border-[#e2d8cc] bg-transparent px-3 py-2 text-sm outline-none"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="py-16 text-center text-luxe-muted">
            Loading our collection...
          </p>
        )}

        {/* Error */}
        {isError && (
          <p className="py-16 text-center text-red-700">
            Unable to load products. Please try again.
          </p>
        )}

        {/* Empty collection */}
        {!isLoading &&
          !isError &&
          filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg">No products found.</p>
              <p className="mt-2 text-sm text-luxe-muted">
                Try another search or category.
              </p>
            </div>
          )}

        {/* Product grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {displayedProducts.map((product) => {
              const isWishlisted = wishlistItems.some(
                (item) => item.id === product.id
              );

              const cartItem = cartItems.find(
                (item) => item.id === product.id
              );

              const isInCart = Boolean(cartItem);

              const isOutOfStock = product.stock <= 0;
              const reachedStockLimit =
                cartItem && cartItem.quantity >= product.stock;

              const productSlug = createProductSlug(product.name);

              return (
                <article key={product.id} className="group">
                  {/* Product image */}
                  <div className="relative overflow-hidden bg-[#f0eae2]">
                    <Link to={`/products/${productSlug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      onClick={() =>
                        handleProtectedAction(() => {
                          if (isWishlisted) {
                            dispatch(removeFromWishlist(product.id));
                          } else {
                            dispatch(addToWishlist(product));
                          }
                        })
                      }
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-luxe-brown"
                        }
                      />
                    </button>

                    {isOutOfStock && (
                      <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-xs">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product information */}
                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-widest text-luxe-muted">
                      {product.brand}
                    </p>

                    <Link to={`/products/${productSlug}`}>
                      <h3 className="mt-2 text-base font-medium hover:text-luxe-gold">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-2 flex items-center gap-1 text-sm text-luxe-muted">
                      <Star
                        size={14}
                        className="fill-luxe-gold text-luxe-gold"
                      />
                      {product.rating ?? "New"}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-medium">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                      <button
                        disabled={
                          isOutOfStock ||
                          isInCart ||
                          reachedStockLimit
                        }
                        onClick={() =>
                          handleProtectedAction(() => {
                            if (!isInCart) {
                              dispatch(addToCart(product));
                            }
                          })
                        }
                        className="flex items-center gap-2 border border-luxe-brown px-3 py-2 text-xs transition hover:bg-luxe-brown hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ShoppingBag size={15} />

                        {isOutOfStock
                          ? "Unavailable"
                          : isInCart
                            ? "Added to Bag"
                            : reachedStockLimit
                              ? "Stock Limit"
                              : "Add to Bag"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-5">
            <button
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
