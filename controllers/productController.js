const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");

//@desc get all Products
//@route /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products: products });
});

//@desc get all Products By Category
//@route /api/products
//@access public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const categoryParam = req.params.category;
  const products = await Product.find({ category: categoryParam });
  res.status(200).json({ products: products });
});

//@desc get all  Category
//@route /api/products
//@access public
const getCategories = asyncHandler(async (req, res) => {
  const products = await Product.find({},'name friends');
  res.status(200).json({ products: products });
});

//@desc create user
//@route /api/product
//@access public
const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    trending,
    coverImage,
    oldPrice,
    newPrice,
  } = req.body;
  console.log(title);
  const createProduct = await Product.create({
    title,
    description,
    category,
    trending,
    coverImage,
    oldPrice,
    newPrice,
  });
  res
    .status(200)
    .json({ message: "Product created successfully", product: createProduct });
});

//@desc get a user
//@route /api/contacts/id
//@access public
const getProductyById = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError("product not found", 404);
  }
  res.status(200).json({ product: product });
});

//@desc update a user
//@route /api/contacts/id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct,
    });
});

//@desc delete a user
//@route /api/contacts/id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError("product not found", 404);
  }
  await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: "Product deleted successfully", deletedProduct: product });
});

module.exports = {
  getProducts,
  getProductsByCategory,
  createProduct,
  getProductyById,
  updateProduct,
  deleteProduct,
};
