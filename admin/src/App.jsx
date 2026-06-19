import React, { useState, useEffect } from "react";
import Login from "./components/LogIn";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Newsletter from "./pages/Newsletter";
import { Routes, Route } from "react-router-dom";

import axios from "axios"; // ADD

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Subscribers from "./pages/Newsletter";
import Dashboard from "./pages/Dashboard";
import PaymentHistory from "./pages/PaymentHistory";
import EditProduct from "./pages/EditProduct";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleSetToken = (t) => {
    setToken(t);

    if (t) {
      localStorage.setItem("token", t);
    } else {
      localStorage.removeItem("token");
    }
  };

  // AUTO LOGOUT WHEN TOKEN EXPIRES
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        if (
          response.data &&
          response.data.success === false &&
          (response.data.message === "jwt expired" ||
            response.data.message === "Session expired. Please login again." ||
            response.data.message === "Not authorized, login again")
        ) {
          handleSetToken("");
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // LOGIN SCREEN
  if (!token) {
    return <Login setToken={handleSetToken} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* TOASTS */}
      <ToastContainer />

      {/* NAVBAR */}
      <NavBar setToken={handleSetToken} />

      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <SideBar />

        {/* CONTENT */}
        <main
          className="
            flex-1
            min-w-0
            pt-20
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
          <Routes>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/newsletter" element={<Newsletter token={token} />} />
            <Route
              path="/payments"
              element={<PaymentHistory token={token} />}
            />
            <Route
              path="/edit-product"
              element={<EditProduct token={token} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
