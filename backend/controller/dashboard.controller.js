import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.models.js";
import subscriberModel from "../models/subcriber.model.js";

const getDashboardStats = async (req, res) => {
  try {
    const [orders, users, products, subscribers] = await Promise.all([
      orderModel.find({}).lean(),
      userModel.find({}).lean(),
      productModel.find({}).lean(),
      subscriberModel.find({}).lean(),
    ]);

    const totalRevenue = orders
      .filter((o) => o.payment)
      .reduce((sum, o) => sum + o.amount, 0);

    const pendingOrders = orders.filter(
      (o) => o.status === "Order Placed",
    ).length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "Delivered",
    ).length;
    const paidOrders = orders.filter((o) => o.payment).length;

    // revenue by month (last 6 months)
    const now = new Date();
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthOrders = orders.filter(
        (o) =>
          o.payment &&
          new Date(o.date) >= month &&
          new Date(o.date) < nextMonth,
      );
      monthlyRevenue.push({
        month: month.toLocaleString("default", { month: "short" }),
        revenue: monthOrders.reduce((sum, o) => sum + o.amount, 0),
        orders: monthOrders.length,
      });
    }

    // top products by order count
    const productCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCount[item.name] =
          (productCount[item.name] || 0) + item.quantity;
      });
    });
    const topProducts = Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // recent orders
    const recentOrders = orders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // category breakdown
    const categoryCount = {};
    products.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalProducts: products.length,
        totalSubscribers: subscribers.length,
        pendingOrders,
        deliveredOrders,
        paidOrders,
        monthlyRevenue,
        topProducts,
        recentOrders,
        categoryBreakdown: Object.entries(categoryCount).map(
          ([name, count]) => ({ name, count }),
        ),
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getDashboardStats };
