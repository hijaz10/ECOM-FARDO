import React, { useState, useContext, useEffect } from "react";
import Title from "../components/Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken, token } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
          { email, password },
        );

        if (response.data.success) {
          setToken(response.data.token);
          navigate("/");
        } else {
          setError(response.data.message);
        }
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters");
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
          { name, email, password },
        );

        if (response.data.success) {
          setToken(response.data.token);
          navigate("/");
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Try again.");
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="pt-14 flex items-center justify-center min-h-[60vh]">
      <div className="w-full sm:w-105 flex flex-col gap-4">
        {/* TITLE */}
        <div>
          <Title
            text1={isLogin ? "LOGIN" : "SIGN"}
            text2={isLogin ? "" : "UP"}
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-border px-4 py-3 text-sm outline-none bg-background placeholder:text-muted-foreground w-full"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-border px-4 py-3 text-sm outline-none bg-background placeholder:text-muted-foreground w-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-border px-4 py-3 text-sm outline-none bg-background placeholder:text-muted-foreground w-full"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-border px-4 py-3 text-sm outline-none bg-background placeholder:text-muted-foreground w-full"
            />
          )}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          {/* FORGOT PASSWORD */}
          {isLogin && (
            <p className="text-xs text-muted-foreground cursor-pointer hover:text-primary transition-colors text-right -mt-2">
              Forgot your password?
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-sm text-muted-foreground text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-primary font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
