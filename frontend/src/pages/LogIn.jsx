import React, { useState, useEffect, useContext } from "react";
import Title from "../components/Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import toast from "../utils/toast";

function LogIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  // resend OTP countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${backendUrl}/api/user/send-otp`, {
        email,
      });

      if (response.data.success) {
        setStep(2);
        setResendTimer(60);
        toast.success("OTP sent to your email!");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // VERIFY OTP
      const verifyRes = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp,
      });

      if (!verifyRes.data.success) {
        setError(verifyRes.data.message);
        return;
      }

      // REGISTER USER
      const registerRes = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (registerRes.data.success) {
        setToken(registerRes.data.token);
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        setError(registerRes.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back!");
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setResendTimer(60); // lock immediately to prevent double-clicks

    try {
      const response = await axios.post(`${backendUrl}/api/user/send-otp`, {
        email,
      });

      if (response.data.success) {
        toast.success("OTP resent!");
      } else {
        setError(response.data.message);
        setResendTimer(0); // unlock if it actually failed
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      setResendTimer(0); // unlock on error too
    }
  };

  return (
    <div className="pt-14 flex items-center justify-center min-h-[70vh]">
      <div className="w-full sm:w-[420px] flex flex-col gap-6">
        {/* TITLE */}
        <div>
          <Title
            text1={isLogin ? "LOGIN" : step === 1 ? "SIGN" : "VERIFY"}
            text2={isLogin ? "" : step === 1 ? "UP" : "EMAIL"}
          />

          <p className="text-sm text-muted-foreground mt-1">
            {isLogin
              ? "Welcome back! Please login to your account."
              : step === 1
                ? "Create an account to get started."
                : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* LOGIN FORM */}
        {isLogin && (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full ${
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* SIGNUP STEP 1 */}
        {!isLogin && step === 1 && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full"
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full ${
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </div>
        )}

        {/* SIGNUP STEP 2 */}
        {!isLogin && step === 2 && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="border border-border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full text-center tracking-[0.5em] text-lg font-semibold"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              onClick={handleVerifyAndRegister}
              disabled={loading}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full ${
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button
                onClick={() => setStep(1)}
                className="hover:text-primary transition-colors"
              >
                ← Back
              </button>

              <button
                onClick={handleResendOTP}
                disabled={resendTimer > 0}
                className={`transition-colors ${
                  resendTimer > 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-primary cursor-pointer"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        {/* TOGGLE */}
        {step === 1 && (
          <p className="text-sm text-muted-foreground text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setStep(1);
              }}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LogIn;
