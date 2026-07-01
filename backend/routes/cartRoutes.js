import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add To Cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({
      userId: req.user.id,
      productId
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity
    });

    res.json(cartItem);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📦 Get Cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.user.id
    }).populate("productId");

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ Increase Quantity
router.put("/:id/increase", protect, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    item.quantity += 1;

    await item.save();

    res.json(item);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➖ Decrease Quantity
router.put("/:id/decrease", protect, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
    } else {
      await Cart.findByIdAndDelete(req.params.id);
    }

    res.json({
      message: "Updated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ Remove Item
router.delete("/:id", protect, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;