import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controller/cart.controller.js";
import userAuth from "../middleware/user.auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);
cartRouter.get("/get", userAuth, getUserCart);

export default cartRouter;
