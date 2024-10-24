const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

userRouter.route("/").get(getUsers);

userRouter.route("/").post(createUser);

userRouter.route("/:id").get(getUserById);
userRouter.route("/user/:email").get(getUserByEmail);

userRouter.route("/:id").put(updateUser);

userRouter.route("/:id").delete(deleteUser);

module.exports = userRouter;
