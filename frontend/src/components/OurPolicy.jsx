import React from "react";
import { assets } from "../assets/assets/assets";

function OurPolicy() {
  return (
    <div
      id="privacy-policy"
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-muted-foreground"
    >
      <div>
        <img
          src={assets.exchange_icon}
          alt="icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-muted-foreground">We offer what ever</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          alt="icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-muted-foreground">
          We Provide 7 days free return policy
        </p>
      </div>

      <div>
        <img src={assets.support_img} alt="icon" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-muted-foreground">
          We provide 24/7 Customer support
        </p>
      </div>
    </div>
  );
}

export default OurPolicy;
