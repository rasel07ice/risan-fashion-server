const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

categoryRouter.route("/").get(getCategories);

categoryRouter.route("/").post(createCategory);

module.exports = categoryRouter;
