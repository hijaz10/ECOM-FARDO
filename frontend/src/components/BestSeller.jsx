import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { motion } from "framer-motion";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const carouselRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);
  const pausedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const [dimensions, setDimensions] = useState({
    radius: 320,
    cardWidth: 160,
    cardHeight: 220,
    sceneHeight: 500,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setDimensions({
          radius: 120,
          cardWidth: 110,
          cardHeight: 160,
          sceneHeight: 360,
        });
      } else if (w < 640) {
        setDimensions({
          radius: 160,
          cardWidth: 130,
          cardHeight: 185,
          sceneHeight: 420,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 240,
          cardWidth: 150,
          cardHeight: 210,
          sceneHeight: 480,
        });
      } else {
        setDimensions({
          radius: 320,
          cardWidth: 160,
          cardHeight: 220,
          sceneHeight: 500,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    const shuffled = bestProduct.sort(() => Math.random() - 0.5);
    setBestSeller(shuffled.slice(0, 4));
  }, [products]);

  const count = bestSeller.length;
  const totalDropDuration = count * 0.15 + 0.8;

  useEffect(() => {
    if (count === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          setTriggered(true);
          setTimeout(() => setReady(true), totalDropDuration * 1000);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [count, triggered]);

  useEffect(() => {
    if (!ready) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const animate = () => {
      if (!pausedRef.current) {
        angleRef.current = (angleRef.current + 0.3) % 360;
        carousel.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [ready]);

  if (bestSeller.length === 0) return null;

  const { radius, cardWidth, cardHeight, sceneHeight } = dimensions;

  return (
    <div className="my-10" ref={sectionRef}>
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-muted-foreground">
          Our most loved pieces. Chosen by customers like you.
        </p>
      </div>

      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: `${sceneHeight}px`, perspective: "1000px" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute font-black uppercase pointer-events-none select-none"
          style={{
            fontSize: "clamp(40px, 10vw, 120px)",
            color: "rgba(108,92,231,0.06)",
            letterSpacing: "-4px",
            zIndex: 0,
          }}
        >
          FARDO
        </motion.p>

        <div
          ref={carouselRef}
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {bestSeller.map((product, i) => {
            const angle = (360 / count) * i;
            return (
              <div
                key={product._id}
                style={{
                  position: "absolute",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -400 }}
                  animate={
                    triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -400 }
                  }
                  transition={{
                    delay: i * 0.15,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                  }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  onMouseEnter={() => (pausedRef.current = true)}
                  onMouseLeave={() => (pausedRef.current = false)}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {/* IMAGE FILLS ENTIRE CARD */}
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />

                  {/* OVERLAY AT BOTTOM */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 10px 10px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: `${Math.max(9, cardWidth * 0.068)}px`,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#ffffff",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: `${Math.max(9, cardWidth * 0.065)}px`,
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 400,
                      }}
                    >
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: totalDropDuration }}
          className="absolute bottom-3 text-xs text-muted-foreground text-center px-4"
          style={{ zIndex: 10 }}
        >
          Hover to pause · Click a card to view product
        </motion.p>
      </div>
    </div>
  );
}

export default BestSeller;
