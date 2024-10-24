const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    trending: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      required: [true, "Please enter image"],
    },
    oldPrice: Number,
    newPrice: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
