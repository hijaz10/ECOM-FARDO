import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";

function PlaceOrder() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate("/orders");
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

      {/* RIGHT - CART TOTALS + PAYMENT */}
      <div className="flex flex-col gap-6 sm:w-80">
        {/* CART TOTALS */}
        <div>
          <div className="mb-4">
            <Title text1="CART" text2="TOTALS" />
          </div>
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
        </div>

        {/* PAYMENT METHOD */}
        <div>
          <div className="mb-4">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>
          <div className="flex flex-col gap-3">
            {/* STRIPE */}
            <div
              onClick={() => setPaymentMethod("stripe")}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all ${
                paymentMethod === "stripe" ? "border-primary" : "border-border"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "stripe"
                    ? "border-primary"
                    : "border-muted-foreground"
                }`}
              >
                {paymentMethod === "stripe" && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <img src={assets.stripe_logo} alt="stripe" className="h-5" />
            </div>

            {/* CASH ON DELIVERY */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all ${
                paymentMethod === "cod" ? "border-primary" : "border-border"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cod"
                    ? "border-primary"
                    : "border-muted-foreground"
                }`}
              >
                {paymentMethod === "cod" && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}

export default PlaceOrder;
