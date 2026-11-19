

import { apiRequest } from "./api";

// READ: Get all customer reviews
export function getReviews() {
  return apiRequest("/reviews");
}

// CREATE: Submit a customer rating
export function createReview(reviewData) {
  return apiRequest("/reviews", {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
}

// UPDATE: Update a review
export function updateReview(reviewId, updatedData) {
  return apiRequest(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}

// DELETE: Delete a review
export function deleteReview(reviewId) {
  return apiRequest(`/reviews/${reviewId}`, {
    method: "DELETE",
  });
}
