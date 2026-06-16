import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  verifyPaystack,
  placeOrderPaystack,
} from "../controller/order.controller.js";
import userAuth from "../middleware/user.auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { orderLimiter } from "../middleware/rateLimiter.js";

const orderRouter = express.Router();

// USER ROUTES
orderRouter.post("/place", userAuth, orderLimiter, placeOrder);
orderRouter.get("/user-orders", userAuth, getUserOrders);
orderRouter.post("/place-paystack", userAuth, orderLimiter, placeOrderPaystack);
orderRouter.post("/verify-paystack", userAuth, orderLimiter, verifyPaystack);

// ADMIN ROUTES
orderRouter.post("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

export default orderRouter;
