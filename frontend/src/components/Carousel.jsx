import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { motion } from "framer-motion";

const products = [
  { id: "aaaaa", name: "Women Cotton Top", price: 100, img: assets.p_img1 },
  { id: "aaaab", name: "Men Cotton T-shirt", price: 80, img: assets.p_img2 },
  { id: "aaaac", name: "Girls Cotton Top", price: 60, img: assets.p_img3 },
  { id: "aaaad", name: "Men Pure Cotton", price: 110, img: assets.p_img4 },
  { id: "aaaae", name: "Women Neck Top", price: 130, img: assets.p_img5 },
  { id: "aaaaf", name: "Kids T-shirt", price: 50, img: assets.p_img6 },
  { id: "aaaag", name: "Men Trousers", price: 63, img: assets.p_img7 },
];

function Carousel() {
  const carouselRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);
  const pausedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const count = products.length;
  const radius =
    typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 320;

  const totalDropDuration = products.length * 0.15 + 0.8;

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), totalDropDuration * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const animate = () => {
      if (!pausedRef.current) {
        angleRef.current += 0.3;
        carousel.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [ready]);

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: "500px", perspective: "1000px" }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* BIG BACKGROUND TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute font-black uppercase pointer-events-none select-none"
        style={{
          fontSize: "clamp(60px, 12vw, 120px)",
          color: "rgba(108,92,231,0.06)",
          letterSpacing: "-4px",
          zIndex: 0,
        }}
      >
        FARDO
      </motion.p>

      {/* CAROUSEL WRAPPER */}
      <div
        ref={carouselRef}
        style={{
          width: "160px",
          height: "220px",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {products.map((product, i) => {
          const angle = (360 / count) * i;
          return (
            <div
              key={product.id}
              style={{
                position: "absolute",
                width: "160px",
                height: "220px",
                left: "50%",
                top: "50%",
                marginLeft: "-80px",
                marginTop: "-110px",
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* FRAMER MOTION DROP ANIMATION */}
              <motion.div
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                }}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  width: "160px",
                  height: "220px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(108,92,231,0.3)",
                  cursor: "pointer",
                  background: "#fff",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6c5ce7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(108,92,231,0.3)";
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "75%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
                <div style={{ padding: "8px" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#12124a",
                    }}
                  >
                    {product.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#6c5ce7" }}>
                    ${product.price}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* HINT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: totalDropDuration }}
        className="absolute bottom-3 text-xs text-muted-foreground"
        style={{ zIndex: 10 }}
      >
        Hover to pause · Click a card to view product
      </motion.p>
    </div>
  );
}

export default Carousel;
