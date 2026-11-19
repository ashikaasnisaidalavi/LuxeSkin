
// // import { useState } from "react";
// // import { useParams, useNavigate, Link } from "react-router-dom";
// // import {
// //   useQuery,
// //   useMutation,
// //   useQueryClient,
// // } from "@tanstack/react-query";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   ShoppingBag,
// //   Heart,
// //   Star,
// //   Minus,
// //   Plus,
// //   ArrowLeft,
// //   Zap,
// // } from "lucide-react";

// // import { getProducts } from "../services/productService";
// // import {
// //   getReviews,
// //   createReview,
// // } from "../services/reviewService";

// // import { addToCart } from "../redux/cartSlice";
// // import {
// //   addToWishlist,
// //   removeFromWishlist,
// // } from "../redux/wishlistSlice";
// // import { useAuth } from "../hooks/useAuth";
// // import Button from "../components/Button";

// // function ProductDetails() {
// //   const { productName } = useParams();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const queryClient = useQueryClient();

// //   const { isLoggedIn, user } = useAuth();

// //   const cartItems = useSelector((state) => state.cart.items);
// //   const wishlistItems = useSelector(
// //     (state) => state.wishlist.items
// //   );

// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedRating, setSelectedRating] = useState(0);
// //   const [ratingMessage, setRatingMessage] = useState("");

// //   function createProductSlug(name) {
// //     return encodeURIComponent(
// //       name.toLowerCase().trim().replace(/\s+/g, "-")
// //     );
// //   }

// //   const {
// //     data: products = [],
// //     isLoading,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["products"],
// //     queryFn: getProducts,
// //   });

// //   const product = products.find(
// //     (item) => createProductSlug(item.name) === productName
// //   );

// //   const {
// //     data: allReviews = [],
// //   } = useQuery({
// //     queryKey: ["reviews"],
// //     queryFn: getReviews,
// //   });

// //   // const productReviews = allReviews.filter(
// //   //   (review) => String(review.productId) === String(product?.id)
// //   // );
// //   const productReviews = allReviews.filter(
// //   (review) =>
// //     String(review.productId) === String(product?.id) &&
// //     (review.status === "Approved" || !review.status)
// // );

// //   const userAlreadyRated = productReviews.some(
// //     (review) => String(review.userId) === String(user?.id)
// //   );

// //   const averageRating =
// //     productReviews.length > 0
// //       ? (
// //           productReviews.reduce(
// //             (total, review) => total + Number(review.rating),
// //             0
// //           ) / productReviews.length
// //         ).toFixed(1)
// //       : product?.rating;

// //   const ratingMutation = useMutation({
// //     mutationFn: createReview,

// //     onSuccess: () => {
// //       queryClient.invalidateQueries({
// //         queryKey: ["reviews"],
// //       });

// //       setSelectedRating(0);
// //       setRatingMessage("Thank you! Your rating has been submitted.");
// //     },

// //     onError: () => {
// //       setRatingMessage("Unable to submit your rating. Please try again.");
// //     },
// //   });

// //   function handleProtectedAction(action) {
// //     if (!isLoggedIn) {
// //       navigate("/login", {
// //         state: {
// //           from: {
// //             pathname: window.location.pathname,
// //             search: window.location.search,
// //           },
// //         },
// //       });
// //       return;
// //     }

// //     action();
// //   }

// //   function handleSubmitRating() {
// //     if (!isLoggedIn) {
// //       navigate("/login", {
// //         state: {
// //           from: {
// //             pathname: window.location.pathname,
// //             search: window.location.search,
// //           },
// //         },
// //       });
// //       return;
// //     }

// //     if (selectedRating === 0) {
// //       setRatingMessage("Please select a star rating.");
// //       return;
// //     }

// //     if (userAlreadyRated) {
// //       setRatingMessage("You have already rated this product.");
// //       return;
// //     }

// //     setRatingMessage("");

