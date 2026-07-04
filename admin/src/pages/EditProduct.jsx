import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

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

function EditProduct({ token }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    description2: "",
    price: "",
    category: "Lipstick",
    quantity: "",
    bestSeller: false,
    onSale: false,
    discountPercent: "",
  });
  const [shades, setShades] = useState([]);
  const [shadeInput, setShadeInput] = useState({
    name: "",
    description: "",
    hex: "#000000",
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/single/${productId}`,
      );
      if (response.data.success) {
        const p = response.data.product;
        setProduct(p);
        setFormData({
          name: p.name,
          description: p.description,
          description2: p.description2 || "",
          price: p.price,
          category: p.category,
          quantity: p.quantity || 0,
          bestSeller: p.bestSeller,
          onSale: p.onSale || false,
          discountPercent: p.discountPercent || "",
        });
        setShades(p.shades || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/edit`,
        {
          id: productId,
          ...formData,
          shades: JSON.stringify(shades),
          discountPercent: formData.onSale ? formData.discountPercent : 0,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        alert("Product updated successfully!");
        navigate("/list");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-4 md:p-8 animate-pulse w-full max-w-2xl mx-auto">
        <div className="h-8 bg-muted w-48 rounded mb-8" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded mb-4" />
        ))}
      </div>
    );
  }

  if (!product) {
    return <div className="p-8 text-muted-foreground">Product not found.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 md:px-8 md:py-10">
      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-6 md:mb-8 uppercase tracking-widest text-foreground">
        Edit Product
      </p>

      {/* CURRENT IMAGES - view only */}
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">
          Product Images{" "}
          <span className="text-muted-foreground font-normal normal-case tracking-normal text-xs ml-1">
            (cannot be changed)
          </span>
        </p>
        <div className="flex gap-3 flex-wrap">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`img-${i}`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-border opacity-70"
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* NAME */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Product Name
          </p>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-border px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Description
          </p>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
            className="border border-border px-4 py-2.5 text-sm outline-none w-full resize-none bg-background text-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* DESCRIPTION 2 */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Description 2{" "}
            <span className="text-muted-foreground font-normal normal-case tracking-normal text-xs ml-1">
              (ingredients / extra details — optional)
            </span>
          </p>
          <textarea
            value={formData.description2}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description2: e.target.value }))
            }
            rows={3}
            className="border border-border px-4 py-2.5 text-sm outline-none w-full resize-none bg-background text-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Category
            </p>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="border border-border px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Price (NGN)
            </p>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              min={0}
              className="border border-border px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* STOCK QUANTITY */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Stock Quantity
          </p>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, quantity: e.target.value }))
            }
            min={0}
            className="border border-border px-4 py-2.5 text-sm outline-none w-full sm:w-48 bg-background text-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* SHADES */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Shades{" "}
            <span className="text-muted-foreground font-normal normal-case tracking-normal text-xs ml-1">
              — optional
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
                    className="text-muted-foreground hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={shadeInput.name}
                onChange={(e) =>
                  setShadeInput((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Shade name"
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
              <div className="flex items-center gap-2 border border-border px-3 py-2 flex-1">
                <label className="text-xs text-muted-foreground">Color</label>
                <input
                  type="color"
                  value={shadeInput.hex}
                  onChange={(e) =>
                    setShadeInput((prev) => ({ ...prev, hex: e.target.value }))
                  }
                  className="w-8 h-6 cursor-pointer border-none outline-none bg-transparent"
                />
                <span className="text-xs text-muted-foreground ml-1">
                  {shadeInput.hex}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!shadeInput.name.trim()) return;
                  setShades((prev) => [...prev, { ...shadeInput }]);
                  setShadeInput({ name: "", description: "", hex: "#000000" });
                }}
                className="border border-primary text-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* BESTSELLER */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="bestSeller"
            checked={formData.bestSeller}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bestSeller: e.target.checked }))
            }
            className="w-4 h-4 accent-primary cursor-pointer shrink-0"
          />
          <label
            htmlFor="bestSeller"
            className="text-sm font-semibold uppercase tracking-widest cursor-pointer text-foreground"
          >
            Mark as Bestseller
          </label>
        </div>

        {/* SALES CAMPAIGN */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="onSale"
              checked={formData.onSale}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  onSale: e.target.checked,
                  discountPercent: e.target.checked ? prev.discountPercent : "",
                }));
              }}
              className="w-4 h-4 accent-primary cursor-pointer shrink-0"
            />
            <label
              htmlFor="onSale"
              className="text-sm font-semibold uppercase tracking-widest cursor-pointer text-foreground"
            >
              Add to Sales Campaign
            </label>
          </div>

          {formData.onSale && (
            <div className="ml-7 flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
                Discount Percentage (%)
              </p>
              <input
                type="number"
                value={formData.discountPercent}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountPercent: e.target.value,
                  }))
                }
                placeholder="e.g. 20"
                min={1}
                max={90}
                className="border border-border px-4 py-2.5 text-sm outline-none w-full sm:w-48 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
              />
              {formData.discountPercent && formData.price && (
                <p className="text-xs text-muted-foreground">
                  Sale price will be:{" "}
                  <span className="text-primary font-semibold">
                    ₦
                    {(
                      formData.price *
                      (1 - formData.discountPercent / 100)
                    ).toFixed(2)}
                  </span>{" "}
                  <span className="line-through">
                    ₦{Number(formData.price).toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className={`w-full sm:w-auto px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
              saving
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/list")}
            className="w-full sm:w-auto px-8 py-3 text-sm font-semibold uppercase tracking-widest border border-border hover:border-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
