import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";

const categories = [
  "Lipstick",
  "Lipgloss",
  "Lipliner",
  "Foundation",
  "Powder",
  "Mascara",
  "Brush",
  "Accessories",
];

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shades, setShades] = useState([]);
  const [shadeInput, setShadeInput] = useState({
    name: "",
    description: "",
    hex: "#000000",
  });
  const [description2, setDescription2] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Lipstick");
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [discountPercent, setDiscountPercent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("description2", description2);
      formData.append("shades", JSON.stringify(shades));
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestSeller", bestSeller);
      formData.append("quantity", quantity);
      formData.append("onSale", onSale);
      formData.append("discountPercent", onSale ? discountPercent : 0);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        alert("Product added successfully!");
        setName("");
        setDescription("");
        setDescription2("");
        setShades([]);
        setShadeInput({ name: "", description: "", hex: "#000000" });
        setPrice("");
        setQuantity("");
        setCategory("Lipstick");
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setOnSale(false);
        setDiscountPercent("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
      <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 uppercase tracking-widest text-foreground">
        Add Product
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 sm:gap-6 w-full max-w-3xl"
      >
        {/* UPLOAD IMAGES */}
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">
            Product Images
          </p>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {[
              { state: image1, setter: setImage1, id: "image1" },
              { state: image2, setter: setImage2, id: "image2" },
              { state: image3, setter: setImage3, id: "image3" },
              { state: image4, setter: setImage4, id: "image4" },
            ].map(({ state, setter, id }) => (
              <label key={id} htmlFor={id} className="cursor-pointer">
                <img
                  src={state ? URL.createObjectURL(state) : assets.upload_area}
                  alt="upload"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover border border-border hover:border-primary transition-colors"
                />
                <input
                  type="file"
                  id={id}
                  hidden
                  onChange={(e) => setter(e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* PRODUCT NAME */}
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Product Name
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
            className="border border-border px-3 sm:px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Description
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
            rows={4}
            className="border border-border px-3 sm:px-4 py-2.5 text-sm outline-none w-full resize-none bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* DESCRIPTION 2 */}
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Description 2{" "}
            <span className="text-muted-foreground font-normal normal-case tracking-normal text-xs">
              (optional)
            </span>
          </p>
          <textarea
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            rows={3}
            className="border border-border px-3 sm:px-4 py-2.5 text-sm outline-none w-full resize-none bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* SHADES */}
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Shades{" "}
            <span className="text-muted-foreground font-normal normal-case tracking-normal text-xs">
              (optional)
            </span>
          </p>

          {shades.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {shades.map((shade, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-border px-3 py-1.5 text-xs"
                >
                  <div
                    className="w-4 h-4 rounded-full shrink-0 border border-border"
                    style={{ background: shade.hex }}
                  />
                  <span className="text-foreground">{shade.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setShades((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-muted-foreground hover:text-red-500 ml-1 text-base leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SHADE INPUTS  */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={shadeInput.name}
                onChange={(e) =>
                  setShadeInput((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Shade name e.g. Rosewood"
                className="border border-border px-3 py-2.5 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors flex-1"
              />
              <input
                type="text"
                value={shadeInput.description}
                onChange={(e) =>
                  setShadeInput((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="e.g. Medium, warm pink"
                className="border border-border px-3 py-2.5 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors flex-1"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 border border-border px-3 py-2.5 flex-1">
                <label className="text-xs text-muted-foreground whitespace-nowrap">
                  Pick Color
                </label>
                <input
                  type="color"
                  value={shadeInput.hex}
                  onChange={(e) =>
                    setShadeInput((prev) => ({ ...prev, hex: e.target.value }))
                  }
                  className="w-8 h-6 cursor-pointer border-none outline-none bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!shadeInput.name.trim()) return;
                  setShades((prev) => [...prev, { ...shadeInput }]);
                  setShadeInput({ name: "", description: "", hex: "#000000" });
                }}
                className="border border-primary text-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY and  PRICE */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Category
            </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-border px-3 sm:px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Price (NGN)
            </p>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
                min={0}
                className="border border-border px-3 sm:px-4 py-2.5 pr-24 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
              />
              {price && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium pointer-events-none">
                  ₦{Number(price).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Stock Quantity
          </p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter available stock"
            required
            min={0}
            className="border border-border px-4 py-2 text-sm outline-none w-full sm:w-48 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* BESTSELLER */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer shrink-0"
          />
          <label
            htmlFor="bestSeller"
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest cursor-pointer text-foreground"
          >
            Mark as Bestseller
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="onSale"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <label
              htmlFor="onSale"
              className="text-sm font-semibold uppercase tracking-widest cursor-pointer text-foreground"
            >
              Add to Sales Campaign
            </label>
          </div>

          {onSale && (
            <div className="ml-7">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
                Discount Percentage (%)
              </p>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="e.g. 20"
                min={1}
                max={90}
                required={onSale}
                className="border border-border px-4 py-2 text-sm outline-none w-full sm:w-48 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
              />
              {discountPercent && (
                <p className="text-xs text-muted-foreground mt-2">
                  Sale price will be: $
                  {(price * (1 - discountPercent / 100)).toFixed(2)}
                  (was ${price || 0})
                </p>
              )}
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 sm:px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full sm:w-fit ${
            loading
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Add;
