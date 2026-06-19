import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "../utils/toast";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "NGN ";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        if (
          response.data &&
          response.data.success === false &&
          (response.data.message === "Session expired. Please login again." ||
            response.data.message === "Please login to continue" ||
            response.data.message === "Not authorized, login again")
        ) {
          setToken("");
          setCartItems({});
          localStorage.removeItem("token");
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // cleanup on unmount
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId, shade = null) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      const key = shade || "__default__";

      if (!updated[itemId]) {
        updated[itemId] = {};
      }
      updated[itemId][key] = (updated[itemId][key] || 0) + 1;
      return updated;
    });
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const key in cartItems[itemId]) {
        count += cartItems[itemId][key];
      }
    }
    return count;
  };

  const updateQuantity = (itemId, shade, quantity) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      const key = shade || "__default__";
      if (quantity === 0) {
        delete updated[itemId][key];
        if (Object.keys(updated[itemId]).length === 0) delete updated[itemId];
      } else {
        updated[itemId][key] = quantity;
      }
      return updated;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const key in cartItems[itemId]) {
        total += product.price * cartItems[itemId][key];
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      if (products.length > 0) return;
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
