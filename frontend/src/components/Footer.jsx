import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "../utils/toast";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Collection", to: "/collection" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const contactItems = [
  {
    icon: (
      <svg
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.2 10.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    text: "+234 707 089 0004",
    href: "tel:+2347070890004",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    text: "support@fardocosmetics.com",
    href: "mailto:support@fardocosmetics.com",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "Abuja, Nigeria",
    href: null,
  },
];

function Footer() {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/newsletter/subscribe`,
        { email },
      );

      if (response.data.success) {
        toast.success("Subscribed! Check your inbox");
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-foreground text-white">
      {/* TOP */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-8 border-b border-white/10">
        <h1
          className="font-black uppercase"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-2px",
          }}
        >
          FARDO<span className="text-primary">.</span>
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] mt-2 mb-8 text-white/40">
          Premium Cosmetics
        </p>

        <form
          onSubmit={handleSubscribe}
          className="w-full max-w-md flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Join our newsletter"
            className="w-full px-4 py-3 text-sm outline-none bg-white/5 border border-white/10"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-3 text-xs font-semibold uppercase bg-primary"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-12 py-10">
        {/* CONTACT */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] mb-5 text-primary">
            Contact
          </p>

          <div className="flex flex-col gap-3">
            {contactItems.map((item, i) => (
              <div key={i} className="flex gap-2 text-white/50 text-xs">
                <span>{item.icon}</span>

                {item.href ? (
                  <a href={item.href} className="hover:text-white">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] mb-5 text-primary">
            Quick Links
          </p>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs text-white/50 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SUPPORT */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] mb-5 text-primary">
            Support
          </p>

          <div className="flex flex-col gap-3">
            {[
              { label: "My Orders", to: "/orders" },
              { label: "Track Order", to: "/orders" },
              { label: "My Profile", to: "/profile" },
              { label: "FAQS", to: "/faqs" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs text-white/50 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* LEGAL */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] mb-5 text-primary">
            Legal
          </p>

          <div className="flex flex-col gap-3">
            {[
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms-of-service" },
              { label: "Return Policy", to: "/return-policy" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-xs text-white/50 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-6 sm:px-12 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between border-t border-white/10">
        <p className="text-xs text-white/30">
          © {year} Fardo Cosmetics. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/privacy-policy"
            className="text-xs text-white/40 hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-xs text-white/40 hover:text-white"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
