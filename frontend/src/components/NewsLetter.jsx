import React, { useState } from "react";
import axios from "axios";
import toast from "../utils/toast";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`,
        { email },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 text-center px-4">
      <p className="prata-regular text-xl sm:text-2xl md:text-3xl font-medium">
        Be First to Shop <span className="text-primary">New Arrivals</span>
      </p>

      <p className="text-muted-foreground mt-3 text-sm md:text-base">
        Stay updated with our latest collections and exclusive offers.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 md:w-1/2 mx-auto mt-6 flex items-stretch"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 min-w-0 px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground border border-border border-r-0"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap hover:bg-primary/90 transition-colors border border-primary min-w-[120px]"
        >
          {loading ? "LOADING..." : "SUBSCRIBE"}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
