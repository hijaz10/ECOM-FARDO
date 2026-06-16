import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },

  paystackReference: {
    type: String,
    default: "",
  },

  confirmationEmailSent: { type: Boolean, default: false },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

orderSchema.index({ userId: 1, date: -1 });

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
