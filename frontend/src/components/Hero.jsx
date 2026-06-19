import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    img: "/fardo_hero_sec.png",
    imgMobile: "/Momodumedia-6.jpg.jpeg",
    label: "Luxury Beauty Collection",
    title: "Own Your Glow",
    buttonText: "Explore Shop",
    buttonAction: "/collection",
    nowrap: false,
  },
  {
    img: "/Momodustudio-1139.jpg.jpeg",
    imgMobile: "/Momodustudio-1139-mobile.jpg.jpeg",
    label: "Latest From Collection",
    title: "Fresh Styles",
    buttonText: "New Arrivals",
    buttonAction: "latest",
    nowrap: true,
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
      {slides.map((slide, i) => {
        const isActive = i === active;

        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 10 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {/* IMAGE */}
            <picture className="absolute inset-0 w-full h-full">
              <source media="(max-width: 767px)" srcSet={slide.imgMobile} />
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </picture>

            {/* GRADIENT */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)",
              }}
            />

            {/* CONTENT */}
            <div
              className="absolute inset-0 flex flex-col justify-end z-10"
              style={{
                padding: "clamp(1.25rem, 4vw, 4rem)",
                paddingBottom: "clamp(3.5rem, 9vh, 6rem)",
              }}
            >
              {/* LABEL */}
              <p
                className={`uppercase text-white/60 font-light mb-2 sm:mb-3 transition-all duration-700 ${
                  isActive
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-6 blur-lg"
                }`}
                style={{
                  fontSize: "clamp(8px, 2.5vw, 13px)",
                  letterSpacing: "0.25em",
                }}
              >
                {slide.label}
              </p>

              {/* TITLE */}
              <h1
                className={`font-black uppercase text-white m-0 mb-5 sm:mb-6 transition-all duration-700 ${
                  isActive
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-6 blur-lg"
                }`}
                style={{
                  fontSize: slide.nowrap
                    ? "clamp(1.8rem, 11vw, 8rem)" // scales down more aggressively to fit inline
                    : "clamp(2.8rem, 13vw, 8rem)", // original scaling for longer titles
                  lineHeight: 0.92,
                  letterSpacing: "1.5px",
                  wordBreak: slide.nowrap ? "normal" : "break-word",
                  whiteSpace: slide.nowrap ? "nowrap" : "normal",
                }}
              >
                {slide.title}
              </h1>

              {/* BUTTON */}
              <div
                className={`transition-all duration-700 ${
                  isActive
                    ? "opacity-100 translate-y-0 blur-0 pointer-events-auto"
                    : "opacity-0 translate-y-6 blur-lg pointer-events-none"
                }`}
              >
                <button
                  onClick={() => handleButton(slide.buttonAction)}
                  className="group relative w-fit px-6 py-3 sm:px-8 sm:py-3 text-xs uppercase font-light text-black bg-white/80 backdrop-blur-md border border-black/10 transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:scale-105 rounded-full active:scale-[0.98]"
                  style={{
                    letterSpacing: "0.22em",
                    minHeight: "44px",
                    minWidth: "44px",
                  }}
                >
                  <span className="relative z-10">{slide.buttonText}</span>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px bg-black transition-all duration-500 group-hover:w-3/4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* INDICATORS */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-500 rounded-full"
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              minWidth: "8px",
              background: i === active ? "#fff" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
