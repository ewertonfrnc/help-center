const express = require("express");

const notesController = require("../controllers/notes.controller");

const notesRouter = express.Router();

notesRouter
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.getNote);

notesRouter
  .route("/:id")
  .get(notesController.getNote)
  .delete(notesController.deleteNote);

module.exports = notesRouter;
