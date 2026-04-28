import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import axios from "axios";

// PLACE ORDER - COD
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // clear user cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// PLACE ORDER WITH PAYSTACK
const placeOrderPaystack = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Paystack",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // amount in kobo (Paystack uses smallest currency unit)
    const paystackAmount = amount * 100;

    res.json({
      success: true,
      orderId: newOrder._id,
      amount: paystackAmount,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY PAYSTACK PAYMENT
const verifyPaystack = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    // check if already paid
    const existingOrder = await orderModel.findById(orderId);
    if (!existingOrder) {
      return res.json({ success: false, message: "Order not found" });
    }
    if (existingOrder.payment === true) {
      return res.json({ success: true, message: "Order already verified" });
    }

    // verify with paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = response.data.data;

    // verify status
    if (data.status !== "success") {
      return res.json({ success: false, message: "Payment not successful" });
    }

    // verify amount matches - most important check
    const expectedAmount = existingOrder.amount * 100; // convert to kobo
    if (data.amount !== expectedAmount) {
      return res.json({
        success: false,
        message: "Payment amount mismatch. Please contact support.",
      });
    }

    // verify currency
    if (data.currency !== "NGN") {
      return res.json({ success: false, message: "Invalid currency" });
    }

    // all checks passed - mark as paid
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS - ADMIN
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE ORDER STATUS - ADMIN
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderPaystack,
  verifyPaystack,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
