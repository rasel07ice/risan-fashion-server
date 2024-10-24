const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const AppError = require("../utils/AppError");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories: categories });
});

//@desc create user
//@route /api/product
//@access public
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, coverImage } = req.body;
  console.log(name);
  const createCategory = await Category.create({
    name,
    description,
    coverImage,
  });
  res.status(200).json({
    message: "Category created successfully",
    category: createCategory,
  });
});

module.exports = {
  getCategories,
  createCategory,
};
