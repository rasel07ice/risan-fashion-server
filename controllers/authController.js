const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { createUser } = require("./userController");
const AppError = require("../utils/AppError");

const registerOrUpdateUser = async (req, res) => {
  const { displayName, email, uid } = req.body;
  // return res.status(200).json(req.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, update their information
      user.name = displayName || user.name;
      await user.save();
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      // If user doesn't exist, create a new user
      user = new User({
        firebaseUid: uid, // Firebase UID from token
        name: displayName,
        email,
      });
      await user.save();
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//Register user
// const signUp = asyncHandler(async (req, res) => {
//   const hashPassword = await bcryptjs.hash(req.body.password, 10);
//   const user = await User.create({ ...req.body, password: hashPassword });
//   if (user) {
//     //assign jwt token
//     const token = jwt.sign(
//       { userName: user.userName },
//       process.env.SECRET_KEY,
//       {
//         expiresIn: "90d",
//       }
//     );
//     res.status(201).json({
//       status: "success",
//       message: "user registered successfully",
//       token,
//     });
//   } else {
//     throw new AppError("user not registration faild", 401);
//   }
// });

// const signIn = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new AppError("user not found", 404);
//   }
//   const isValid = await bcryptjs.compare(password, user.password);
//   if (!isValid) {
//     throw new AppError("authentication failed", 401);
//   }
//   //assign jwt token
//   const token = jwt.sign({ userName: user.userName }, process.env.SECRET_KEY, {
//     expiresIn: "90d",
//   });
//   res.status(201).json({
//     status: "success",
//     message: "user logined successfully",
//     user: user,
//     token,
//   });
// });

module.exports = { registerOrUpdateUser };
