import { apiRequest } from "./api";

import {
  getProductById,
  updateProduct,
} from "./productService";

// READ: Get all orders
export function getOrders() {
  return apiRequest("/orders");
}

// READ: Get one order by ID
export function getOrderById(orderId) {
  return apiRequest(`/orders/${orderId}`);
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

// CANCEL ORDER AND RESTORE PRODUCT STOCK
export async function cancelOrderAndRestock(orderId) {
  // Fetch the latest order
  const order = await getOrderById(orderId);

  // Prevent restoring stock more than once
  if (order.stockRestocked === true) {
    return order;
  }

  // Check that the order has products
  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw new Error("No products found in this order.");
  }

  // Combine quantities if a product appears more than once
  const quantities = new Map();

  order.items.forEach((item) => {
    const productId = String(item.productId);

    quantities.set(
      productId,
      (quantities.get(productId) || 0) +
        Number(item.quantity)
    );
  });

  // Fetch all products
  const products = await Promise.all(
    [...quantities.keys()].map((id) =>
      getProductById(id)
    )
  );

  // Validate products and quantities before updating stock
  products.forEach((product) => {
    const quantity = quantities.get(String(product.id));

    if (
      !Number.isFinite(Number(product.stock)) ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      throw new Error(
        `Unable to restore stock for ${product.name}.`
      );
    }
  });

  // Restore product stock
  for (const product of products) {
    const quantityToRestore =
      quantities.get(String(product.id));

    await updateProduct(product.id, {
      stock:
        Number(product.stock) + quantityToRestore,
    });
  }

  // Mark the order as cancelled and stock as restored
  return updateOrder(orderId, {
    status: "Cancelled",
    stockRestocked: true,
  });
}
