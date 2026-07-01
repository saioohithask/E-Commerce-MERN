import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 Place Order
router.post("/", protect, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      products,
      totalPrice,
      status: "Placed"
    });

    // 🗑️ Clear user's cart after successful order
    await Cart.deleteMany({
      userId: req.user.id
    });

    res.json(order);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 📦 Get Orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id
    })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ❌ Cancel Order
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Security: only owner can cancel
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled"
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully ✅",
      order
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;