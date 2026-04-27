import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setSelectedImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="pt-10 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col-reverse sm:flex-row gap-3 flex-1">
            <div className="flex sm:flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-muted w-16 h-16 shrink-0" />
              ))}
            </div>
            <div className="flex-1 bg-muted h-[400px] sm:h-[500px]" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-muted h-8 w-3/4 rounded" />
            <div className="bg-muted h-6 w-1/4 rounded" />
            <div className="bg-muted h-20 w-full rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted h-10 w-14 rounded" />
              ))}
            </div>
            <div className="bg-muted h-12 w-36 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (p) => p.category === productData.category && p._id !== productData._id,
    )
    .slice(0, 4);

  return (
    <div className="pt-10 animate-slide-in-right">
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col-reverse sm:flex-row gap-3 flex-1">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover object-top cursor-pointer shrink-0 border-2 transition-all ${
                  selectedImage === img
                    ? "border-muted-foreground"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={productData.name}
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-medium">{productData.name}</h1>
          <p className="text-2xl font-semibold">
            {currency}
            {productData.price}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {productData.description}
          </p>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3">
              Select Size
            </p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm border transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-red-400 mt-2">Please select a size</p>
            )}
          </div>

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-fit"
          >
            Add to Cart
          </button>

          <hr className="border-border" />

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <p>
              Category:{" "}
              <span className="text-foreground">{productData.category}</span>
            </p>
            <p>
              Type:{" "}
              <span className="text-foreground">{productData.subCategory}</span>
            </p>
            {productData.bestseller && (
              <p className="text-primary font-semibold">⭐ Bestseller</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-all ${
              activeTab === "description"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-all ${
              activeTab === "reviews"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews (122)
          </button>
        </div>

        {activeTab === "description" && (
          <div className="py-8 flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
            <p>{productData.description}</p>
            <p>
              Made with premium quality materials, this product is designed for
              everyday comfort and durability. Whether you're dressing up or
              keeping it casual, it pairs effortlessly with any outfit in your
              wardrobe.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>100% premium cotton fabric</li>
              <li>Machine washable — cold wash recommended</li>
              <li>Available in multiple sizes</li>
              <li>Slim fit design for a modern look</li>
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="py-8 flex flex-col gap-6">
            {[
              {
                name: "Ahmed K.",
                rating: 5,
                date: "March 12, 2025",
                comment:
                  "Excellent quality! The fabric feels premium and the fit is perfect. Highly recommend.",
              },
              {
                name: "Sarah M.",
                rating: 4,
                date: "February 28, 2025",
                comment:
                  "Great product overall. Sizing runs slightly large so consider going one size down.",
              },
              {
                name: "James O.",
                rating: 5,
                date: "January 15, 2025",
                comment:
                  "Fast delivery and exactly as described. Will definitely order again.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-b border-border pb-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-muted-foreground"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-widest mb-4">
                Write a Review
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  className="border border-border px-4 py-2 text-sm outline-none bg-background placeholder:text-muted-foreground w-full sm:w-1/2"
                />
                <textarea
                  placeholder="Share your experience..."
                  rows={4}
                  className="border border-border px-4 py-2 text-sm outline-none bg-background placeholder:text-muted-foreground w-full sm:w-1/2 resize-none"
                />
                <button className="bg-primary text-primary-foreground px-6 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors w-fit">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="text-center mb-8">
            <Title text1="RELATED" text2="PRODUCTS" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {relatedProducts.map((item, index) => (
              <ProductItems
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
