const express = require("express");

// Routes
const { usersRouter } = require("./routes/users.routes");
const { repairsRouter } = require("./routes/repairs.routes");

// Init Express app
const app = express();

// Enabled data incoming JSON
app.use(express.json());

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/repairs", repairsRouter);

module.exports = { app };
