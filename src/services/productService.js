
import { apiRequest } from "./api";

// READ: Get all products
export function getProducts() {
  return apiRequest("/products");
}

// READ: Get one product by ID
export function getProductById(id) {
  return apiRequest(`/products/${id}`);
}

// CREATE: Add a new product
export function createProduct(productData) {
  return apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

// UPDATE: Update an existing product
export function updateProduct(id, updatedData) {
  return apiRequest(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}

// DELETE: Delete a product
export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: "DELETE",
  });
}
