const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const ticketsController = require("../controllers/ticket.controller");

const noteRouter = require("./note.route");

const ticketRouter = express.Router();
ticketRouter.use("/:id/notes", noteRouter);

ticketRouter
  .route("/")
  .get(authMiddleware.protect, ticketsController.getTickets)
  .post(authMiddleware.protect, ticketsController.createTicket)
  .delete(authMiddleware.protect, ticketsController.deleteTicket);

ticketRouter
  .route("/:id")
  .get(authMiddleware.protect, ticketsController.getTicket)
  .put(authMiddleware.protect, ticketsController.updateTicket)
  .delete(authMiddleware.protect, ticketsController.deleteTicket);

module.exports = ticketRouter;
