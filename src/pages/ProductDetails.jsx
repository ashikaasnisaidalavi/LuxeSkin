
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBag,
  Heart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Zap,
} from "lucide-react";

import { getProducts } from "../services/productService";
import {
  getReviews,
  createReview,
} from "../services/reviewService";

import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { useAuth } from "../hooks/useAuth";

function ProductDetails() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoggedIn, user } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState("");

  function createProductSlug(name) {
    return encodeURIComponent(
      name.toLowerCase().trim().replace(/\s+/g, "-")
    );
  }

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const product = products.find(
    (item) => createProductSlug(item.name) === productName
  );

  const {
    data: allReviews = [],
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  const productReviews = allReviews.filter(
    (review) => String(review.productId) === String(product?.id)
  );

  const userAlreadyRated = productReviews.some(
    (review) => String(review.userId) === String(user?.id)
  );

  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (total, review) => total + Number(review.rating),
            0
          ) / productReviews.length
        ).toFixed(1)
      : product?.rating;

  const ratingMutation = useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      setSelectedRating(0);
      setRatingMessage("Thank you! Your rating has been submitted.");
    },

    onError: () => {
      setRatingMessage("Unable to submit your rating. Please try again.");
    },
  });

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

  function handleSubmitRating() {
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

    if (selectedRating === 0) {
      setRatingMessage("Please select a star rating.");
      return;
    }

    if (userAlreadyRated) {
      setRatingMessage("You have already rated this product.");
      return;
    }

    setRatingMessage("");

    ratingMutation.mutate({
      productId: String(product.id),
      userId: String(user.id),
      userName: user.name,
      rating: selectedRating,
      createdAt: new Date().toISOString(),
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-luxe-cream">
        <p className="text-luxe-muted">Loading product details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream px-5 text-center">
        <h2 className="text-2xl font-light">Product not found</h2>
        <Link
          to="/"
          className="mt-5 border border-luxe-brown px-6 py-3 text-sm"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const isInCart = Boolean(cartItem);

  const currentCartQuantity = cartItem?.quantity || 0;
  const availableStock = Math.max(
    0,
    product.stock - currentCartQuantity
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const isOutOfStock = product.stock <= 0;
  const reachedStockLimit = availableStock <= 0;

  function handleAddToCart() {
    handleProtectedAction(() => {
      if (isInCart) return;

      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    });
  }

  // Updated Buy Now functionality
  function handleBuyNow() {
    if (isOutOfStock || quantity > availableStock) return;

    const checkoutState = {
      buyNowProduct: product,
      buyNowQuantity: quantity,
    };

    // If the user is not logged in, redirect to Login first
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: {
            pathname: "/checkout",
            state: checkoutState,
          },
        },
      });
      return;
    }

    // If logged in, go directly to Checkout
    navigate("/checkout", {
      state: checkoutState,
    });
  }

  function handleWishlist() {
    handleProtectedAction(() => {
      if (isWishlisted) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    });
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-5 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Product image */}
          <div className="overflow-hidden bg-[#f0eae2]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[350px] w-full object-cover sm:h-[480px]"
            />
          </div>

          {/* Product information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
              {product.brand || "LuxeSkin"}
            </p>

            <h1 className="mt-4 text-3xl font-light leading-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-sm text-luxe-muted">
              <Star
                size={16}
                className="fill-luxe-gold text-luxe-gold"
              />
              {averageRating ?? "New"} rating
              {productReviews.length > 0 &&
                ` (${productReviews.length} customer ratings)`}
            </p>

            <p className="mt-6 text-2xl font-medium">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <p className="mt-6 leading-7 text-luxe-muted">
              {product.description}
            </p>

            <p
              className={`mt-5 text-sm ${
                isOutOfStock ? "text-red-600" : "text-green-800"
              }`}
            >
              {isOutOfStock
                ? "Currently out of stock"
                : `${availableStock} available`}
            </p>

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div className="mt-6 flex items-center gap-5">
                <span className="text-sm">Quantity</span>

                <div className="flex items-center border border-[#e2d8cc]">
                  <button
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    disabled={quantity <= 1}
                    className="p-3 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-10 text-center text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(availableStock, value + 1)
                      )
                    }
                    disabled={quantity >= availableStock}
                    className="p-3 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={
                  isOutOfStock ||
                  isInCart ||
                  reachedStockLimit
                }
                className="flex flex-1 items-center justify-center gap-3 bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag size={18} />
                {isOutOfStock
                  ? "Out of Stock"
                  : isInCart
                    ? "Added to Bag"
                    : reachedStockLimit
                      ? "Stock Limit Reached"
                      : "Add to Bag"}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={
                  isOutOfStock || reachedStockLimit
                }
                className="flex flex-1 items-center justify-center gap-2 border border-luxe-brown bg-white px-6 py-4 text-sm text-luxe-brown transition hover:bg-luxe-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Zap size={18} />
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="flex items-center justify-center gap-2 border border-luxe-brown px-6 py-4 text-sm transition hover:bg-[#f0eae2]"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }
                />
                {isWishlisted ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Customer ratings */}
        <section className="mt-16 border-t border-[#e2d8cc] pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Customer Feedback
          </p>

          <h2 className="mt-3 text-2xl font-light text-luxe-brown">
            Rate This Product
          </h2>

          {userAlreadyRated ? (
            <p className="mt-5 text-sm text-green-800">
              You have already rated this product. Thank you!
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm text-luxe-muted">
                How would you rate this product?
              </p>

              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setSelectedRating(star);
                      setRatingMessage("");
                    }}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={30}
                      className={
                        star <= selectedRating
                          ? "fill-luxe-gold text-luxe-gold"
                          : "text-luxe-gold"
                      }
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitRating}
                disabled={ratingMutation.isPending}
                className="mt-5 bg-luxe-brown px-7 py-3 text-sm text-white transition hover:bg-luxe-gold disabled:opacity-50"
              >
                {ratingMutation.isPending
                  ? "Submitting..."
                  : "Submit Rating"}
              </button>
            </>
          )}

          {ratingMessage && (
            <p className="mt-4 text-sm text-luxe-muted">
              {ratingMessage}
            </p>
          )}

          {/* Submitted reviews */}
          <div className="mt-10">
            <h3 className="text-lg font-light text-luxe-brown">
              Customer Ratings ({productReviews.length})
            </h3>

            {productReviews.length === 0 ? (
              <p className="mt-4 text-sm text-luxe-muted">
                No customer ratings yet. Be the first to rate this product.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-[#e2d8cc] pb-4"
                  >
                    <p className="text-sm font-medium text-luxe-brown">
                      {review.userName}
                    </p>

                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={
                            star <= review.rating
                              ? "fill-luxe-gold text-luxe-gold"
                              : "text-luxe-gold"
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-2 text-xs text-luxe-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
