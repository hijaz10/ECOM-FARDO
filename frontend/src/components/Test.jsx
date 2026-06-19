import React from "react";
import { assets } from "../assets/assets/assets";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[90vh] overflow-hidden animate-slide-up animation-delay-300">
      {/* BACKGROUND IMAGE */}
      <img
        src={assets.hero_img}
        alt="Luxury Beauty"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-transparent" />

      {/* TEXT CONTENT */}
      <div className="absolute bottom-16 left-0 p-10 md:p-16 flex flex-col gap-3">
        <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-white/60 font-light my-6">
          Luxury Beauty Collection
        </p>

        <div className="leading-[0.9]">
          <h1 className="text-7xl md:text-9xl font-black uppercase text-white tracking-tight">
            Own
          </h1>
          <h1 className="text-7xl md:text-9xl font-black uppercase text-white tracking-tight">
            Your Glow
          </h1>
        </div>

        <button
          onClick={() => navigate("/collection")}
          className="
                      relative mt-6 w-fit
                      px-10 py-3
                      text-xs uppercase tracking-[0.35em]
                      font-light

                      text-black
                      bg-white/80 backdrop-blur-md

                      border border-black/10

                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]

                      hover:bg-black hover:text-white
                      hover:tracking-[0.45em]
                      hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                      hover:-translate-y-0.5
                      rounded-full

                      active:scale-[0.98]
                    "
        >
          <span className="relative z-10">Explore Shop</span>

          {/* underline glow */}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px bg-black transition-all duration-500 group-hover:w-3/4" />
        </button>
      </div>
    </div>
  );
}

export default Hero;
