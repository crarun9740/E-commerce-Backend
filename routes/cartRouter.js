const express = require("express");
const {
  addToCart,
  getCart,
  removeCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/addToCart", addToCart);

router.get("/getCart", getCart);

router.delete("/deleteCartById/:productId", removeCart);

module.exports = router;