// //     // ratingMutation.mutate({
// //     //   productId: String(product.id),
// //     //   userId: String(user.id),
// //     //   userName: user.name,
// //     //   rating: selectedRating,
// //     //   createdAt: new Date().toISOString(),
// //     // });
// //     ratingMutation.mutate({
// //   productId: String(product.id),
// //   userId: String(user.id),
// //   userName: user.name,
// //   rating: selectedRating,
// //   status: "Pending",
// //   createdAt: new Date().toISOString(),
// // });
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center bg-luxe-cream px-4">
// //         <p className="text-center text-luxe-muted">
// //           Loading product details...
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (isError || !product) {
// //     return (
// //       <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream px-5 text-center">
// //         <h2 className="text-2xl font-light">Product not found</h2>

// //         <Link
// //           to="/"
// //           className="mt-5 border border-luxe-brown px-6 py-3 text-sm"
// //         >
// //           Back to Collection
// //         </Link>
// //       </div>
// //     );
// //   }

// //   const cartItem = cartItems.find(
// //     (item) => item.id === product.id
// //   );

// //   const isInCart = Boolean(cartItem);

// //   const currentCartQuantity = cartItem?.quantity || 0;

// //   const availableStock = Math.max(
// //     0,
// //     product.stock - currentCartQuantity
// //   );

// //   const isWishlisted = wishlistItems.some(
// //     (item) => item.id === product.id
// //   );

// //   const isOutOfStock = product.stock <= 0;
// //   const reachedStockLimit = availableStock <= 0;

// //   function handleAddToCart() {
// //     handleProtectedAction(() => {
// //       if (isInCart) return;

// //       for (let i = 0; i < quantity; i++) {
// //         dispatch(addToCart(product));
// //       }
// //     });
// //   }

// //   function handleBuyNow() {
// //     if (isOutOfStock || quantity > availableStock) return;

// //     const checkoutState = {
// //       buyNowProduct: product,
// //       buyNowQuantity: quantity,
// //     };

// //     if (!isLoggedIn) {
// //       navigate("/login", {
// //         state: {
// //           from: {
// //             pathname: "/checkout",
// //             state: checkoutState,
// //           },
// //         },
// //       });
// //       return;
// //     }

// //     navigate("/checkout", {
// //       state: checkoutState,
// //     });
// //   }

// //   function handleWishlist() {
// //     handleProtectedAction(() => {
// //       if (isWishlisted) {
// //         dispatch(removeFromWishlist(product.id));
// //       } else {
// //         dispatch(addToWishlist(product));
// //       }
// //     });
// //   }

// //   return (
// //     <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-6 sm:py-10 md:py-16">
// //       <div className="mx-auto max-w-6xl">

// //         {/* Back navigation */}
// //         <Link
// //           to="/"
// //           className="mb-6 inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown sm:mb-8"
// //         >
// //           <ArrowLeft size={16} />
// //           Back to Collection
// //         </Link>

// //         {/* Product section */}
// //         <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">

// //           {/* Product image */}
// //           <div className="overflow-hidden bg-[#f0eae2]">
// //             <img
// //               src={product.image}
// //               alt={product.name}
// //               className="h-[280px] w-full object-cover sm:h-[420px] md:h-[480px] lg:h-[540px]"
// //             />
// //           </div>

// //           {/* Product information */}
// //           <div className="flex flex-col justify-center">

// //             <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
// //               {product.brand || "LuxeSkin"}
// //             </p>

// //             <h1 className="mt-3 text-3xl font-light leading-tight sm:text-4xl md:mt-4 md:text-5xl">
// //               {product.name}
// //             </h1>

// //             <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-luxe-muted">
// //               <Star
// //                 size={16}
// //                 className="shrink-0 fill-luxe-gold text-luxe-gold"
// //               />

// //               {averageRating ?? "New"} rating

// //               {productReviews.length > 0 &&
// //                 ` (${productReviews.length} customer ratings)`}
// //             </p>

// //             <p className="mt-5 text-2xl font-medium sm:mt-6">
// //               ₹{Number(product.price).toLocaleString("en-IN")}
// //             </p>

// //             <p className="mt-5 text-sm leading-7 text-luxe-muted sm:mt-6 sm:text-base">
// //               {product.description}
// //             </p>

// //             <p
// //               className={`mt-5 text-sm ${
// //                 isOutOfStock ? "text-red-600" : "text-green-800"
// //               }`}
// //             >
// //               {isOutOfStock
// //                 ? "Currently out of stock"
// //                 : `${availableStock} available`}
// //             </p>

// //             {/* Quantity selector */}
// //             {!isOutOfStock && (
// //               <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
// //                 <span className="text-sm">Quantity</span>

// //                 <div className="flex items-center border border-[#e2d8cc]">
// //                   <button
// //                     onClick={() =>
// //                       setQuantity((value) => Math.max(1, value - 1))
// //                     }
// //                     disabled={quantity <= 1}
// //                     className="p-3 disabled:opacity-30"
// //                     aria-label="Decrease quantity"
// //                   >
// //                     <Minus size={15} />
// //                   </button>

// //                   <span className="min-w-10 text-center text-sm">
// //                     {quantity}
// //                   </span>

// //                   <button
// //                     onClick={() =>
// //                       setQuantity((value) =>
// //                         Math.min(availableStock, value + 1)
// //                       )
// //                     }
// //                     disabled={quantity >= availableStock}
// //                     className="p-3 disabled:opacity-30"
// //                     aria-label="Increase quantity"
// //                   >
// //                     <Plus size={15} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Action buttons */}
// //             <div className="mt-7 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">

// //               <Button
// //                 onClick={handleAddToCart}
// //                 disabled={isOutOfStock || isInCart || reachedStockLimit}
// //                 className="flex w-full items-center justify-center gap-3 bg-luxe-brown px-4 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-40"
// //               >
// //                 <ShoppingBag size={18} />

// //                 {isOutOfStock
// //                   ? "Out of Stock"
// //                   : isInCart
// //                     ? "Added to Bag"
// //                     : reachedStockLimit
// //                       ? "Stock Limit Reached"
// //                       : "Add to Bag"}
// //               </Button>

// //               <Button
// //                 onClick={handleBuyNow}
// //                 disabled={isOutOfStock || reachedStockLimit}
// //                 className="flex w-full items-center justify-center gap-2 border border-luxe-brown bg-white px-4 py-4 text-sm text-luxe-brown transition hover:bg-luxe-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
// //               >
// //                 <Zap size={18} />
// //                 Buy Now
// //               </Button>

// //               <Button
// //                 onClick={handleWishlist}
// //                 aria-label={
// //                   isWishlisted
// //                     ? "Remove from wishlist"
// //                     : "Add to wishlist"
// //                 }
// //                 className="flex w-full items-center justify-center gap-2 border border-luxe-brown px-4 py-4 text-sm transition hover:bg-[#f0eae2] min-[480px]:col-span-2 md:col-span-1 lg:col-span-2"
// //               >
// //                 <Heart
// //                   size={18}
// //                   className={
// //                     isWishlisted
// //                       ? "fill-red-500 text-red-500"
// //                       : ""
// //                   }
// //                 />

// //                 {isWishlisted ? "Saved" : "Wishlist"}
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Customer ratings */}
// //         <section className="mt-12 border-t border-[#e2d8cc] pt-8 sm:mt-16 sm:pt-10">

