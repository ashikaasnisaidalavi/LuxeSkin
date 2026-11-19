
import { apiRequest } from "./api";

// Get the cart belonging to a particular user
export async function getUserCart(userId) {
  const carts = await apiRequest(
    `/carts?userId=${encodeURIComponent(userId)}`
  );

  return carts[0] || null;
}

// Save the user's cart
export async function saveUserCart(userId, items) {
  const existingCart = await getUserCart(userId);

  if (existingCart) {
    return apiRequest(`/carts/${existingCart.id}`, {
      method: "PATCH",
      body: JSON.stringify({ items }),
    });
  }

  return apiRequest("/carts", {
    method: "POST",
    body: JSON.stringify({
      userId,
      items,
    }),
  });
}
