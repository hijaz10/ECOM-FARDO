import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets/assets";
import { useNavigate } from "react-router-dom";
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/collection", label: "Collection" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    setShowSearch,
    showSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const orders = () => {
    navigate("/orders");
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-background border-b border-muted-foreground z-50">
      <div className="flex items-center px-6 h-16">
        {/* ================= LEFT (LOGO) ================= */}
        <div className="flex items-center">
          <Link
            to="/"
            className="font-syne font-extrabold tracking-tight text-2xl"
          >
            Fardo<span className="text-muted-foreground">.</span>
          </Link>
        </div>

        {/* ================= MIDDLE (NAV LINKS) ================= */}
        <div className="md:flex hidden gap-6 items-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="relative pb-1 font-bold text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-muted-foreground after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT (ICONS) ================= */}
        <div className="flex items-center gap-6 cursor-pointer ml-auto">
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 min-w-5"
            alt="search_icon"
          />

          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile_icon"
              className="w-5 min-w-5"
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded">
                  <p className="hover:text-primary">My Profile</p>
                  <p className="hover:text-primary" onClick={orders}>
                    Orders
                  </p>
                  <p className="hover:text-primary" onClick={logout}>
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="cart_icon"
              className="w-5 min-w-5"
            />
            <p className="absolute -right-1.25 w-4 h-4 -bottom-1.25 text-center leading-4 bg-secondary-foreground text-white rounded aspect-square text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-6 pb-6 gap-4 border-t border-muted-foreground bg-background">
          <ul className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-sm"
                >
                  {link.label.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