// //           <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
// //             Customer Feedback
// //           </p>

// //           <h2 className="mt-3 text-2xl font-light text-luxe-brown">
// //             Rate This Product
// //           </h2>

// //           {userAlreadyRated ? (
// //             <p className="mt-5 text-sm text-green-800">
// //               You have already rated this product. Thank you!
// //             </p>
// //           ) : (
// //             <>
// //               <p className="mt-4 text-sm text-luxe-muted">
// //                 How would you rate this product?
// //               </p>

// //               <div className="mt-4 flex gap-2">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <button
// //                     key={star}
// //                     type="button"
// //                     onClick={() => {
// //                       setSelectedRating(star);
// //                       setRatingMessage("");
// //                     }}
// //                     aria-label={`Rate ${star} stars`}
// //                   >
// //                     <Star
// //                       size={30}
// //                       className={
// //                         star <= selectedRating
// //                           ? "fill-luxe-gold text-luxe-gold"
// //                           : "text-luxe-gold"
// //                       }
// //                     />
// //                   </button>
// //                 ))}
// //               </div>

// //               <Button
// //                 onClick={handleSubmitRating}
// //                 disabled={ratingMutation.isPending}
// //                 className="mt-5 bg-luxe-brown px-7 py-3 text-sm text-white transition hover:bg-luxe-gold disabled:opacity-50"
// //               >
// //                 {ratingMutation.isPending
// //                   ? "Submitting..."
// //                   : "Submit Rating"}
// //               </Button>
// //             </>
// //           )}

