const { app } = require("./app");

// Utils
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

const PORT = process.env.PORT || 4000;

// Database
sequelize
  .authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((error) => console.log(error));

initModels();

sequelize
  .sync()
  .then(() => console.log("Database Synced"))
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log("App listening on port " + PORT));
