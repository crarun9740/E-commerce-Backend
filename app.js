const express = require("express");
const checkoutRoutes = require("./routes/checkoutRoutes");
const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

module.exports = app;
