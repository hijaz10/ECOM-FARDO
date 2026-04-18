import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin`,
        { email, password },
      );

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm flex flex-col gap-6 border border-border p-8">
        {/* TITLE */}
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            Fardo<span className="text-muted-foreground">.</span>
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Admin Panel
          </p>
        </div>

        <hr className="border-border" />

        {/* FORM */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-foreground">
              Email
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
              className="border border-border px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-foreground">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="border border-border px-4 py-2.5 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
