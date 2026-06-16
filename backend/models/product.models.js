import mongoose from "mongoose";

const shadeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  hex: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  description2: { type: String, default: "" },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Lipstick",
      "Lipgloss",
      "Lipliner",
      "Foundation",
      "Powder",
      "Mascara",
      "Brush",
      "Accessories",
    ],
  },
  quantity: { type: Number, required: true, default: 0 },
  shades: { type: [shadeSchema], default: [] },
  bestSeller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

productSchema.index({ category: 1, date: -1 });
productSchema.index({ bestSeller: 1 });

const productModel = mongoose.model("product", productSchema);
export default productModel;
