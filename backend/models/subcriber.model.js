import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const subscriberModel = mongoose.model("Subscriber", subscriberSchema);
export default subscriberModel;
