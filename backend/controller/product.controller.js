import productModel from "../models/product.models.js";
import { initCloudinary } from "../config/cloudinary.js";

const cloudinary = initCloudinary();

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      description2,
      price,
      category,
      bestSeller,
      shades,
      quantity,
    } = req.body;

    const images = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0],
    ].filter(Boolean);

    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const product = new productModel({
      name,
      description,
      description2: description2 || "",
      price: Number(price),
      category,
      quantity: Number(quantity) || 0,
      shades: shades ? JSON.parse(shades) : [],
      bestSeller: bestSeller === "true",
      image: imageUrls,
      date: Date.now(),
    });

    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      description2,
      price,
      category,
      bestSeller,
      shades,
      quantity,
    } = req.body;

    await productModel.findByIdAndUpdate(id, {
      name,
      description,
      description2: description2 || "",
      price: Number(price),
      category,
      quantity: Number(quantity) || 0,
      shades: typeof shades === "string" ? JSON.parse(shades) : shades || [],
      bestSeller: bestSeller === "true" || bestSeller === true,
    });

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LIST ALL PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).lean();
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET SINGLE PRODUCT
const listSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId).lean();

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  listSingleProduct,
  removeProduct,
  editProduct,
};
