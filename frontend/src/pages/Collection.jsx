import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (search && showSearch) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      filtered = filtered.filter((p) => category.includes(p.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((p) => subCategory.includes(p.subCategory));
    }

    setFilterProducts(filtered);
  };

  const applySort = () => {
    const sorted = [...filterProducts];
    if (sortType === "low-high") {
      setFilterProducts(sorted.sort((a, b) => a.price - b.price));
    } else if (sortType === "high-low") {
      setFilterProducts(sorted.sort((a, b) => b.price - a.price));
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch]);

  useEffect(() => {
    applySort();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10">
      {/* SIDEBAR */}
      <div className="min-w-60">
        {/* FILTERS heading*/}
        <div className="flex items-center h-10 mb-4">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-xl font-semibold uppercase tracking-widest flex items-center gap-2 cursor-pointer sm:cursor-default"
          >
            Filters
            <span
              className={`sm:hidden text-xs transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`}
            >
              ▶
            </span>
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div
          className={`border border-border pl-5 py-4 mb-4 ${showFilter ? "block" : "hidden"} sm:block`}
        >
          <p className="text-sm font-medium uppercase tracking-widest mb-3">
            Category
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["Men", "Women", "Kids"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={(e) => toggleCategory(e.target.value)}
                  className="accent-primary"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY FILTER */}
        <div
          className={`border border-border pl-5 py-4 ${showFilter ? "block" : "hidden"} sm:block`}
        >
          <p className="text-sm font-medium uppercase tracking-widest mb-3">
            Type
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={(e) => toggleSubCategory(e.target.value)}
                  className="accent-primary"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">
        {/* TOP BAR - same height as FILTERS heading */}
        <div className="flex justify-between items-center h-10 mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-border text-sm px-3 py-1.5 bg-background text-foreground outline-none"
          >
            <option value="relevant">Sort: Relevant</option>
            <option value="low-high">Sort: Low to High</option>
            <option value="high-low">Sort: High to Low</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {filterProducts.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-20">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
