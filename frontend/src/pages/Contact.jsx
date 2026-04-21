import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets/assets";
import Newsletter from "../components/NewsLetter";
function Contact() {
  return (
    <div className="">
      {/* TITLE */}
      <div className="text-center mb-12">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_img}
            alt="contact"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-muted-foreground leading-relaxed">
          {/* STORE INFO */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Our Store
            </h3>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>

            <p className="mt-4">Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default Contact;
