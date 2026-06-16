import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  verifyOTP,
  sendOTP,
} from "../controller/user.controller.js";
import userAuth from "../middleware/user.auth.js";
import { authLimiter, otpLimiter } from "../middleware/rateLimiter.js";

const userRouter = express.Router();

userRouter.post("/login", authLimiter, loginUser);
userRouter.post("/register", authLimiter, registerUser);
userRouter.post("/admin", authLimiter, adminLogin);
userRouter.post("/send-otp", otpLimiter, sendOTP);
userRouter.post("/verify-otp", otpLimiter, verifyOTP);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/update-profile", userAuth, updateUserProfile);

export default userRouter;
