import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

function Orders() {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            tempData.push({
              ...product,
              size,
              quantity: cartItems[itemId][size],
              date: new Date().toDateString(),
              payment: "COD",
              status: "Order Placed",
            });
          }
        }
      }
    }
    setOrderData(tempData);
  }, [cartItems, products]);

  return (
    <div className="">
      {/* TITLE */}
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* ORDERS LIST */}
      <div className="flex flex-col">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-t border-border"
          >
            {/* IMAGE + INFO */}
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
                  {item.price}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-1">
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Date: {item.date}</p>
                  <p>Payment: {item.payment}</p>
                </div>
              </div>
            </div>

            {/* STATUS + TRACK */}
            <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 justify-between sm:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm font-medium">{item.status}</p>
              </div>
              <button className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {orderData.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          You have no orders yet.
        </div>
      )}
    </div>
  );
}

export default Orders;
