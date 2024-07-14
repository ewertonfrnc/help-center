const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");

// @desc    Get user ticket
// @route   GET /api/v1/tickets
// @access  private
exports.getTickets = asyncHandler(async (request, response) => {
  const currentUser = await User.findByPk(request.user.id);

  if (!currentUser) {
    response.status(401);
    throw new Error("Usuário inexistente!");
  }

  const tickets = await Ticket.findAll({
    where: {
      userId: currentUser.id,
    },
  });

  response.status(200).json({
    status: "success",
    results: tickets.length,
    tickets,
  });
});

// @desc    Get user ticket
// @route   GET /api/v1/tickets/:id
// @access  private
exports.getTicket = asyncHandler(async (request, response) => {
  const currentUser = await User.findByPk(request.user.id);

  if (!currentUser) {
    response.status(401);
    throw new Error("Usuário inexistente!");
  }

  const ticket = await Ticket.findByPk(request.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket não encontrado");
  }

  if (ticket.userId !== request.user.id) {
    response.status(401);
    throw new Error("Não autorizado");
  }

  response.status(200).json({
    status: "success",
    ticket,
  });
});

// @desc    Update ticket
// @route   PUT /api/v1/tickets/:id
// @access  private
exports.updateTicket = asyncHandler(async (request, response) => {
  const currentUser = await User.findByPk(request.user.id);

  if (!currentUser) {
    response.status(401);
    throw new Error("Usuário inexistente!");
  }

  const ticket = await Ticket.findByPk(request.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket não encontrado");
  }

  if (ticket.userId !== request.user.id) {
    response.status(401);
    throw new Error("Não autorizado");
  }

  const updatedTicket = await Ticket.update(request.body, {
    where: {
      id: request.params.id,
    },
    returning: true,
    plain: true,
  });

  response.status(200).json({
    status: "success",
    updatedTicket: updatedTicket[1],
  });
});

// @desc    Create new ticket
// @route   POST /api/v1/tickets
// @access  private
exports.createTicket = asyncHandler(async (request, response) => {
  const { product, description } = request.body;

  if (!product || !description) {
    response.status(400);
    throw new Error("Por favor, adicione um produto e descrição");
  }

  const currentUser = await User.findByPk(request.user.id);

  if (!currentUser) {
    response.status(401);
    throw new Error("Usuário inexistente!");
  }

  const ticket = await Ticket.create({
    userId: currentUser.id,
    status: "new",
    description,
    product,
  });

  response.status(201).json({
    status: "success",
    ticket,
  });
});

// @desc    Delete ticket
// @route   DELETE /api/v1/tickets/:id
// @access  private
exports.deleteTicket = asyncHandler(async (request, response) => {
  const user = await User.findByPk(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error("Usuário não encontrado");
  }

  await Ticket.destroy({ where: { id: request.params.id } });

  response.status(200).json({
    status: "success",
  });
});
