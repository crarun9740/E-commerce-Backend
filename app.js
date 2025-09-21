const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const checkoutRoutes = require("./routes/checkoutRoutes");
const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Enhanced CORS Configuration
const corsOptions = {
  origin: "https://fashion-bhandar.arunchavan.site", // Your deployed frontend
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cookie",
  ],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false,
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Additional middleware to handle CORS manually if needed
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://fashion-bhandar.arunchavan.site"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }

  next();
});

// Routes
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
