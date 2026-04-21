import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  //const [products, setProducts] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /*
  useEffect(() => {
    getProductsData();
  }, []);
*/

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setCartItems((prev) => {
      const updated = structuredClone(prev);

      if (updated[itemId]) {
        if (updated[itemId][size]) {
          updated[itemId][size] += 1;
        } else {
          updated[itemId][size] = 1;
        }
      } else {
        updated[itemId] = { [size]: 1 };
      }

      return updated;
    });
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      updated[itemId][size] = quantity;
      return updated;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  /*
  const getProductsData = async () => {
    try {
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

  */

  const value = {
    products,
    currency,
    delivery_fee,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItems,
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
