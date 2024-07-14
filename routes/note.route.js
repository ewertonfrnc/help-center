const express = require("express");

const noteController = require("../controllers/note.controller");
const authMiddleware = require("../middleware/auth.middleware");

const noteRouter = express.Router({ mergeParams: true });

noteRouter
  .route("/")
  .get(authMiddleware.protect, noteController.getNotes)
  .post(authMiddleware.protect, noteController.addNote);

module.exports = noteRouter;
