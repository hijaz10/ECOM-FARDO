import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  Mail,
  Banknote,
} from "lucide-react";

function Dashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/stats`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 animate-pulse">
        <div className="h-8 bg-muted w-48 rounded mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      label: "Total Revenue",
      value: `₦${Number(stats.totalRevenue).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <Banknote size={18} />,
      color: "text-primary",
      bg: "bg-secondary",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag size={18} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={18} />,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      icon: <Package size={18} />,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Paid Orders",
      value: stats.paidOrders,
      icon: <CheckCircle size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock size={18} />,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "Delivered",
      value: stats.deliveredOrders,
      icon: <TrendingUp size={18} />,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Subscribers",
      value: stats.totalSubscribers,
      icon: <Mail size={18} />,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
  ];

  const maxRevenue = Math.max(...stats.monthlyRevenue.map((m) => m.revenue), 1);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
      <p className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-widest text-foreground">
        Dashboard
      </p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="border border-border p-3 sm:p-4 lg:p-5 flex flex-col gap-2 sm:gap-3"
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${card.bg} flex items-center justify-center ${card.color} shrink-0`}
            >
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-foreground truncate">
                {card.value}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-0.5 leading-tight">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* MONTHLY REVENUE CHART */}
        <div className="border border-border p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
            Revenue — Last 6 Months
          </p>
          <div className="flex items-end gap-1 sm:gap-3 h-36 sm:h-40">
            {stats.monthlyRevenue.map((m, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1 sm:gap-2"
              >
                <p className="text-[9px] sm:text-xs text-muted-foreground text-center leading-tight">
                  ₦{m.revenue > 0 ? Number(m.revenue).toLocaleString() : 0}
                </p>
                <div
                  className="w-full relative flex items-end"
                  style={{ height: "80px" }}
                >
                  <div
                    className="w-full bg-primary/20 rounded-t transition-all duration-700 relative group"
                    style={{
                      height: `${(m.revenue / maxRevenue) * 100}%`,
                      minHeight: "4px",
                    }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-primary rounded-t"
                      style={{ height: "60%", minHeight: "2px" }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {m.orders} orders
                    </div>
                  </div>
                </div>
                <p className="text-[9px] sm:text-xs text-muted-foreground">
                  {m.month}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="border border-border p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
            Top Products
          </p>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {stats.topProducts.map((p, i) => {
                const max = stats.topProducts[0].count;
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-xs text-foreground truncate flex-1">
                        {p.name}
                      </p>
                      <p className="text-xs font-semibold text-primary shrink-0">
                        {p.count} sold
                      </p>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${(p.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CATEGORY BREAKDOWN */}
        <div className="border border-border p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
            Products by Category
          </p>
          <div className="flex flex-col gap-2 sm:gap-3">
            {stats.categoryBreakdown.map((cat, i) => {
              const total = stats.categoryBreakdown.reduce(
                (sum, c) => sum + c.count,
                0,
              );
              const pct =
                total > 0 ? ((cat.count / total) * 100).toFixed(0) : 0;
              const colors = [
                "bg-primary",
                "bg-blue-400",
                "bg-green-400",
                "bg-orange-400",
                "bg-pink-400",
                "bg-purple-400",
                "bg-yellow-400",
                "bg-red-400",
              ];
              return (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${colors[i % colors.length]}`}
                  />
                  <p className="text-xs text-foreground w-20 sm:w-24 shrink-0 truncate">
                    {cat.name}
                  </p>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[i % colors.length]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0 w-7 text-right">
                    {pct}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="border border-border p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
            Recent Orders
          </p>
          <div className="flex flex-col gap-2 sm:gap-3">
            {stats.recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0 gap-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toDateString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-foreground">
                    ₦{Number(order.amount).toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      order.payment
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
