const express = require("express");
const { Signup, Login, Logout } = require("../controllers/authController.js");

const authrouter = express.Router();

// Signup route
authrouter.post("/signup", Signup);

// Login route
authrouter.post("/login", Login);

// Logout route
authrouter.post("/logout", Logout);

// Health check route for testing
authrouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth service is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = authrouter;
