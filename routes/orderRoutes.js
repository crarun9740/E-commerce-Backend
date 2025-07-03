const express = require("express");

const { addToOrder, getOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/addToOrder", addToOrder);

router.get("/getOrder", getOrder);

module.exports = router;
