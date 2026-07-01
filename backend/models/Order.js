import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],

  totalPrice: Number,

  status: {
    type: String,
    default: "Placed"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);