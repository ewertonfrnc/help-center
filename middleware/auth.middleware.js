const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");

exports.protect = asyncHandler(async (request, response, next) => {
  let token;

  // Get auth jwt token and check if it exists
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }

  if (!token) {
    response.status(401);
    throw new Error("Your are not logged in! Please log in to get access.");
  }

  // Verify jwt token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    response.status(401);
    throw new Error("The user belonging to this token does no longer exist.");
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  request.user = currentUser;
  next();
});
