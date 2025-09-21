const express = require("express");
const { Signup, Login } = require("../controllers/authController.js");

const authrouter = express.Router();

authrouter.post("/signup", Signup);
authrouter.post("/login", Login);

module.exports = authrouter;
