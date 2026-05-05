import { useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets/assets";
import ScrollToTop from "./ScrollToTop";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/collection", label: "Shop" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  // 🔥 Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${showNav ? "translate-y-0" : "-translate-y-full"}

        ${
          scrolled
            ? "backdrop-blur-xl bg-[rgba(250,247,245,0.88)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] h-14"
            : "bg-[rgba(15,12,12,0.18)] backdrop-blur-xl  h-16"
        }
      `}
    >
      <div className="flex items-center px-6 h-full transition-all duration-500">
        {/* ================= LOGO ================= */}
        <div className="flex items-center">
          <Link
            to="/"
            className={`logo-font text-3xl transition-all duration-500 ${
              scrolled ? "text-foreground" : "text-[#f5f2ef]"
            } ${scrolled ? "scale-90" : "scale-100"}`}
            onClick={<ScrollToTop />}
          >
            Fardo
          </Link>
        </div>

        {/* ================= NAV LINKS ================= */}
        <div className="md:flex hidden items-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.path} className="relative group">
                <NavLink
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide relative transition-colors duration-300 ${
                    scrolled ? "text-foreground" : "text-[#f5f2ef]"
                  }`}
                >
                  {link.label.toUpperCase()}

                  {/* luxury underline glow */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.25)]" />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT ICONS ================= */}
        <div className="flex items-center gap-6 ml-auto">
          {/* SEARCH */}
          <img
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            src={assets.search_icon}
            className={`w-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
              scrolled
                ? "opacity-80 hover:opacity-100"
                : "opacity-90 hover:opacity-100 brightness-[20]"
            }`}
            alt="search"
          />

          {/* PROFILE */}
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className={`w-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                scrolled
                  ? "opacity-80 hover:opacity-100"
                  : "opacity-90 hover:opacity-100 brightness-[20]"
              }`}
              alt="profile"
            />

            {token && (
              <div className="hidden group-hover:block absolute right-0 pt-4">
                <div className="flex flex-col gap-2 w-40 py-4 px-5 bg-[rgba(250,247,245,0.92)] backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/20">
                  <p className="hover:opacity-70 cursor-pointer transition-opacity">
                    My Profile
                  </p>

                  <p
                    className="hover:opacity-70 cursor-pointer transition-opacity"
                    onClick={orders}
                  >
                    Orders
                  </p>

                  <p
                    className="hover:opacity-70 cursor-pointer transition-opacity"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CART */}
          <Link to="/cart" className="relative group flex items-center">
            {/* CART ICON */}
            <img
              src={assets.cart_icon}
              alt="cart"
              className={`w-4 transition-all duration-300 group-hover:-translate-y-1 ${
                scrolled
                  ? "opacity-80 group-hover:opacity-100"
                  : "opacity-90 group-hover:opacity-100 brightness-[20]"
              }`}
            />

            {/* CART COUNT BADGE */}
            <p
              className="
                absolute -right-1 -bottom-1
                w-3 h-3 text-[8px]
                flex items-center justify-center
                bg-black text-white rounded-full
                shadow-md
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:scale-110
              "
            >
              {getCartCount()}
            </p>
          </Link>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className={`md:hidden ml-auto p-2 transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-[#f5f2ef]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div
          className="
      md:hidden
      px-6 pb-8 pt-4
      bg-[rgba(250,247,245,0.96)]
      backdrop-blur-2xl
      border-t border-white/20
      shadow-[0_20px_60px_rgba(0,0,0,0.06)]
    "
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.path} className="w-full">
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `
                flex items-center w-full
                px-5 py-4
                rounded-2xl

                text-sm font-semibold tracking-[0.18em] uppercase

                transition-all duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  isActive
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]
                      scale-[1.02]
                    `
                    : `
                      text-foreground
                      hover:bg-secondary
                      hover:translate-x-1
                    `
                }
              `
                  }
                >
                  {link.label}
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
