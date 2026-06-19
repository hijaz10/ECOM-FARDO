import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function List({ token }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/list`,
      );
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        await fetchProducts();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 mt-6">
      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-6 uppercase tracking-[0.25em] text-foreground">
        All Products
      </p>

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 py-3 px-3 sm:px-4 border border-border/60 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover object-top rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {product.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {product.category}
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                ₦
                {product.price.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  product.quantity === 0
                    ? "bg-red-500"
                    : product.quantity <= 5
                      ? "bg-orange-400"
                      : "bg-green-500"
                }`}
              />
              <p
                className={`text-xs font-medium ${
                  product.quantity === 0
                    ? "text-red-500"
                    : product.quantity <= 5
                      ? "text-orange-400"
                      : "text-muted-foreground"
                }`}
              >
                {product.quantity === 0
                  ? "Sold Out"
                  : product.quantity <= 5
                    ? `Low Stock (${product.quantity})`
                    : `In Stock (${product.quantity})`}
              </p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={() => navigate(`/edit-product?id=${product._id}`)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Pencil size={14} />
              </button>
              <Trash2
                size={16}
                className="text-muted-foreground hover:text-red-500 cursor-pointer transition-colors"
                onClick={() => removeProduct(product._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-24 text-muted-foreground text-sm">
          No products found.
        </div>
      )}
    </div>
  );
}

export default List;
