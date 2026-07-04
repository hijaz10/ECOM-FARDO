import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function ProductItems({ id, image, name, price }) {
  const navigate = useNavigate();
  const { currency, products } = useContext(ShopContext);

  const product = products.find((p) => p._id === id);
  const isSoldOut = product?.quantity === 0;
  const isOnSale = product?.onSale && product?.discountPercent > 0;

  const salePrice = isOnSale
    ? (price * (1 - product.discountPercent / 100)).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : null;

  const formattedPrice = Number(price).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      onClick={() => !isSoldOut && navigate(`/product/${id}`)}
      className={`flex flex-col gap-2 ${
        isSoldOut ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className={`w-full object-cover object-top transition-transform duration-500 ${
            !isSoldOut ? "hover:scale-105" : ""
          }`}
          style={{ aspectRatio: "3/4" }}
        />

        {isOnSale && !isSoldOut && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-2.5 py-1">
              -{product.discountPercent}%
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="bg-white text-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>

        {isOnSale ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-primary font-semibold">
              {currency}
              {salePrice}
            </p>
            <p className="text-xs text-muted-foreground line-through">
              {currency}
              {formattedPrice}
            </p>
          </div>
        ) : (
          <p className="text-sm text-primary font-semibold">
            {currency}
            {formattedPrice}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductItems;
