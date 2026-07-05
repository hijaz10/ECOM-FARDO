import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid reset link");
      navigate("/forgot-password");
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword) newErrors.newPassword = "Required";
    else if (formData.newPassword.length < 8)
      newErrors.newPassword = "Must be at least 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Required";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        {
          email,
          token,
          newPassword: formData.newPassword,
        },
      );

      if (response.data.success) {
        setDone(true);
        toast.success("Password reset successfully!");
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
          <Title text1="RESET" text2="PASSWORD" />
          <p className="text-sm text-muted-foreground mt-1">
            {done
              ? "Your password has been reset successfully."
              : "Enter your new password below."}
          </p>
        </div>

        {done ? (
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
                  Password Reset!
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your password has been updated. You can now login with your
                  new password.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-full"
            >
              Login Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="New password"
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                className={`border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full focus:border-primary transition-colors ${
                  errors.newPassword ? "border-red-400" : "border-border"
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                className={`border px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-full focus:border-primary transition-colors ${
                  errors.confirmPassword ? "border-red-400" : "border-border"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-full ${
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
