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
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="pt-32 p-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <NavBar />
        <SearchBar />
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
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
