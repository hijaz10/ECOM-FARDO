import React, { useState } from "react";
import Login from "./components/LogIn";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // persist token
  const handleSetToken = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  if (!token) {
    return <Login setToken={handleSetToken} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer />
      <NavBar setToken={handleSetToken} />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
