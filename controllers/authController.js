const { User } = require("../models/userModal.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/generateToken.js");

// Signup Controller
const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const UserExist = await User.findOne({ email });

    if (UserExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Entered password:", password);
    console.log("Stored password:", user.password);

    const isMatchpass = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatchpass);

    if (!isMatchpass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};

module.exports = { Signup, Login };
