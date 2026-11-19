import { useQuery } from "@tanstack/react-query";
import {
  Package,
  Users,
  ShoppingBag,
  Star,
  TrendingUp,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import { apiRequest } from "../../services/api";

const statusColors = {
  Pending: "#D97706",
  Processing: "#2563EB",
  Shipped: "#7C3AED",
  Delivered: "#16A34A",
  Cancelled: "#DC2626",
};

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function getDashboardStats() {
  return Promise.all([
    apiRequest("/products"),
    apiRequest("/users"),
    apiRequest("/orders"),
    apiRequest("/reviews"),
  ]).then(([products, users, orders, reviews]) => {
    // Exclude cancelled orders from sales
    const validOrders = orders.filter(
      (order) => order.status?.toLowerCase() !== "cancelled"
    );

    // Calculate monthly sales for the last 6 months
    const today = new Date();

    const salesData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      );

      const month = date.toLocaleString("en-IN", {
        month: "short",
      });

      const year = date.getFullYear();

      const monthlySales = validOrders
        .filter((order) => {
          if (!order.createdAt) return false;

          const orderDate = new Date(order.createdAt);

          return (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === year
          );
        })
        .reduce(
          (total, order) =>
            total + Number(order.total || order.subtotal || 0),
          0
        );

      salesData.push({
        month,
        year,
        sales: monthlySales,
      });
    }

    // Calculate order status counts
    const orderStatusData = statuses.map((status) => ({
      status,
      count: orders.filter(
        (order) =>
          order.status?.toLowerCase() === status.toLowerCase()
      ).length,
    }));

    // Include any other status values found in the database
    orders.forEach((order) => {
      const status = order.status || "Unknown";

      const exists = orderStatusData.some(
        (item) =>
          item.status.toLowerCase() === status.toLowerCase()
      );

      if (!exists) {
        orderStatusData.push({
          status,
          count: orders.filter(
            (item) => item.status === status
          ).length,
        });
      }
    });

    return {
      products: products.length,
      users: users.length,
      orders: orders.length,
      reviews: reviews.length,
      totalSales: validOrders.reduce(
        (total, order) =>
          total + Number(order.total || order.subtotal || 0),
        0
      ),
      salesData,
      orderStatusData,
    };
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function AdminDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600">
        Failed to load dashboard data. Please check your server.
      </p>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
    },
    {
      title: "Total Reviews",
      value: stats.reviews,
      icon: Star,
    },
  ];

  const maxSales = Math.max(
    ...stats.salesData.map((item) => item.sales),
    1
  );

  const totalStatusOrders = stats.orderStatusData.reduce(
    (total, item) => total + item.count,
    0
  );

  // Build the segments for the donut chart
  let currentPercentage = 0;

  const gradientSegments = stats.orderStatusData
    .filter((item) => item.count > 0)
    .map((item) => {
      const percentage =
        (item.count / totalStatusOrders) * 100;

      const start = currentPercentage;
      const end = currentPercentage + percentage;

      currentPercentage = end;

      return `${statusColors[item.status] || "#9CA3AF"} ${start}% ${end}%`;
    });

  const donutStyle = {
    background:
      totalStatusOrders > 0
        ? `conic-gradient(${gradientSegments.join(", ")})`
        : "#E5E7EB",
  };

  return (
    <div>
      {/* Dashboard Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-luxe-brown">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Welcome to your LuxeSkin store management dashboard.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <Icon size={22} className="text-luxe-brown" />
              </div>

              <p className="mt-4 text-3xl font-bold text-luxe-brown">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sales and Order Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Sales Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-luxe-brown">
                Sales Overview
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Monthly sales for the last 6 months
              </p>
            </div>

            <TrendingUp
              size={23}
              className="text-luxe-brown"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>

            <p className="mt-1 text-2xl font-bold text-luxe-brown">
              {formatCurrency(stats.totalSales)}
            </p>
          </div>

          <div className="flex h-56 items-end justify-between gap-3 border-b border-gray-200 px-2">
            {stats.salesData.map((item, index) => {
              const height =
                item.sales === 0
                  ? 0
                  : Math.max(
                      (item.sales / maxSales) * 100,
                      5
                    );

              return (
                <div
                  key={`${item.month}-${item.year}`}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <p className="mb-2 text-center text-xs text-gray-500">
                    {item.sales > 0
                      ? formatCurrency(item.sales)
                      : ""}
                  </p>

                  <div
                    className="w-full max-w-12 rounded-t-md bg-luxe-brown transition-all duration-300 hover:opacity-75"
                    style={{
                      height: `${height}%`,
                      minHeight:
                        item.sales === 0 ? "3px" : undefined,
                      opacity: index === 5 ? 1 : 0.75,
                    }}
                    title={`${item.month} ${item.year}: ${formatCurrency(item.sales)}`}
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    {item.month}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Cancelled orders are excluded from sales.
          </p>
        </div>

        {/* Order Status Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-luxe-brown">
                Order Status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Distribution of all orders
              </p>
            </div>

            <ChartNoAxesColumnIncreasing
              size={23}
              className="text-luxe-brown"
            />
          </div>

          <div className="flex flex-col items-center gap-8 sm:flex-row">
            {/* Donut Chart */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              <div
                className="h-44 w-44 rounded-full"
                style={donutStyle}
              />

              <div className="absolute flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <p className="text-3xl font-bold text-luxe-brown">
                  {stats.orders}
                </p>

                <p className="text-xs text-gray-500">
                  Total Orders
                </p>
              </div>
            </div>

            {/* Status Legend */}
            <div className="w-full space-y-4">
              {stats.orderStatusData.map((item) => {
                const percentage =
                  totalStatusOrders > 0
                    ? (item.count / totalStatusOrders) * 100
                    : 0;

                return (
                  <div key={item.status}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              statusColors[item.status] || "#9CA3AF",
                          }}
                        />

                        <span className="text-sm text-gray-600">
                          {item.status}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-luxe-brown">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            statusColors[item.status] || "#9CA3AF",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
