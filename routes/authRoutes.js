const express = require("express");
const { Signup, Login } = require("../controllers/authController.js");

const authrouter = express.Router();

// Signup route
authrouter.post("/signup", Signup);

// Login route
authrouter.post("/login", Login);

// (Optional) Logout route to clear the cookie
authrouter.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0), // expire immediately
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = authrouter;