// //           {ratingMessage && (
// //             <p className="mt-4 text-sm text-luxe-muted">
// //               {ratingMessage}
// //             </p>
// //           )}

// //           {/* Submitted reviews */}
// //           <div className="mt-8 sm:mt-10">
// //             <h3 className="text-lg font-light text-luxe-brown">
// //               Customer Ratings ({productReviews.length})
// //             </h3>

// //             {productReviews.length === 0 ? (
// //               <p className="mt-4 text-sm text-luxe-muted">
// //                 No customer ratings yet. Be the first to rate this product.
// //               </p>
// //             ) : (
// //               <div className="mt-5 space-y-4">
// //                 {productReviews.map((review) => (
// //                   <div
// //                     key={review.id}
// //                     className="border-b border-[#e2d8cc] pb-4"
// //                   >
// //                     <p className="text-sm font-medium text-luxe-brown">
// //                       {review.userName}
// //                     </p>

// //                     <div className="mt-2 flex items-center gap-1">
// //                       {[1, 2, 3, 4, 5].map((star) => (
// //                         <Star
// //                           key={star}
// //                           size={15}
// //                           className={
// //                             star <= review.rating
// //                               ? "fill-luxe-gold text-luxe-gold"
// //                               : "text-luxe-gold"
// //                           }
// //                         />
// //                       ))}
// //                     </div>

// //                     <p className="mt-2 text-xs text-luxe-muted">
// //                       {new Date(review.createdAt).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }

// // export default ProductDetails;




// import { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ShoppingBag,
//   Heart,
//   Star,
//   Minus,
//   Plus,
//   ArrowLeft,
//   Zap,
// } from "lucide-react";

// import { getProducts } from "../services/productService";
// import {
//   getReviews,
//   createReview,
// } from "../services/reviewService";

// import { addToCart } from "../redux/cartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../redux/wishlistSlice";
// import { useAuth } from "../hooks/useAuth";
// import Button from "../components/Button";
// import { getUserOrders } from "../services/orderService";

// function ProductDetails() {
//   const { productName } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   const { isLoggedIn, user } = useAuth();

//   const cartItems = useSelector((state) => state.cart.items);
//   const wishlistItems = useSelector(
//     (state) => state.wishlist.items
//   );

//   const [quantity, setQuantity] = useState(1);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [ratingMessage, setRatingMessage] = useState("");

//   function createProductSlug(name) {
//     return encodeURIComponent(
//       name.toLowerCase().trim().replace(/\s+/g, "-")
//     );
//   }

//   const {
//     data: products = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: getProducts,
//   });

//   const product = products.find(
//     (item) => createProductSlug(item.name) === productName
//   );

//   const { data: allReviews = [] } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: getReviews,
//   });

//   // Display all ratings immediately
//   const productReviews = allReviews.filter(
//     (review) =>
//       String(review.productId) === String(product?.id)
//   );

//   // Check whether the logged-in customer has already rated
//   const userReview = isLoggedIn && user?.id
//     ? allReviews.find(
//         (review) =>
//           String(review.productId) === String(product?.id) &&
//           String(review.userId) === String(user.id)
//       )
//     : null;

//   const userAlreadyRated = Boolean(userReview);

//   // Calculate average rating
//   const averageRating =
//     productReviews.length > 0
//       ? (
//           productReviews.reduce(
//             (total, review) => total + Number(review.rating),
//             0
//           ) / productReviews.length
//         ).toFixed(1)
//       : product?.rating;

//   // Submit customer rating
//   const ratingMutation = useMutation({
//     mutationFn: createReview,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["reviews"],
//       });

//       setSelectedRating(0);
//       setRatingMessage(
//         "Thank you! Your rating has been submitted."
//       );
//     },

//     onError: () => {
//       setRatingMessage(
//         "Unable to submit your rating. Please try again."
//       );
//     },
//   });

//   function handleProtectedAction(action) {
//     if (!isLoggedIn) {
//       navigate("/login", {
//         state: {
//           from: {
//             pathname: window.location.pathname,
//             search: window.location.search,
//           },
//         },
//       });
//       return;
//     }

