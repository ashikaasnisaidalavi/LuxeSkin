
// import { apiRequest } from "./api";

// // READ: Get all products
// export function getProducts() {
//   return apiRequest("/products");
// }

// // READ: Get one product by ID
// export function getProductById(id) {
//   return apiRequest(`/products/${id}`);
// }

// // CREATE: Add a new product
// export function createProduct(productData) {
//   return apiRequest("/products", {
//     method: "POST",
//     body: JSON.stringify(productData),
//   });
// }

// // UPDATE: Update an existing product
// export function updateProduct(id, updatedData) {
//   return apiRequest(`/products/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(updatedData),
//   });
// }

// // DELETE: Delete a product
// export function deleteProduct(id) {
//   return apiRequest(`/products/${id}`, {
//     method: "DELETE",
//   });
// }



import { apiRequest } from "./api";

// READ: Get all products
export function getAllProducts() {
  return apiRequest("/products");
}

// READ: Get active products only
// Products without isDeleted are also treated as active.
export async function getProducts() {
  const products = await getAllProducts();

  return products.filter(
    (product) => product.isDeleted !== true
  );
}

// READ: Get deleted products only
export async function getDeletedProducts() {
  const products = await getAllProducts();

  return products.filter(
    (product) => product.isDeleted === true
  );
}

// READ: Get one product by ID
export function getProductById(id) {
  return apiRequest(`/products/${id}`);
}

// CREATE: Add a new product
export function createProduct(productData) {
  return apiRequest("/products", {
    method: "POST",
    body: JSON.stringify({
      ...productData,
      isDeleted: false,
    }),
  });
}

// UPDATE: Update an existing product
export function updateProduct(id, updatedData) {
  return apiRequest(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}

// SOFT DELETE: Mark product as deleted
export function softDeleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isDeleted: true,
    }),
  });
}

// RESTORE: Make deleted product active again
export function restoreProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isDeleted: false,
    }),
  });
}
