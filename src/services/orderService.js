
import { apiRequest } from "./api";

// READ: Get all orders
export function getOrders() {
  return apiRequest("/orders");
}

// READ: Get orders belonging to one user
export async function getUserOrders(userId) {
  const orders = await getOrders();

  return orders.filter(
    (order) => String(order.userId) === String(userId)
  );
}

// CREATE: Place a new order
export function createOrder(orderData) {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

// UPDATE: Update an existing order
export function updateOrder(orderId, updatedData) {
  return apiRequest(`/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}

// DELETE: Delete an order
export function deleteOrder(orderId) {
  return apiRequest(`/orders/${orderId}`, {
    method: "DELETE",
  });
}
