const Cart = require("../models/cartModal");

exports.addToCart = async (req, res) => {
  const { product } = req.body;

  try {
    const added = await Cart.create(product);

    res.status(200).json({
      message: "Added to cart",
    });
  } catch (err) {
    res.status(404).json({
      message: "Added to cart failed",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find();

    res.status(200).json({
      cartItems,
      message: "Getting the cart item succesfully",
    });
  } catch (err) {
    res.status(404).json({
      message: "Getting the cart item failed",
    });
  }
};

exports.removeCart = async (req, res) => {
  const { productid } = req.params;
  console.log(productid);
  try {
    await Cart.deleteOne({
      id: productid,
    });

    res.status(200).json({
      message: "Deleted the cart item succesfully",
    });
  } catch (err) {
    res.status(404).json({
      message: "Deleted the cart item failed",
    });
  }
};
