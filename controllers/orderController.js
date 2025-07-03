const Order = require("../models/orderModal");

exports.addToOrder = async (req, res) => {
  const { product } = req.body;

  console.log(product);

  try {
    const added = await Order.create(product);

    res.status(200).json({
      message: "Added to cart",
    });
  } catch (err) {
    res.status(404).json({
      message: "Added to cart failed",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orderItems = await Order.find();

    res.status(200).json({
      orderItems,
      message: "Getting the cart item succesfully",
    });
  } catch (err) {
    res.status(404).json({
      message: "Getting the cart item failed",
    });
  }
};