//     action();
//   }

//   function handleSubmitRating() {
//     if (!isLoggedIn) {
//       navigate("/login", {
//         state: {
//           from: {
//             pathname: window.location.pathname,
//             search: window.location.search,
//           },
//         },
//       });
//       return;
//     }

//     if (selectedRating === 0) {
//       setRatingMessage("Please select a star rating.");
//       return;
//     }

//     if (userAlreadyRated) {
//       setRatingMessage(
//         "You have already rated this product."
//       );
//       return;
//     }

//     setRatingMessage("");

//     ratingMutation.mutate({
//       productId: String(product.id),
//       userId: String(user.id),
//       userName: user.name,
//       rating: selectedRating,
//       createdAt: new Date().toISOString(),
//     });
//   }

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center bg-luxe-cream px-4">
//         <p className="text-center text-luxe-muted">
//           Loading product details...
//         </p>
//       </div>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream px-5 text-center">
//         <h2 className="text-2xl font-light">
//           Product not found
//         </h2>

//         <Link
//           to="/"
//           className="mt-5 border border-luxe-brown px-6 py-3 text-sm"
//         >
//           Back to Collection
//         </Link>
//       </div>
//     );
//   }

//   const cartItem = cartItems.find(
//     (item) => item.id === product.id
//   );

//   const isInCart = Boolean(cartItem);
//   const currentCartQuantity = cartItem?.quantity || 0;

//   const availableStock = Math.max(
//     0,
//     product.stock - currentCartQuantity
//   );

//   const isWishlisted = wishlistItems.some(
//     (item) => item.id === product.id
//   );

//   const isOutOfStock = product.stock <= 0;
//   const reachedStockLimit = availableStock <= 0;

//   function handleAddToCart() {
//     handleProtectedAction(() => {
//       if (isInCart) return;

//       for (let i = 0; i < quantity; i++) {
//         dispatch(addToCart(product));
//       }
//     });
//   }

//   function handleBuyNow() {
//     if (isOutOfStock || quantity > availableStock) return;

//     const checkoutState = {
//       buyNowProduct: product,
//       buyNowQuantity: quantity,
//     };

//     if (!isLoggedIn) {
//       navigate("/login", {
//         state: {
//           from: {
//             pathname: "/checkout",
//             state: checkoutState,
//           },
//         },
//       });
//       return;
//     }

//     navigate("/checkout", {
//       state: checkoutState,
//     });
//   }

//   function handleWishlist() {
//     handleProtectedAction(() => {
//       if (isWishlisted) {
//         dispatch(removeFromWishlist(product.id));
//       } else {
//         dispatch(addToWishlist(product));
//       }
//     });
//   }

//   return (
//     <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-6 sm:py-10 md:py-16">
//       <div className="mx-auto max-w-6xl">

//         {/* Back navigation */}
//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown sm:mb-8"
//         >
//           <ArrowLeft size={16} />
//           Back to Collection
//         </Link>

//         {/* Product section */}
//         <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">

//           {/* Product image */}
//           <div className="overflow-hidden bg-[#f0eae2]">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="h-[280px] w-full object-cover sm:h-[420px] md:h-[480px] lg:h-[540px]"
//             />
//           </div>

//           {/* Product information */}
//           <div className="flex flex-col justify-center">

//             <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
//               {product.brand || "LuxeSkin"}
//             </p>

//             <h1 className="mt-3 text-3xl font-light leading-tight sm:text-4xl md:mt-4 md:text-5xl">
//               {product.name}
//             </h1>

//             <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-luxe-muted">
//               <Star
//                 size={16}
//                 className="shrink-0 fill-luxe-gold text-luxe-gold"
//               />

//               {averageRating ?? "New"} rating

//               {productReviews.length > 0 &&
//                 ` (${productReviews.length} customer ratings)`}
//             </p>

//             <p className="mt-5 text-2xl font-medium sm:mt-6">
//               ₹{Number(product.price).toLocaleString("en-IN")}
//             </p>

//             <p className="mt-5 text-sm leading-7 text-luxe-muted sm:mt-6 sm:text-base">
//               {product.description}
//             </p>

