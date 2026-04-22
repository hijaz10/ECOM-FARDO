// List.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function List({ token }) {
  const [products, setProducts] = useState([]);

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
    <div className="p-8">
      <p className="text-2xl font-bold mb-8 uppercase tracking-widest text-foreground">
        All Products
      </p>

      {/* TABLE HEADER */}
      <div className="hidden sm:grid grid-cols-[80px_1fr_120px_100px_80px] gap-4 py-3 px-4 border border-border bg-muted text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* PRODUCT ROWS */}
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_120px_100px_80px] gap-4 items-center py-3 px-4 border border-border text-sm"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-16 h-16 object-cover object-top"
            />
            <p className="text-foreground font-medium">{product.name}</p>
            <p className="text-muted-foreground hidden sm:block">
              {product.category} / {product.subCategory}
            </p>
            <p className="text-foreground hidden sm:block">${product.price}</p>
            <div className="hidden sm:flex justify-center">
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
        <div className="text-center py-20 text-muted-foreground text-sm">
          No products found.
        </div>
      )}
    </div>
  );
}

export default List;
