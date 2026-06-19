import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { SkeletonRow } from "../components/Skeloton";

function Cart() {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    delivery_fee,
    getCartAmount,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const shadeKey in cartItems[itemId]) {
          if (cartItems[itemId][shadeKey] > 0) {
            tempData.push({
              _id: itemId,
              shade: shadeKey === "__default__" ? null : shadeKey,
              quantity: cartItems[itemId][shadeKey],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-14 animate-slide-in-right">
      <div className="mb-8">
        <Title text1="YOUR" text2="CART" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            {cartData.map((item, index) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              const shadeData = item.shade
                ? product.shades?.find((s) => s.name === item.shade)
                : null;

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4 border-t border-border"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover object-top shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <p className="text-sm text-muted-foreground">
                        {currency}
                        {product.price}
                      </p>

                      {/* SHADE BADGE */}
                      {item.shade && (
                        <div className="flex items-center gap-1.5">
                          {shadeData?.hex && (
                            <div
                              className="w-3 h-3 rounded-full border border-border shrink-0"
                              style={{ background: shadeData.hex }}
                            />
                          )}
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "var(--color-muted)",
                              color: "var(--color-muted-foreground)",
                            }}
                          >
                            {item.shade}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.shade,
                        Number(e.target.value),
                      )
                    }
                    className="w-16 border border-border px-2 py-1 text-sm outline-none bg-background text-center"
                  />
                  <Trash2
                    size={18}
                    className="text-muted-foreground hover:text-red-500 cursor-pointer transition-colors shrink-0"
                    onClick={() => updateQuantity(item._id, item.shade, 0)}
                  />
                </div>
              );
            })}
          </div>

          {cartData.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              Your cart is empty.
            </div>
          )}

          {cartData.length > 0 && (
            <div className="flex justify-end mt-16">
              <div className="w-full sm:w-112.5 flex flex-col gap-4">
                <Title text1="CART" text2="TOTALS" />
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>
                      {currency} {getCartAmount().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <p className="text-muted-foreground">Shipping Fee</p>
                    <p>
                      {currency} {delivery_fee}.00
                    </p>
                  </div>
                  <div className="flex justify-between py-2 font-semibold text-base">
                    <p>Total</p>
                    <p>
                      {currency} {(getCartAmount() + delivery_fee).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full sm:w-fit self-end"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