//             <p
//               className={`mt-5 text-sm ${
//                 isOutOfStock
//                   ? "text-red-600"
//                   : "text-green-800"
//               }`}
//             >
//               {isOutOfStock
//                 ? "Currently out of stock"
//                 : `${availableStock} available`}
//             </p>

//             {/* Quantity selector */}
//             {!isOutOfStock && (
//               <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
//                 <span className="text-sm">Quantity</span>

//                 <div className="flex items-center border border-[#e2d8cc]">
//                   <button
//                     onClick={() =>
//                       setQuantity((value) =>
//                         Math.max(1, value - 1)
//                       )
//                     }
//                     disabled={quantity <= 1}
//                     className="p-3 disabled:opacity-30"
//                     aria-label="Decrease quantity"
//                   >
//                     <Minus size={15} />
//                   </button>

//                   <span className="min-w-10 text-center text-sm">
//                     {quantity}
//                   </span>

//                   <button
//                     onClick={() =>
//                       setQuantity((value) =>
//                         Math.min(availableStock, value + 1)
//                       )
//                     }
//                     disabled={quantity >= availableStock}
//                     className="p-3 disabled:opacity-30"
//                     aria-label="Increase quantity"
//                   >
//                     <Plus size={15} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Action buttons */}
//             <div className="mt-7 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">

//               <Button
//                 onClick={handleAddToCart}
//                 disabled={
//                   isOutOfStock ||
//                   isInCart ||
//                   reachedStockLimit
//                 }
//                 className="flex w-full items-center justify-center gap-3 bg-luxe-brown px-4 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <ShoppingBag size={18} />

//                 {isOutOfStock
//                   ? "Out of Stock"
//                   : isInCart
//                     ? "Added to Bag"
//                     : reachedStockLimit
//                       ? "Stock Limit Reached"
//                       : "Add to Bag"}
//               </Button>

//               <Button
//                 onClick={handleBuyNow}
//                 disabled={isOutOfStock || reachedStockLimit}
//                 className="flex w-full items-center justify-center gap-2 border border-luxe-brown bg-white px-4 py-4 text-sm text-luxe-brown transition hover:bg-luxe-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <Zap size={18} />
//                 Buy Now
//               </Button>

//               <Button
//                 onClick={handleWishlist}
//                 aria-label={
//                   isWishlisted
//                     ? "Remove from wishlist"
//                     : "Add to wishlist"
//                 }
//                 className="flex w-full items-center justify-center gap-2 border border-luxe-brown px-4 py-4 text-sm transition hover:bg-[#f0eae2] min-[480px]:col-span-2 md:col-span-1 lg:col-span-2"
//               >
//                 <Heart
//                   size={18}
//                   className={
//                     isWishlisted
//                       ? "fill-red-500 text-red-500"
//                       : ""
//                   }
//                 />

//                 {isWishlisted ? "Saved" : "Wishlist"}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Customer ratings */}
//         <section className="mt-12 border-t border-[#e2d8cc] pt-8 sm:mt-16 sm:pt-10">

//           <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
//             Customer Feedback
//           </p>

//           <h2 className="mt-3 text-2xl font-light text-luxe-brown">
//             Rate This Product
//           </h2>

//           {userAlreadyRated ? (
//             <p className="mt-5 text-sm text-green-800">
//               You have already rated this product. Thank you!
//             </p>
//           ) : (
//             <>
//               <p className="mt-4 text-sm text-luxe-muted">
//                 How would you rate this product?
//               </p>

//               <div className="mt-4 flex gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => {
//                       setSelectedRating(star);
//                       setRatingMessage("");
//                     }}
//                     aria-label={`Rate ${star} stars`}
//                   >
//                     <Star
//                       size={30}
//                       className={
//                         star <= selectedRating
//                           ? "fill-luxe-gold text-luxe-gold"
//                           : "text-luxe-gold"
//                       }
//                     />
//                   </button>
//                 ))}
//               </div>

//               <Button
//                 onClick={handleSubmitRating}
//                 disabled={ratingMutation.isPending}
//                 className="mt-5 bg-luxe-brown px-7 py-3 text-sm text-white transition hover:bg-luxe-gold disabled:opacity-50"
//               >
//                 {ratingMutation.isPending
//                   ? "Submitting..."
//                   : "Submit Rating"}
//               </Button>
//             </>
//           )}

