import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "../utils/toast";

function Profile() {
  const { token, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUser(response.data.user);
        setPhone(response.data.user.phone || "");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updatePhone = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    try {
      setSaving(true);

      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        { phone },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success("Phone number updated!");
        setUser((prev) => ({ ...prev, phone }));
        setIsEditingPhone(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update phone");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="pt-14 max-w-2xl mx-auto animate-pulse">
        <div className="mb-8 h-8 bg-muted w-40 rounded" />

        <div className="border border-border py-10 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-muted" />
          <div className="h-4 bg-muted w-32 rounded" />
          <div className="h-3 bg-muted w-48 rounded" />
        </div>

        <div className="mt-6 border border-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 border-b border-border flex gap-4"
            >
              <div className="h-3 bg-muted w-24 rounded" />
              <div className="h-3 bg-muted flex-1 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="pt-14 text-center py-20 text-muted-foreground text-sm">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="pt-14 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <Title text1="MY" text2="PROFILE" />
      </div>

      {/* AVATAR + NAME */}
      <div className="flex flex-col items-center gap-4 py-10 border border-border">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-3xl font-bold uppercase">
            {user.name ? user.name[0] : "U"}
          </span>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* PROFILE DETAILS */}
      <div className="mt-6 border border-border">
        <div className="px-6 py-4 border-b border-border">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Personal Information
          </p>
        </div>

        <div className="flex flex-col">
          {/* NAME */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 px-6 py-4 border-b border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-widest sm:w-36 shrink-0">
              Full Name
            </p>

            <p className="text-sm text-foreground flex-1">{user.name}</p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 px-6 py-4 border-b border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-widest sm:w-36 shrink-0">
              Email
            </p>

            <p className="text-sm text-foreground flex-1">{user.email}</p>
          </div>

          {/* PHONE  */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 px-6 py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest sm:w-36 shrink-0">
              Phone
            </p>

            <div className="flex-1 flex items-center gap-3">
              {isEditingPhone ? (
                <>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 border-b border-primary pb-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                    autoFocus
                  />

                  <button
                    onClick={updatePhone}
                    disabled={saving}
                    className={`text-xs font-semibold uppercase tracking-widest px-4 py-1.5 transition-colors ${
                      saving
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => {
                      setIsEditingPhone(false);
                      setPhone(user.phone || "");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground flex-1">
                    {user.phone || (
                      <span className="text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </p>

                  <button
                    onClick={() => setIsEditingPhone(true)}
                    className="text-xs text-primary font-semibold uppercase tracking-widest hover:underline shrink-0"
                  >
                    {user.phone ? "Edit" : "Add"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="mt-6 border border-border">
        <div className="px-6 py-4 border-b border-border">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Quick Links
          </p>
        </div>

        <div className="flex flex-col">
          {[
            { label: "My Orders", to: "/orders" },
            { label: "Shop Collection", to: "/collection" },
          ].map((link, i, arr) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors ${
                i !== arr.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <p className="text-sm text-foreground">{link.label}</p>
              <span className="text-muted-foreground text-xs">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
