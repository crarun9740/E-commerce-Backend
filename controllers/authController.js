const { User } = require("../models/userModal.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/generateToken.js");

// Cookie options for consistency
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in production, false in development
  sameSite: "none", // Required for cross-origin requests
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  domain:
    process.env.NODE_ENV === "production" ? ".arunchavan.site" : undefined, // Set domain for production
});

// Signup Controller
const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const UserExist = await User.findOne({ email });
    if (UserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie with enhanced options
    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        _id: user._id,
        email: user.email,
      },
      // Don't send token in response body for security
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during signup",
    });
  }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatchpass = await bcrypt.compare(password, user.password);
    if (!isMatchpass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie with enhanced options
    res.cookie("token", token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

// Logout Controller
const Logout = (req, res) => {
  try {
    res.cookie("token", "", {
      ...getCookieOptions(),
      expires: new Date(0), // expire immediately
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

module.exports = { Signup, Login, Logout };
