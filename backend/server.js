import "./config/env.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import { initCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import newsletterRouter from "./routes/newsletter.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import paymentRouter from "./routes/payment.route.js";
import helmet from "helmet";
import { generalLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

// connect database
await connectDB();
initCloudinary();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(generalLimiter);

//API ENDPOINTS
app.use("/api/user/", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/payment", paymentRouter);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
