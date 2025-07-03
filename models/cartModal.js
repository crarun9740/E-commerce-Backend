const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Cart", cartSchema);
