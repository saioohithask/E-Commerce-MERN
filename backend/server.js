import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import { protect } from "./middleware/authMiddleware.js"
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  })
})

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀")
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
  console.log("Database Name:", mongoose.connection.name);
})
.catch((err) => console.error("MongoDB Error:", err.message));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use("/api/products", productRoutes);


app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);