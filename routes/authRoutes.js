const express = require("express");
const authRouter = express.Router();
const { registerOrUpdateUser } = require("../controllers/authController");
// const verifyToken = require("../middlewares/verifyToken");

authRouter.route("/register").post(registerOrUpdateUser);
// userRoutes.post("/register", verifyToken, registerOrUpdateUser);

// authRouter.route("/signup").post(signUp);

// authRouter.route("/login").post(signIn);

module.exports = authRouter;
