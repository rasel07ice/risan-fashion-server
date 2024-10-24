const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

//@desc get all users
//@route /api/contacts
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
});

//@desc create user
//@route /api/contacts
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { userId, name, userName, email, password, phone, address, status } =
    req.body;
  console.log({ userId: userId });
  const createdUser = await User.create({
    userId,
    name,
    userName,
    email,
    password,
    phone,
    address,
    status,
  });
  res
    .status(201)
    .json({ status: "success", message: "user created successfully", token });
});

//@desc get a user
//@route /api/contacts/id
//@access public
const getUserById = asyncHandler(async (req, res) => {
  console.log(req.baseUrl.split("/").at(-1));
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError("user not found", 404);
  }
  res.status(200).json({ user: user });
});

//@desc get a user (custom method)
//@route /contacts/id
//@access public
const getUserByEmail = asyncHandler(async (req, res) => {
  console.log(req.params.email);
  const user = await User.findOne({ email: req.params.email });
  console.log(user);
  if (!user) {
    throw new AppError("user not found", 404);
  }
  res.status(200).json({ user: user });
});

//@desc update a user
//@route /api/contacts/id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ dUser: updatedUser });
});

//@desc delete a user
//@route /api/contacts/id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (!user) {
    throw new AppError("user not found", 404);
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ user: user });
});

module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
