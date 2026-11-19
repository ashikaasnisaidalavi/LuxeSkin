import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Search, Star, Trash2 } from "lucide-react";

import { adminQueryKeys } from "../../app/admin/queryKeys";
import {
  getReviews,
  deleteReview,
} from "../../services/reviewService";
import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";
import Button from "../../components/Button";

function AdminReviews() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: adminQueryKeys.reviews.all,
    queryFn: getReviews,
  });

  // Fetch products
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });

  // Find product name
  const getProductName = (productId) => {
    const product = products.find(
      (item) => String(item.id) === String(productId)
    );

    return product?.name || product?.title || "Unknown Product";
  };

  // Find customer name
  const getCustomerName = (review) => {
    const user = users.find(
      (item) => String(item.id) === String(review.userId)
    );

    return review.userName || user?.name || "Unknown Customer";
  };

  // Search and rating filter
  const filteredReviews = reviews.filter((review) => {
    const customerName = getCustomerName(review).toLowerCase();
    const productName = getProductName(review.productId).toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      customerName.includes(search) ||
      productName.includes(search) ||
      String(review.id).toLowerCase().includes(search);

    const matchesRating =
      ratingFilter === "All" ||
      String(review.rating) === ratingFilter;

    return matchesSearch && matchesRating;
  });

  // Delete confirmation
  const handleDelete = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmed) {
      deleteMutation.mutate(reviewId);
    }
  };

  if (isLoading) {
    return (
      <p className="text-gray-500">
        Loading reviews...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-600">
        Failed to load reviews: {error.message}
      </p>
    );
  }

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-luxe-brown">
          Reviews Management
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage customer product ratings
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm lg:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer, product or review ID..."
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-luxe-brown"
          />
        </div>

        {/* Rating filter */}
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none"
        >
          <option value="All">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-[750px] text-left">

          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Rating</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="text-sm">

                {/* Customer */}
                <td className="px-5 py-4 font-medium text-gray-800">
                  {getCustomerName(review)}
                </td>

                {/* Product */}
                <td className="px-5 py-4 text-gray-600">
                  {getProductName(review.productId)}
                </td>

                {/* Rating */}
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1 font-semibold text-yellow-600">
                    <Star size={15} fill="currentColor" />
                    {review.rating}/5
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-gray-500">
                  {review.createdAt
                    ? new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    : "—"}
                </td>

                {/* Delete action */}
                <td className="px-5 py-4">
                  <Button
                    onClick={() => handleDelete(review.id)}
                    disabled={deleteMutation.isPending}
                    className="gap-1 px-3 py-2"
                    style={{
                      backgroundColor: "#5b3928",
                      color: "#ffffff",
                      fontSize: "12px",
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </td>

              </tr>
            ))}

            {filteredReviews.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminReviews;
