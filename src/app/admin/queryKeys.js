


export const adminQueryKeys = {
  products: {
    all: ["admin", "products"],
    detail: (id) => ["admin", "products", id],
  },

  users: {
    all: ["admin", "users"],
    detail: (id) => ["admin", "users", id],
  },

  orders: {
    all: ["admin", "orders"],
    detail: (id) => ["admin", "orders", id],
  },

  reviews: {
    all: ["admin", "reviews"],
    detail: (id) => ["admin", "reviews", id],
  },
};