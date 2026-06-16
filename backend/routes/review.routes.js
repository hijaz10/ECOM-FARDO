import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controller/review.controller.js";
import userAuth from "../middleware/user.auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { reviewLimiter } from "../middleware/rateLimiter.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", userAuth, reviewLimiter, addReview);
reviewRouter.get("/product/:productId", getProductReviews);
reviewRouter.post("/delete", adminAuth, deleteReview);

export default reviewRouter;
