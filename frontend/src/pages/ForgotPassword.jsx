import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email },
      );
      if (response.data.success) {
        setSent(true);
        toast.success("Reset link sent! Check your inbox.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 flex items-center justify-center min-h-[70vh]">
      <div className="w-full sm:w-[420px] flex flex-col gap-6">
        <div>
          <Title text1="FORGOT" text2="PASSWORD" />
          <p className="text-sm text-muted-foreground mt-1">
            {sent
              ? "Check your email for a reset link. It expires in 10 minutes."
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col gap-4">
            <div
              className="flex items-start gap-3 px-4 py-4 border border-border"
              style={{ borderLeft: "3px solid var(--color-primary)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary shrink-0 mt-0.5"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Email Sent
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We sent a reset link to{" "}
                  <span className="text-primary">{email}</span>. Check your spam
                  folder if you don't see it.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
            >
              Didn't receive it? Try again
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full focus:border-primary transition-colors"
            />

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full ${
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
            >
              ← Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
