import express from "express";
import {
  addProduct,
  editProduct,
  listProducts,
  listSingleProduct,
  removeProduct,
} from "../controller/product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRouter.get("/list", generalLimiter, listProducts);
productRouter.get("/single/:productId", generalLimiter, listSingleProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/edit", adminAuth, editProduct);

export default productRouter;
// public product listing — general limiter
import { generalLimiter } from "../middleware/rateLimiter.js";
