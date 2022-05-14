const express = require("express");

// Routes
const { usersRouter } = require("./routes/users.routes");
const { repairsRouter } = require("./routes/repairs.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/errors.controller");

// Utils
const { AppError } = require("./utils/appError");

// Init Express app
const app = express();

// Enabled data incoming JSON
app.use(express.json());

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/repairs", repairsRouter);

// Global error handler
app.use("*", (req, res, next) => {
  return next(
    new AppError(404, `${req.originalUrl} not found in this server.`)
  );
});

app.use("*", globalErrorHandler);

module.exports = { app };
