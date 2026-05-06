import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <div>
      <div className="-mx-4 sm:-mx-[3vw] md:-mx-[4vw] lg:-mx-[5vw] -mt-16">
        <Hero />
      </div>
      <BestSeller />
      <LatestCollection />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
}

export default Home;
