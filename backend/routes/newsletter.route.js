import express from "express";
import {
  subscribe,
  getSubscribers,
  sendNewsletter,
  deleteSubscriber,
} from "../controller/newsletter.controller.js";
import adminAuth from "../middleware/adminAuth.js";
import { newsletterLimiter } from "../middleware/rateLimiter.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", newsletterLimiter, subscribe);
newsletterRouter.get("/subscribers", adminAuth, getSubscribers);
newsletterRouter.post("/send", adminAuth, sendNewsletter);
newsletterRouter.post("/delete", adminAuth, deleteSubscriber);

export default newsletterRouter;
