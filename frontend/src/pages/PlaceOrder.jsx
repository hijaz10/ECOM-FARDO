import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Loader } from "lucide-react";

function PlaceOrder() {
  const {
    currency,
    delivery_fee,
    getCartAmount,
    cartItems,
    products,
    token,
    setCartItems,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [token]);

  const paystackConfig = {
    email: formData.email || "customer@fardo.com",
    amount: getCartAmount() * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePaystackPayment = usePaystackPayment(paystackConfig);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.street.trim()) newErrors.street = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.state.trim()) newErrors.state = "Required";
    if (!formData.zip.trim()) newErrors.zip = "Required";
    if (!formData.country.trim()) newErrors.country = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    return newErrors;
  };

  const buildOrderItems = () => {
    const orderItems = [];
    for (const itemId in cartItems) {
      for (const shadeKey in cartItems[itemId]) {
        if (cartItems[itemId][shadeKey] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            orderItems.push({
              ...product,
              shade: shadeKey === "__default__" ? null : shadeKey,
              quantity: cartItems[itemId][shadeKey],
            });
          }
        }
      }
    }
    return orderItems;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      navigate("/login");
      toast.error("Please LogIn to place an order");
      return;
    }

    const cartIsEmpty =
      Object.keys(cartItems).length === 0 ||
      Object.keys(cartItems).every((itemId) =>
        Object.values(cartItems[itemId]).every((qty) => qty === 0),
      );

    if (cartIsEmpty) {
      toast.error("Your cart is empty");
      navigate("/collection");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = buildOrderItems();

      const reference = new Date().getTime().toString();

      const orderData = {
        items: orderItems,
        amount: getCartAmount(),
        address: formData,
        reference,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/place-paystack`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        const orderId = response.data.orderId;

        initializePaystackPayment({
          onSuccess: async (paystackResponse) => {
            try {
              const verifyResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/verify-paystack`,
                {
                  reference:
                    paystackResponse.reference ||
                    paystackResponse.trxref ||
                    reference,
                  orderId,
                },
                { headers: { Authorization: `Bearer ${token}` } },
              );

              if (verifyResponse.data.success) {
                toast.success("Payment successful! Order placed.");
                setCartItems({});
                navigate("/orders");
              } else {
                toast.error(
                  "Payment verification failed. Please contact support.",
                );
                setIsSubmitting(false);
              }
            } catch (error) {
              toast.error("Verification error. Please contact support.");
              setIsSubmitting(false);
            }
          },
          onClose: () => {
            toast.error("Payment cancelled. Complete your order anytime.");
            setIsSubmitting(false);
          },
        });
      } else {
        toast.error(response.data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `border px-4 py-2 text-sm outline-none bg-background placeholder:text-muted-foreground w-full ${
      errors[field] ? "border-red-400" : "border-border"
    }`;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="pt-14 flex flex-col sm:flex-row gap-10"
    >
      {/* LEFT - DELIVERY INFORMATION */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="mb-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <input
            name="email"
            type="text"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            name="street"
            type="text"
            placeholder="Street address"
            value={formData.street}
            onChange={handleChange}
            className={inputClass("street")}
          />
          {errors.street && (
            <p className="text-red-400 text-xs mt-1">{errors.street}</p>
          )}
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={inputClass("city")}
            />
            {errors.city && (
              <p className="text-red-400 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          <div className="w-full">
            <input
              name="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={inputClass("state")}
            />
            {errors.state && (
              <p className="text-red-400 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="zip"
              type="text"
              placeholder="Zip code"
              value={formData.zip}
              onChange={handleChange}
              className={inputClass("zip")}
            />
            {errors.zip && (
              <p className="text-red-400 text-xs mt-1">{errors.zip}</p>
            )}
          </div>
          <div className="w-full">
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass("country")}
            />
            {errors.country && (
              <p className="text-red-400 text-xs mt-1">{errors.country}</p>
            )}
          </div>
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* RIGHT - TOTALS + PAYMENT */}
      <div className="flex flex-col gap-5 sm:w-80">
        {/* CART TOTALS */}
        <div>
          <div className="mb-4">
            <Title text1="CART" text2="TOTALS" />
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <p className="text-muted-foreground">Subtotal</p>
              <p>
                {currency}{" "}
                {getCartAmount().toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="flex flex-col gap-1 py-1 border-b border-border">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping Fee</p>
                <p className="text-primary font-semibold text-xs uppercase tracking-widest">
                  Pay on Delivery
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Delivery fee is collected upon arrival of your order.
              </p>
            </div>

            <div className="flex justify-between py-1 font-semibold text-base">
              <p>Total</p>
              <p>
                {currency}{" "}
                {getCartAmount().toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* DELIVERY NOTICE */}
        <div
          className="flex items-start gap-3 px-4  border border-border"
          style={{ borderLeft: "3px solid var(--color-primary)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
              Delivery Notice
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The amount shown does not include delivery fee. Our delivery team
              will contact you with the fee based on your location. Payment is
              made upon arrival of your order.
            </p>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div>
          <div className="mb-4">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>
          <div className="flex items-center gap-3 border px-4 py-3 border-primary">
            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <p className="text-sm font-medium text-[#00C3F7]">PAYSTACK</p>
          </div>
        </div>

        {/* PLACE ORDER */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          className={`relative px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full overflow-hidden ${
            isSubmitting
              ? "bg-primary text-primary-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {!isSubmitting && (
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          )}

          {/* PROGRESS BAR when submitting */}
          {isSubmitting && (
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-white/40"
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          )}

          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader size={14} />
                </motion.span>
                Processing...
              </motion.span>
            ) : (
              <motion.span
                key="place"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                Place Order
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
}

export default PlaceOrder;