//           {ratingMessage && (
//             <p className="mt-4 text-sm text-luxe-muted">
//               {ratingMessage}
//             </p>
//           )}

//           {/* Submitted reviews */}
//           <div className="mt-8 sm:mt-10">
//             <h3 className="text-lg font-light text-luxe-brown">
//               Customer Ratings ({productReviews.length})
//             </h3>

//             {productReviews.length === 0 ? (
//               <p className="mt-4 text-sm text-luxe-muted">
//                 No customer ratings yet. Be the first to rate this product.
//               </p>
//             ) : (
//               <div className="mt-5 space-y-4">
//                 {productReviews.map((review) => (
//                   <div
//                     key={review.id}
//                     className="border-b border-[#e2d8cc] pb-4"
//                   >
//                     <p className="text-sm font-medium text-luxe-brown">
//                       {review.userName}
//                     </p>

//                     <div className="mt-2 flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={15}
//                           className={
//                             star <= review.rating
//                               ? "fill-luxe-gold text-luxe-gold"
//                               : "text-luxe-gold"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <p className="mt-2 text-xs text-luxe-muted">
//                       {new Date(
//                         review.createdAt
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default ProductDetails;



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
import { getUserOrders } from "../services/orderService";

import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

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

  // Fetch products
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

  // Fetch all reviews
  const { data: allReviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // Fetch orders belonging to the logged-in customer
  const {
    data: userOrders = [],
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => getUserOrders(user.id),
    enabled: Boolean(isLoggedIn && user?.id),
  });

  // Display all ratings for this product
  const productReviews = allReviews.filter(
    (review) =>
      String(review.productId) === String(product?.id)
  );

  // Check whether the customer has already rated this product
  const userReview =
    isLoggedIn && user?.id
      ? allReviews.find(
          (review) =>
            String(review.productId) === String(product?.id) &&
            String(review.userId) === String(user.id)
        )
      : null;

  const userAlreadyRated = Boolean(userReview);

  // Check whether the customer has a Delivered order
  // containing this product
  const hasDeliveredPurchase = userOrders.some((order) => {
    return (
      String(order.userId) === String(user?.id) &&
      order.status === "Delivered" &&
      Array.isArray(order.items) &&
      order.items.some(
        (item) =>
          String(item.productId) === String(product?.id)
      )
    );
  });

  // Calculate average rating
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (total, review) => total + Number(review.rating),
            0
          ) / productReviews.length
        ).toFixed(1)
      : product?.rating;

  // Submit customer rating
  const ratingMutation = useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      setSelectedRating(0);
      setRatingMessage(
        "Thank you! Your rating has been submitted."
      );
    },

    onError: () => {
      setRatingMessage(
        "Unable to submit your rating. Please try again."
      );
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

  // Submit rating only after a Delivered purchase
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

    if (isOrdersLoading) {
      setRatingMessage("Checking your purchase...");
      return;
    }

    if (isOrdersError) {
      setRatingMessage(
        "Unable to verify your purchase. Please try again later."
      );
      return;
    }

    if (!hasDeliveredPurchase) {
      setRatingMessage(
        "You can rate this product only after it has been delivered."
      );
      return;
    }

    if (selectedRating === 0) {
      setRatingMessage("Please select a star rating.");
      return;
    }

    if (userAlreadyRated) {
      setRatingMessage(
        "You have already rated this product."
      );
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
      <div className="flex min-h-[60vh] items-center justify-center bg-luxe-cream px-4">
        <p className="text-center text-luxe-muted">
          Loading product details...
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-luxe-cream px-5 text-center">
        <h2 className="text-2xl font-light">
          Product not found
        </h2>

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

  function handleBuyNow() {
    if (isOutOfStock || quantity > availableStock) return;

    const checkoutState = {
      buyNowProduct: product,
      buyNowQuantity: quantity,
    };

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
    <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-6 sm:py-10 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Back navigation */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-brown sm:mb-8"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        {/* Product section */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">

          {/* Product image */}
          <div className="overflow-hidden bg-[#f0eae2]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[280px] w-full object-cover sm:h-[420px] md:h-[480px] lg:h-[540px]"
            />
          </div>

          {/* Product information */}
          <div className="flex flex-col justify-center">

            <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
              {product.brand || "LuxeSkin"}
            </p>

            <h1 className="mt-3 text-3xl font-light leading-tight sm:text-4xl md:mt-4 md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-luxe-muted">
              <Star
                size={16}
                className="shrink-0 fill-luxe-gold text-luxe-gold"
              />

              {averageRating ?? "New"} rating

              {productReviews.length > 0 &&
                ` (${productReviews.length} customer ratings)`}
            </p>

            <p className="mt-5 text-2xl font-medium sm:mt-6">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <p className="mt-5 text-sm leading-7 text-luxe-muted sm:mt-6 sm:text-base">
              {product.description}
            </p>

            <p
              className={`mt-5 text-sm ${
                isOutOfStock
                  ? "text-red-600"
                  : "text-green-800"
              }`}
            >
              {isOutOfStock
                ? "Currently out of stock"
                : `${availableStock} available`}
            </p>

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
                <span className="text-sm">Quantity</span>

                <div className="flex items-center border border-[#e2d8cc]">
                  <button
                    onClick={() =>
                      setQuantity((value) =>
                        Math.max(1, value - 1)
                      )
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
            <div className="mt-7 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">

              <Button
                onClick={handleAddToCart}
                disabled={
                  isOutOfStock ||
                  isInCart ||
                  reachedStockLimit
                }
                className="flex w-full items-center justify-center gap-3 bg-luxe-brown px-4 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag size={18} />

                {isOutOfStock
                  ? "Out of Stock"
                  : isInCart
                    ? "Added to Bag"
                    : reachedStockLimit
                      ? "Stock Limit Reached"
                      : "Add to Bag"}
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock || reachedStockLimit}
                className="flex w-full items-center justify-center gap-2 border border-luxe-brown bg-white px-4 py-4 text-sm text-luxe-brown transition hover:bg-luxe-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Zap size={18} />
                Buy Now
              </Button>

              <Button
                onClick={handleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="flex w-full items-center justify-center gap-2 border border-luxe-brown px-4 py-4 text-sm transition hover:bg-[#f0eae2] min-[480px]:col-span-2 md:col-span-1 lg:col-span-2"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

                {isWishlisted ? "Saved" : "Wishlist"}
              </Button>
            </div>
          </div>
        </div>

        {/* Customer ratings */}
        <section className="mt-12 border-t border-[#e2d8cc] pt-8 sm:mt-16 sm:pt-10">

          <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold sm:tracking-[0.3em]">
            Customer Feedback
          </p>

          <h2 className="mt-3 text-2xl font-light text-luxe-brown">
            Rate This Product
          </h2>

          {userAlreadyRated ? (
            <p className="mt-5 text-sm text-green-800">
              You have already rated this product. Thank you!
            </p>
          ) : !isLoggedIn ? (
            <p className="mt-5 text-sm text-luxe-muted">
              Please log in and purchase this product to submit a rating.
            </p>
          ) : isOrdersLoading ? (
            <p className="mt-5 text-sm text-luxe-muted">
              Checking your purchase...
            </p>
          ) : isOrdersError ? (
            <p className="mt-5 text-sm text-red-600">
              Unable to verify your purchase. Please try again later.
            </p>
          ) : !hasDeliveredPurchase ? (
            <p className="mt-5 text-sm text-luxe-muted">
              You can rate this product after purchasing it and receiving your order.
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm text-luxe-muted">
                Your order has been delivered! How would you rate this product?
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

              <Button
                onClick={handleSubmitRating}
                disabled={ratingMutation.isPending}
                className="mt-5 bg-luxe-brown px-7 py-3 text-sm text-white transition hover:bg-luxe-gold disabled:opacity-50"
              >
                {ratingMutation.isPending
                  ? "Submitting..."
                  : "Submit Rating"}
              </Button>
            </>
          )}

          {ratingMessage && (
            <p className="mt-4 text-sm text-luxe-muted">
              {ratingMessage}
            </p>
          )}

          {/* Submitted reviews */}
          <div className="mt-8 sm:mt-10">
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
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
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
