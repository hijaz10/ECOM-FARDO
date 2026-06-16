import reviewModel from "../models/review.model.js";
import userModel from "../models/user.model.js";

const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    // check if user already reviewed this product
    const existing = await reviewModel.findOne({ productId, userId });
    if (existing) {
      return res.json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const review = new reviewModel({
      productId,
      userId,
      name: user.name,
      rating: Number(rating),
      comment,
    });

    await review.save();
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET REVIEWS FOR A PRODUCT
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel
      .find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE REVIEW - admin only
const deleteReview = async (req, res) => {
  try {
    const { id } = req.body;
    await reviewModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addReview, getProductReviews, deleteReview };
