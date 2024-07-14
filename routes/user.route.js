const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.route("/register").post(authController.register);
userRouter.route("/login").post(authController.login);
userRouter
  .route("/me")
  .get(authMiddleware.protect, authController.getCurrentUser);

module.exports = userRouter;
