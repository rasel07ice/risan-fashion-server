const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  getProductsByCategory,
  createProduct,
  getProductyById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

productRouter.route("/").get(getProducts);
productRouter.route("/category/:category").get(getProductsByCategory);

productRouter.route("/").post(createProduct);

productRouter.route("/:id").get(getProductyById);

productRouter.route("/:id").put(updateProduct);

productRouter.route("/:id").delete(deleteProduct);

module.exports = productRouter;
