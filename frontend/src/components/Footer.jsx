import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16">
        {/* LOGO + DESC */}
        <div>
          <p className="font-prata text-2xl mb-4">
            Fardo<span className="text-muted-foreground">.</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover the latest trends and timeless pieces. We bring quality
            fashion to your doorstep with care and style.
          </p>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <p className="text-base font-semibold mb-4 uppercase tracking-widest">
            Company
          </p>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/collection"
                className="hover:text-primary transition-colors"
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-base font-semibold mb-4 uppercase tracking-widest">
            Get In Touch
          </p>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>+234 800 000 0000</li>
            <li>support@fardo.com</li>
            <li>Abuja, Nigeria</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground px-6">
        <p>© {new Date().getFullYear()} Fardo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
