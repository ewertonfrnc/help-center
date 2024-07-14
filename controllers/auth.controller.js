const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}

// @desc    Register a new user
// @route   /api/v1/users/register
// @access  public
exports.register = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400);
    throw new Error("Por favor, preencha todos os campos!");
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    response.status(400);
    throw new Error("Este usuário já existe!");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    response.status(400);
    throw new Error("Dados inválidos");
  }

  response.status(201).json({
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    },
  });
});

// @desc    Login user
// @route   /api/v1/users/login
// @access  public
exports.login = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      },
    });
  } else {
    response.status(401);
    throw new Error("Credenciais inválidas!");
  }
});

// @desc    Get current user data
// @route   /api/v1/users/me
// @access  private
exports.getCurrentUser = asyncHandler(async (request, response) => {
  response.status(200).json({
    status: "success",
    user: request.user,
  });
});
