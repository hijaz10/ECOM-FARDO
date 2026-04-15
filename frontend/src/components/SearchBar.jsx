import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { X, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();

  // only show on collection page
  if (!showSearch || !location.pathname.includes("collection")) return null;

  return (
    <div className="border-t border-b border-border bg-background">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 border border-border px-4 py-2 w-full sm:w-1/2">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground"
          />
          {search && (
            <X
              size={16}
              className="text-muted-foreground cursor-pointer shrink-0"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <X
          size={20}
          className="ml-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
