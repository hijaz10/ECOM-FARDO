import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart, token, backendUrl } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedShade, setSelectedShade] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const reviewsRef = useRef(null);
  const isReviewsInView = useInView(reviewsRef, { once: true, amount: 0.2 });

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setSelectedImage(item.image[0]);
        return null;
      }
    });
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/review/product/${productId}`,
      );
      if (response.data.success) setReviews(response.data.reviews);
    } catch (error) {
      console.error(error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }
    if (!reviewForm.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating: reviewForm.rating, comment: reviewForm.comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        toast.success("Review submitted!");
        setReviewForm({ rating: 5, comment: "" });
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const isSoldOut = productData && productData.quantity === 0;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    if (productData.shades?.length > 0 && !selectedShade) {
      toast.error("Please select a shade");
      return;
    }
    addToCart(productData._id, selectedShade?.name || null);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    toast.custom(
      (t) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            background: "#faf7f5",
            padding: "14px 16px",
            borderRadius: "14px",
            boxShadow: "0 10px 25px rgba(31,26,28,0.06)",
            borderLeft: "4px solid #b88a8f",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "0.9rem",
            color: "#1f1a1c",
            minWidth: "260px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#b88a8f", fontSize: "16px" }}>✓</span>
            <span>Added to cart</span>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/cart");
            }}
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6c5ce7",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            View Cart
          </button>
        </div>
      ),
      { duration: 3000 },
    );
  };

  const prevImage = () => {
    if (!productData) return;
    const newIndex =
      selectedIndex === 0 ? productData.image.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedImage(productData.image[newIndex]);
  };

  const nextImage = () => {
    if (!productData) return;
    const newIndex =
      selectedIndex === productData.image.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedImage(productData.image[newIndex]);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedIndex]);

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  useEffect(() => {
    if (productData && productData.shades?.length > 0) {
      setSelectedShade(productData.shades[0]);
    } else {
      setSelectedShade(null);
    }
  }, [productData]);

  if (!productData) {
    return (
      <div className="pt-10 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex-1 bg-muted h-[500px]" />
          <div className="flex-1 flex flex-col gap-4 pt-4">
            <div className="bg-muted h-4 w-24 rounded" />
            <div className="bg-muted h-10 w-3/4 rounded" />
            <div className="bg-muted h-6 w-1/4 rounded" />
            <div className="bg-muted h-24 w-full rounded" />
            <div className="bg-muted h-14 w-full rounded" />
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

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="pt-10">
      {/* BREADCRUMB */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
      >
        <span
          onClick={() => navigate("/")}
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Home
        </span>
        <span>/</span>
        <span
          onClick={() => navigate("/collection")}
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Collection
        </span>
        <span>/</span>
        <span className="text-foreground truncate max-w-32">
          {productData.name}
        </span>
      </motion.div>

      {/* PRODUCT DETAIL */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT - IMAGES */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col-reverse sm:flex-row gap-4 flex-1"
        >
          {/* THUMBNAILS */}
          <motion.div
            variants={fadeUp}
            className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[560px]"
          >
            {productData.image.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setSelectedImage(img);
                  setSelectedIndex(index);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === img
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-cover object-top"
                />
              </motion.button>
            ))}
          </motion.div>

          {/* MAIN IMAGE */}
          <motion.div
            variants={fadeUp}
            onClick={() => setIsLightboxOpen(true)}
            className="flex-1 relative group overflow-hidden bg-muted/20 cursor-zoom-in"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={productData.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[400px] sm:h-[560px] object-cover object-top"
              />
            </AnimatePresence>

            {/* IMAGE NAV ARROWS */}
            {productData.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity hover:bg-background"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity hover:bg-background"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* IMAGE DOTS */}
            {productData.image.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {productData.image.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImage(productData.image[i]);
                      setSelectedIndex(i);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      i === selectedIndex
                        ? "w-5 h-1.5 bg-primary"
                        : "w-1.5 h-1.5 bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* CATEGORY BADGE */}
            <div className="absolute top-4 left-4">
              <span className="bg-background/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest px-3 py-1.5">
                {productData.category}
              </span>
            </div>

            {productData.bestSeller && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-3 py-1.5">
                  ⭐ Bestseller
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT - INFO */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col gap-6"
        >
          {/* CATEGORY */}
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.3em] text-primary font-medium"
          >
            {productData.category}
          </motion.p>

          {/* NAME */}
          <motion.h1
            variants={fadeUp}
            className="font-black uppercase text-foreground leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-1px",
            }}
          >
            {productData.name}
          </motion.h1>

          {/* RATING */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {reviews.length > 0
                ? `${avgRating.toFixed(1)} (${reviews.length} ${
                    reviews.length === 1 ? "review" : "reviews"
                  })`
                : "No reviews yet"}
            </span>
          </motion.div>

          {/* PRICE */}
          <motion.div variants={fadeUp} className="flex items-baseline gap-2">
            <span
              className="font-black text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {currency}
              {productData.price.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </motion.div>

          {/* DESCRIPTION PREVIEW */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
          >
            {productData.description}
          </motion.p>

          {/* SHADE SELECTOR */}
          {productData.shades?.length > 0 && (
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Shade:
                </p>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest">
                  {selectedShade?.name}
                </p>
              </div>

              {selectedShade?.description && (
                <p className="text-xs text-muted-foreground -mt-1">
                  {selectedShade.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {productData.shades.map((shade, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedShade(shade)}
                    title={shade.name}
                    className="relative w-8 h-8 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: shade.hex,
                      border:
                        selectedShade?.name === shade.name
                          ? "2px solid var(--color-foreground)"
                          : "2px solid transparent",
                      outline:
                        selectedShade?.name === shade.name
                          ? "2px solid var(--color-primary)"
                          : "2px solid transparent",
                      outlineOffset: "1px",
                    }}
                  >
                    {selectedShade?.name === shade.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LOW STOCK WARNING */}
          {productData.quantity > 0 && productData.quantity <= 5 && (
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold text-orange-500"
            >
              ⚠ Only {productData.quantity} left in stock
            </motion.p>
          )}

          {/* DIVIDER */}
          <motion.div variants={fadeUp} className="h-px bg-border" />

          {/* ADD TO CART */}
          <motion.div variants={fadeUp}>
            <motion.button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              whileHover={!isSoldOut ? { scale: 1.02 } : {}}
              whileTap={!isSoldOut ? { scale: 0.98 } : {}}
              className={`relative w-full py-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-widest overflow-hidden transition-all duration-300 ${
                isSoldOut
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground group"
              }`}
            >
              <AnimatePresence mode="wait">
                {isSoldOut ? (
                  <motion.span
                    key="soldout"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Sold Out
                  </motion.span>
                ) : addedToCart ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    ✓ Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
              {!isSoldOut && (
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              )}
            </motion.button>
          </motion.div>

          {/* META */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-2 text-xs text-muted-foreground border-t border-border pt-4"
          >
            <div className="flex gap-2">
              <span className="uppercase tracking-widest w-20 shrink-0">
                Category
              </span>
              <span className="text-foreground font-medium">
                {productData.category}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="uppercase tracking-widest w-20 shrink-0">
                SKU
              </span>
              <span className="text-foreground font-mono">
                {productData._id.slice(-8).toUpperCase()}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* TABS */}
      <div className="mt-20">
        <div className="flex border-b border-border">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "reviews"
                ? `Reviews (${reviews.length})`
                : "Description"}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-10 flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed max-w-2xl"
            >
              <p>{productData.description}</p>

              {productData.description2 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-3">
                    Ingredients & Details
                  </p>
                  <p>{productData.description2}</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              ref={reviewsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-10 flex flex-col gap-8"
            >
              {/* RATING OVERVIEW */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-8 p-6 border border-border">
                  <div className="text-center">
                    <p className="text-5xl font-black text-foreground">
                      {avgRating.toFixed(1)}
                    </p>
                    <div className="flex gap-0.5 justify-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.round(avgRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(
                        (r) => r.rating === star,
                      ).length;
                      const pct =
                        reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="text-muted-foreground w-2">
                            {star}
                          </span>
                          <Star
                            size={10}
                            className="text-yellow-400 fill-yellow-400 shrink-0"
                          />
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground w-4">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* REVIEWS LIST */}
              {reviewsLoading ? (
                <div className="animate-pulse flex flex-col gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 border-b border-border pb-4"
                    >
                      <div className="bg-muted h-3 w-1/4 rounded" />
                      <div className="bg-muted h-3 w-full rounded" />
                    </div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex flex-col gap-3 border-b border-border pb-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold uppercase">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {review.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* WRITE REVIEW */}
              <div className="border border-border p-6">
                <p className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                  Write a Review
                </p>
                <form
                  onSubmit={submitReview}
                  className="flex flex-col gap-4 max-w-lg"
                >
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                      Your Rating
                    </p>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.button
                          key={i}
                          type="button"
                          onClick={() =>
                            setReviewForm((prev) => ({
                              ...prev,
                              rating: i + 1,
                            }))
                          }
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${
                              i < reviewForm.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    placeholder="Share your experience with this product..."
                    rows={4}
                    required
                    className="border border-border px-4 py-3 text-sm outline-none bg-background placeholder:text-muted-foreground resize-none focus:border-primary transition-colors"
                  />
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors w-fit ${
                      submitting
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <Title text1="YOU MAY" text2="ALSO LIKE" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <ProductItems
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Previous */}
            {productData.image.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-5 text-white hover:scale-110 transition"
              >
                <ChevronLeft size={42} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Next */}
            {productData.image.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-5 text-white hover:scale-110 transition"
              >
                <ChevronRight size={42} />
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 text-white text-4xl"
            >
              ×
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 flex gap-2">
              {productData.image.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                    setSelectedImage(productData.image[i]);
                  }}
                  className={`rounded-full transition-all ${
                    selectedIndex === i
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;
