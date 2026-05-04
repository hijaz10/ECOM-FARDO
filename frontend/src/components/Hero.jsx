import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";

const slides = [
  {
    img: assets.hero_img,
    label: "Luxury Beauty Collection",
    title: "Own Your Glow",
    buttonText: "Explore Shop",
    buttonAction: "/collection",
  },
  {
    img: "../../public/fardo_hero_sec.png",
    label: "New Arrivals",
    title: "Fresh Styles",
    buttonText: "Shop New Arrivals",
    buttonAction: "latest",
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const count = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1 < count ? prev + 1 : 0));
    }, 7000);

    return () => clearInterval(interval);
  }, [count]);

  const handleButton = (action) => {
    if (action === "latest") {
      const el = document.getElementById("latest");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(action);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "500px" }}
    >
      {/* SLIDES */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: i === active ? 1 : 0,
            zIndex: i === active ? 10 : 0,
            pointerEvents: i === active ? "auto" : "none",
          }}
        >
          {/* IMAGE */}
          <img
            src={slide.img}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* GRADIENT OVERLAY */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            }}
          />

          {/* CONTENT */}
          <div
            className="absolute inset-0 flex flex-col justify-end z-10"
            style={{
              padding: "clamp(1.5rem, 5vw, 4rem)",
              paddingBottom: "clamp(4rem, 8vh, 6rem)",
            }}
          >
            {/* LABEL */}
            <p
              className="uppercase text-white/60 font-light mb-3"
              style={{
                fontSize: "clamp(9px, 2vw, 13px)",
                letterSpacing: "0.3em",
                opacity: i === active ? undefined : 0,
                animation:
                  i === active
                    ? "showContent 0.5s 0.7s ease-in-out forwards"
                    : "none",
                transform: "translateY(30px)",
                filter: "blur(20px)",
                visibility: "hidden",
                animationFillMode: "forwards",
              }}
            >
              {slide.label}
            </p>

            {/* TITLE */}
            <h1
              className="font-black uppercase text-white m-0 mb-6"
              style={{
                fontSize: "clamp(3rem, 12vw, 8rem)",
                lineHeight: 0.9,
                letterSpacing: "2px",
                opacity: i === active ? undefined : 0,
                animation:
                  i === active
                    ? "showContent 0.5s 1s ease-in-out forwards"
                    : "none",
                transform: "translateY(30px)",
                filter: "blur(20px)",
                visibility: "hidden",
                animationFillMode: "forwards",
              }}
            >
              {slide.title}
            </h1>

            {/* BUTTON */}
            <div>
              <button
                onClick={() => handleButton(slide.buttonAction)}
                className="group relative w-fit px-8 py-3 text-xs uppercase font-light text-black bg-white/80 backdrop-blur-md border border-black/10 transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:scale-105 rounded-full active:scale-[0.98]"
                style={{
                  letterSpacing: "0.25em",
                  opacity: i === active ? undefined : 0,
                  animation:
                    i === active
                      ? "showContent 0.5s 1.3s ease-in-out forwards"
                      : "none",
                  transform: "translateY(30px)",
                  filter: "blur(20px)",
                  visibility: "hidden",
                  animationFillMode: "forwards",
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <span className="relative z-10">{slide.buttonText}</span>

                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px bg-black transition-all duration-500 group-hover:w-3/4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              background: i === active ? "#fff" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes showContent {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(20px);
            visibility: hidden;
          }

          1% {
            visibility: visible;
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;
