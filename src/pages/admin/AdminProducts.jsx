import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  softDeleteProduct,
  restoreProduct,
} from "../../services/productService";

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  description: "",
  image: "",
  stock: "",
};

const categories = [
  "All",
  "Serum",
  "Moisturizer",
  "Cleanser",
  "Sunscreen",
  "Cream",
];

function AdminProducts() {
  const queryClient = useQueryClient();

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Active / Deleted tab
  const [activeTab, setActiveTab] = useState("active");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Fetch all products for admin
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: getAllProducts,
  });

  // Refresh admin and customer product data
  const refreshProducts = () => {
    queryClient.invalidateQueries({
      queryKey: ["admin", "products"],
    });

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    queryClient.invalidateQueries({
      queryKey: ["admin", "dashboard", "stats"],
    });
  };

  // Add product
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      refreshProducts();
      closeForm();
    },
  });

  // Edit product
  const editProductMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      updateProduct(id, updatedData),

    onSuccess: () => {
      refreshProducts();
      closeForm();
    },
  });

  // Soft delete product
  const deleteProductMutation = useMutation({
    mutationFn: softDeleteProduct,
    // onSuccess: refreshProducts,
  });

  // Restore product
  const restoreProductMutation = useMutation({
    mutationFn: restoreProduct,
    onSuccess: refreshProducts,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Open Add Product form
  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // Open Edit Product form
  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
      stock: product.stock ?? "",
    });

    setShowForm(true);
  };

  // Soft delete confirmation
  const handleDeleteProduct = (product) => {
    const confirmed = window.confirm(
      `Move "${product.name}" to Deleted Products? You can restore it later.`
    );

    if (confirmed) {
      deleteProductMutation.mutate(product.id);
    }
  };

  // Restore confirmation
  const handleRestoreProduct = (product) => {
    const confirmed = window.confirm(
      `Do you want to restore "${product.name}"?`
    );

    if (confirmed) {
      restoreProductMutation.mutate(product.id);
    }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData(emptyForm);
  };

  // Submit Add or Edit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      editProductMutation.mutate({
        id: editingProduct.id,
        updatedData: productData,
      });
    } else {
      addProductMutation.mutate({
        ...productData,
        rating: 0,
        isDeleted: false,
      });
    }
  };

  // Separate active and deleted products
  const activeProducts = products.filter(
    (product) => product.isDeleted !== true
  );

  const deletedProducts = products.filter(
    (product) => product.isDeleted === true
  );

  // Choose products according to selected tab
  const displayedProducts =
    activeTab === "active"
      ? activeProducts
      : deletedProducts;

  // Search and category filtering
  const filteredProducts = displayedProducts.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      product.name?.toLowerCase().includes(search) ||
      product.brand?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex =
    (safeCurrentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  const isSaving =
    addProductMutation.isPending ||
    editProductMutation.isPending;

  const isDeleting = deleteProductMutation.isPending;
  const isRestoring = restoreProductMutation.isPending;

  // Loading state
  if (isLoading) {
    return (
      <p className="text-gray-500">
        Loading products...
      </p>
    );
  }

  // Error state
  if (isError) {
    return (
      <p className="text-red-600">
        Failed to load products. Please check your server.
      </p>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-luxe-brown">
            Products Management
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage all products in your LuxeSkin store.
          </p>
        </div>

        {activeTab === "active" && (
          <button
            onClick={handleAddProduct}
            className="rounded-lg bg-luxe-brown px-5 py-3 text-sm font-semibold text-white"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Active / Deleted Tabs */}
      <div className="mb-6 flex gap-6 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab("active");
            setCurrentPage(1);
            closeForm();
          }}
          className={`border-b-2 pb-3 text-sm font-semibold ${
            activeTab === "active"
              ? "border-luxe-brown text-luxe-brown"
              : "border-transparent text-gray-500"
          }`}
        >
          Active Products ({activeProducts.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("deleted");
            setCurrentPage(1);
            closeForm();
          }}
          className={`border-b-2 pb-3 text-sm font-semibold ${
            activeTab === "deleted"
              ? "border-luxe-brown text-luxe-brown"
              : "border-transparent text-gray-500"
          }`}
        >
          Deleted Products ({deletedProducts.length})
        </button>
      </div>

      {/* Add / Edit Product Form */}
      {showForm && activeTab === "active" && (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-luxe-brown">
            {editingProduct
              ? "Edit Product"
              : "Add New Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="">Select Category</option>

                {categories
                  .filter((category) => category !== "All")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                min="0"
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock Quantity"
                min="0"
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Product Image URL"
                required
                className="rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            {(addProductMutation.isError ||
              editProductMutation.isError) && (
              <p className="text-sm text-red-600">
                Failed to save product. Please try again.
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-luxe-brown px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : editingProduct
                    ? "Update Product"
                    : "Save Product"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Category Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by product name or brand..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-luxe-brown"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-luxe-brown"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Error Messages */}
      {deleteProductMutation.isError && (
        <p className="mb-4 text-sm text-red-600">
          Failed to move product to deleted products. Please try again.
        </p>
      )}

      {restoreProductMutation.isError && (
        <p className="mb-4 text-sm text-red-600">
          Failed to restore product. Please try again.
        </p>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <span className="font-medium text-gray-800">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="p-4">{product.brand}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{product.rating || 0} ⭐</td>

                <td className="p-4">
                  {activeTab === "active" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product)}
                        disabled={isDeleting}
                        className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                      >
                        {isDeleting
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRestoreProduct(product)}
                      disabled={isRestoring}
                      className="rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
                    >
                      {isRestoring
                        ? "Restoring..."
                        : "Restore"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {paginatedProducts.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  {activeTab === "active"
                    ? "No active products found."
                    : "No deleted products found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          Showing{" "}
          {filteredProducts.length === 0 ? 0 : startIndex + 1}
          {" - "}
          {Math.min(endIndex, filteredProducts.length)}
          {" of "}
          {filteredProducts.length} products
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {safeCurrentPage} of {Math.max(totalPages, 1)}
          </span>

          <button
            onClick={() => setCurrentPage(safeCurrentPage + 1)}
            disabled={
              safeCurrentPage >= totalPages ||
              totalPages === 0
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
