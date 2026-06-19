import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "2K+", label: "Happy Customers" },
  { value: "30+", label: "Premium Products" },
  { value: "4.5★", label: "Average Rating" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

function About() {
  const navigate = useNavigate();

  return (
    <div className="pt-10 overflow-hidden">
      {/* HERO SECTION  */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20">
        {/* BACKGROUND GLOW */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.08), transparent)",
          }}
        />

        {/* DECORATIVE DOTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.4em] text-xs text-primary font-medium mb-6"
          >
            Our Story
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-black uppercase text-foreground mb-6 leading-none"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              letterSpacing: "-3px",
            }}
          >
            Beauty That{" "}
            <span
              className="relative inline-block"
              style={{ color: "var(--color-primary)" }}
            >
              Speaks
              <motion.span
                className="absolute bottom-0 left-0 h-1 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </span>{" "}
            For Itself
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Fardo was born from a simple belief — that every person deserves
            access to premium cosmetics that celebrate their unique beauty.
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={() => navigate("/collection")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 px-10 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-full"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 border-t border-border"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`flex flex-col items-center justify-center py-12 px-4 text-center ${
              i !== stats.length - 1 ? "border-r border-border" : ""
            }`}
          >
            <p
              className="font-black text-foreground mb-1"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* MISSION SECTION */}
      <section className="py-24 px-4 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(108,92,231,0.05), transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              variants={fadeUp}
              className="uppercase tracking-[0.4em] text-xs text-primary font-medium mb-4"
            >
              Our Mission
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black uppercase text-foreground leading-none mb-6"
              style={{
                fontSize: "clamp(1.6rem, 6vw, 3.5rem)",
                letterSpacing: "clamp(-1px, -0.05vw, -2px)",
              }}
            >
              More Than
              <br className="hidden md:block" /> Just Makeup
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-6"
            >
              At Fardo, we curate only the finest cosmetics from around the
              world. From the pigment-rich lipsticks to the most hydrating
              foundations — every product tells a story of craftsmanship and
              care.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed"
            >
              We believe beauty is not a standard to meet — it's a feeling to
              embrace. That's why we source products that enhance, not alter.
              Products that celebrate who you already are.
            </motion.p>
          </motion.div>

          {/* RIGHT SECTION, DECORATIVE VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative w-full aspect-square max-w-sm mx-auto rounded-full flex items-center justify-center"
              style={{ background: "rgba(108,92,231,0.05)" }}
            >
              {/* ORBITING DOTS */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary/40"
                  style={{
                    top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}

              {/* CENTER TEXT */}
              <div className="text-center z-10 px-8">
                <p
                  className="font-black uppercase text-primary leading-none"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5rem)",
                    letterSpacing: "-3px",
                  }}
                >
                  FARDO
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                  Premium Cosmetics
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE SECTION  */}
      <section className="py-6 border-t border-b border-border overflow-hidden bg-primary">
        <div className="flex">
          <motion.div
            className="flex gap-12 whitespace-nowrap shrink-0"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-12 shrink-0">
                {[
                  "Clean Beauty",
                  "Cruelty Free",
                  "Premium Quality",
                  "For Everyone",
                  "Clean Beauty",
                  "Cruelty Free",
                  "Premium Quality",
                  "For Everyone",
                ].map((text, i) => (
                  <span
                    key={i}
                    className="text-primary-foreground text-sm font-semibold uppercase tracking-widest shrink-0"
                  >
                    {text} ✦
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*  CTA SECTION  */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="py-32 px-4 text-center relative"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(108,92,231,0.07), transparent)",
          }}
        />

        <motion.p
          variants={fadeUp}
          className="uppercase tracking-[0.4em] text-xs text-primary font-medium mb-6"
        >
          Ready to Glow?
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-black uppercase text-foreground leading-none mb-8"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "-3px",
          }}
        >
          Start Your
          <br />
          Beauty Journey
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/collection")}
            className="px-10 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-full"
          >
            Shop Collection
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="px-10 py-3 border border-border text-foreground text-sm font-semibold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default About;
