import express from "express";
import { getPaymentHistory } from "../controller/payment.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const paymentRouter = express.Router();
paymentRouter.get("/history", adminAuth, getPaymentHistory);

export default paymentRouter;
