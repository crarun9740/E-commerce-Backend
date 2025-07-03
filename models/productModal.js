const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: String,
  image: String,
  rating: String,
  property: String,
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
