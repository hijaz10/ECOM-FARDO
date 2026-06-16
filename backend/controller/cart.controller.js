import userModel from "../models/user.model.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
