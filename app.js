const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const checkoutRoutes = require("./routes/checkoutRoutes");
const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes"); // <-- Add this

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust origin for your frontend
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", authRoutes); // <-- Mount authentication routes

module.exports = app;
