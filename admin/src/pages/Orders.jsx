import React, { useEffect, useState } from "react";
import axios from "axios";
import { PackageCheck } from "lucide-react";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/status`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 mt-6">
      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-6 uppercase tracking-[0.25em] text-foreground">
        All Orders
      </p>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col gap-4 border border-border/60 bg-background/70 backdrop-blur-md p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                <PackageCheck size={26} className="text-primary mt-1" />
              </div>
              <div className="flex flex-col gap-2 min-w-0 w-full">
                <div className="flex flex-col gap-1">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p className="text-xs sm:text-sm text-foreground font-medium wrap-break-word leading-relaxed">
                        {item.name} x{item.quantity}
                      </p>
                      {item.shade && (
                        <p className="text-xs text-muted-foreground">
                          Shade: {item.shade}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.address.city}, {order.address.country}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.address.phone}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span>Items: {order.items.length}</span>
                  <span>•</span>
                  <span>{order.paymentMethod}</span>
                  <span>•</span>
                  <span
                    className={
                      order.payment
                        ? "text-green-500 font-medium"
                        : "text-red-400 font-medium"
                    }
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.date).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-border">
              <p className="text-base sm:text-lg font-bold text-foreground">
                {`₦${order.amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="w-full sm:w-55 border border-border bg-background/80 backdrop-blur-md px-3 py-2 rounded-lg text-xs sm:text-sm text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-24 text-muted-foreground text-sm">
          No orders found.
        </div>
      )}
    </div>
  );
}

export default Orders;
