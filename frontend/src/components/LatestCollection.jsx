import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { motion } from "framer-motion";
import { SkeletonCard } from "./Skeloton";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
      setLoading(false);
    }
  }, [products]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div id="latest" className="my-16">
      <div className="text-center py-10 text-3xl">
        <Title text1={"NEW"} text2={"ARRIVALS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 mt-3">
          Carefully curated pieces from our latest drop — designed for refined
          everyday style.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {latestProducts.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <ProductItems
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default LatestCollection;
