import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { SkeletonOrderRow } from "../components/Skeloton";
import toast from "../utils/toast";

function Orders() {
  const { products, currency, cartItems, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      if (!token) return null;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/user-orders`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <div className="animate-zoom-in animation-delay-300">
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonOrderRow key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-t border-border"
              >
                <div className="flex gap-4 flex-1">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover object-top shrink-0"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {currency}
                      {item.price.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    {item.shade && (
                      <p className="text-xs text-muted-foreground">
                        Shade: {item.shade}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-1">
                      <p>Quantity: {item.quantity}</p>
                      <p>Date: {item.date}</p>
                      <p>Payment: {item.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 justify-between sm:justify-start">
                  <p className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all">
                    Order Status
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <p className="text-sm font-medium">{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orderData.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              You have no orders yet.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
