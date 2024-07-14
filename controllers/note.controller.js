const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const Note = require("../models/note.model");

// @desc    Create notes for a ticket
// @route   GET /api/v1/tickets/:id/notes
// @access  Private
exports.getNotes = asyncHandler(async (request, response) => {
  const user = await User.findByPk(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error("Usuário não encontrado");
  }

  const ticket = await Ticket.findByPk(request.params.id);

  if (ticket.userId !== request.user.id) {
    response.status(401);
    throw new Error("Usuário não autorizado");
  }

  const notes = await Note.findAll({
    where: { ticketId: ticket.id },
  });

  response.status(200).json({
    status: "success",
    results: notes.length,
    notes,
  });
});

// @desc    Create ticket note
// @route   POST /api/v1/tickets/:id/notes
// @access  Private
exports.addNote = asyncHandler(async (request, response) => {
  const user = await User.findByPk(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error("Usuário não encontrado");
  }

  const ticket = await Ticket.findByPk(request.params.id);

  if (ticket.userId !== request.user.id) {
    response.status(401);
    throw new Error("Usuário não autorizado");
  }

  const note = await Note.create({
    text: request.body.text,
    isStaff: false,
    ticketId: ticket.id,
    userId: user.id,
  });

  const notes = await Note.findAll({
    where: { ticketId: ticket.id },
  });

  response.status(200).json({
    status: "success",
    note,
  });
});
