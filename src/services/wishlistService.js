
import { apiRequest } from "./api";

// Get the wishlist belonging to a particular user
export async function getUserWishlist(userId) {
  const wishlists = await apiRequest(
    `/wishlists?userId=${encodeURIComponent(userId)}`
  );

  return wishlists[0] || null;
}

// Save the user's wishlist
export async function saveUserWishlist(userId, items) {
  const existingWishlist = await getUserWishlist(userId);

  if (existingWishlist) {
    return apiRequest(`/wishlists/${existingWishlist.id}`, {
      method: "PATCH",
      body: JSON.stringify({ items }),
    });
  }

  return apiRequest("/wishlists", {
    method: "POST",
    body: JSON.stringify({
      userId,
      items,
    }),
  });
}
