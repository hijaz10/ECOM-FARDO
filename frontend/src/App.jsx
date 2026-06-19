import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/LogIn";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import NavBar from "./components/NavBar";
import Hero from "./components/Test";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Faq from "./pages/Faq";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsBanner from "./components/TermsBanner";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          removeDelay: 100,
          style: {
            background: "#faf7f5",
            color: "#1f1a1c",
            borderRadius: "14px",
            padding: "14px 16px",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "0.9rem",
            letterSpacing: "0.02em",
            lineHeight: "1.3",
            boxShadow: "0 10px 25px rgba(31, 26, 28, 0.06)",
          },
          success: {
            style: { borderLeft: "4px solid #b88a8f" },
            iconTheme: { primary: "#b88a8f", secondary: "#faf7f5" },
          },
          error: {
            style: {
              borderLeft: "4px solid #d66a6a",
              background: "#fff5f5",
              color: "#2a1a1a",
            },
            iconTheme: { primary: "#d66a6a", secondary: "#fff5f5" },
          },
          loading: {
            style: { borderLeft: "4px solid #c69ca1" },
            iconTheme: { primary: "#c69ca1", secondary: "#faf7f5" },
          },
        }}
      />

      <SearchBar />

      {/* PAGE CONTENT */}
      <div className="pt-16 p-4 sm:px-[3vw] md:px-[4vw] lg:px-[5vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Faqs" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <TermsBanner />
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default App;
