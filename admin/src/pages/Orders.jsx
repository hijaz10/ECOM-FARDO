// Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PackageCheck } from "lucide-react";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    console.log("token:", token); // check if token exists
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log("response:", response.data); // check what comes back
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
    <div className="p-8">
      <p className="text-2xl font-bold mb-8 uppercase tracking-widest text-foreground">
        All Orders
      </p>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_200px_160px] gap-4 items-start border border-border p-4"
          >
            {/* ORDER ITEMS */}
            <div className="flex gap-4">
              <PackageCheck size={40} className="text-primary shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                {order.items.map((item, index) => (
                  <p
                    key={index}
                    className="text-sm text-foreground font-medium"
                  >
                    {item.name} x{item.quantity}{" "}
                    <span className="text-muted-foreground">({item.size})</span>
                  </p>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  {order.address.firstName} {order.address.lastName} —{" "}
                  {order.address.city}, {order.address.country}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.address.phone}
                </p>
                <p className="text-xs text-muted-foreground">
                  Items: {order.items.length} | Method: {order.paymentMethod} |
                  Payment:{" "}
                  <span
                    className={
                      order.payment ? "text-green-500" : "text-red-400"
                    }
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Date: {new Date(order.date).toDateString()}
                </p>
              </div>
            </div>

            {/* AMOUNT */}
            <p className="text-base font-semibold text-foreground">
              ${order.amount}
            </p>

            {/* STATUS DROPDOWN */}
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              className="border border-border px-3 py-2 text-sm outline-none bg-background text-foreground focus:border-primary transition-colors"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No orders found.
        </div>
      )}
    </div>
  );
}

export default Orders;
