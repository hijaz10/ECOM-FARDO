import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

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
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <p className="text-2xl font-bold mb-8 uppercase tracking-widest text-foreground">
        Add Product
      </p>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
        {/* UPLOAD IMAGES */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">
            Product Images
          </p>
          <div className="flex gap-3">
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
                  className="w-24 h-24 object-cover border border-border hover:border-primary transition-colors"
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
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Product Name
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
            className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
            Description
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
            rows={4}
            className="border border-border px-4 py-2 text-sm outline-none w-full resize-none bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
        </div>

        {/* CATEGORY + SUBCATEGORY + PRICE */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Category
            </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Sub Category
            </p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground focus:border-primary transition-colors"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">
              Price ($)
            </p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
              min={0}
              className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* SIZES */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">
            Sizes
          </p>
          <div className="flex gap-2 flex-wrap">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 text-sm border transition-all ${
                  sizes.includes(size)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* BESTSELLER */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <label
            htmlFor="bestSeller"
            className="text-sm font-semibold uppercase tracking-widest cursor-pointer text-foreground"
          >
            Mark as Bestseller
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-fit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Add;
