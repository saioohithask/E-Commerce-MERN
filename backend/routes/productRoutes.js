import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ➕ Add Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📦 Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ❌ Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;