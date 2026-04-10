import React from "react";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-muted-foreground">
      {/* LEFT SECTION */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="w-8 md:w-11 h-0.5 bg-muted-foreground"></p>
            <p className="font-medium text-sm md:text-base tracking-widest">
              OUR BESTSELLERS
            </p>
          </div>

          <h1
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <p className="font-semibold text-sm md:text-base tracking-widest">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-0.5 bg-muted-foreground"></p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - hero image */}
      <div className="w-full sm:w-1/2 bg-pink-100">
        <img
          src="/hero_img.png"
          alt="Latest Arrivals"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export default Hero;
