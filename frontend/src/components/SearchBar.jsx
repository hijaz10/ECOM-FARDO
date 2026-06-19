import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { X, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch, products } =
    useContext(ShopContext);

  const location = useLocation();
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase();

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subCategory.toLowerCase().includes(query)
        );
      })
      .slice(0, 5);
  }, [search, products]);

  if (!showSearch || !location.pathname.includes("collection")) {
    return null;
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product._id}`);
    setSearch("");
    setShowSearch(false);
  };

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-[#faf7f5]/95 backdrop-blur-xl">
      <div className="flex items-center justify-center px-4 py-6">
        <div className="relative w-full sm:w-1/2">
          {/* SEARCH INPUT */}
          <div className="group flex items-center gap-3 rounded-full border border-border/70 bg-white/80 px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-[0_15px_60px_rgba(0,0,0,0.08)]">
            <Search size={18} className="shrink-0 text-muted-foreground" />

            <input
              type="text"
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beauty essentials..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="flex items-center justify-center rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* SUGGESTIONS */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-full overflow-hidden rounded-3xl border border-border/60 bg-white/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              <div className="border-b border-border/50 px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Suggested Products
                </p>
              </div>

              {suggestions.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all duration-300 hover:bg-[#f8f5f2]"
                >
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-14 w-14 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">
                      {product.name}
                    </p>

                    <p className="text-xs tracking-wide text-muted-foreground">
                      {product.category} · {product.subCategory}
                    </p>
                  </div>

                  <p className="ml-auto text-sm font-semibold text-primary">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* NO RESULTS */}
          {search && suggestions.length === 0 && (
            <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-full rounded-3xl border border-border/60 bg-white/95 px-5 py-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              <p className="text-sm text-muted-foreground">
                No products found for{" "}
                <span className="font-medium text-foreground">"{search}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
