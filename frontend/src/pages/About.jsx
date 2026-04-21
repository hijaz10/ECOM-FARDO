import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets/assets";
import Newsletter from "../components/NewsLetter";

function About() {
  return (
    <div className="">
      {/* ABOUT US SECTION */}
      <div className="mb-16">
        {/* TITLE */}
        <div className="text-center mb-10">
          <Title text1="ABOUT" text2="US" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* IMAGE */}
          <div className="w-full md:w-1/2">
            <img
              src={assets.about_img}
              alt="about"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-muted-foreground leading-relaxed">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>

            <p>
              Since our inception, we have worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Our Mission
              </h3>
              <p>
                Our mission at Forever is to empower customers with choice,
                convenience, and confidence. We're dedicated to providing a
                seamless shopping experience that exceeds expectations, from
                browsing and ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="mb-20">
        {/* TITLE */}
        <div className="mb-8">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
          {/* BOX 1 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-border">
            <h4 className="font-semibold mb-3 text-foreground">
              Quality Assurance:
            </h4>
            <p className=" text-muted-foreground">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>

          {/* BOX 2 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-border">
            <h4 className="font-semibold mb-3 text-foreground">Convenience:</h4>
            <p className=" text-muted-foreground">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>

          {/* BOX 3 */}
          <div className="p-8">
            <h4 className="font-semibold mb-3 text-foreground">
              Exceptional Customer Service:
            </h4>
            <p className=" text-muted-foreground">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>

        <Newsletter />
      </div>
    </div>
  );
}

export default About;
