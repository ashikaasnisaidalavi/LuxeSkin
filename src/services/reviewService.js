
import { apiRequest } from "./api";

// Get all customer reviews
export function getReviews() {
  return apiRequest("/reviews");
}

// Submit a customer rating
export function createReview(reviewData) {
  return apiRequest("/reviews", {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
}
