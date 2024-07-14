const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./database/db.config");

const errorMiddleware = require("./middleware/error.middleware");

const userRouter = require("./routes/user.route");
const ticketRouter = require("./routes/ticket.route");
const noteRouter = require("./routes/note.route");

dotenv.config();

const app = express();

sequelize
  .authenticate()
  .then(() =>
    console.log("Connection has been established successfully.".cyan.underline)
  )
  .catch((error) =>
    console.error(
      `Unable to connect to the database: ${error}`.red.underline.bold
    )
  );

sequelize
  .sync({ force: true })
  .then(() =>
    console.log("All models were synchronized successfully.".cyan.bold)
  );

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("dist"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/notes", noteRouter);

app.use(errorMiddleware.errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
    `NODE_ENV: ${process.env.NODE_ENV}`
  );
});
