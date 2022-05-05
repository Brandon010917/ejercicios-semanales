// Models
const { User } = require("../models/user.model");
const { Repair } = require("../models/repair.model");

const initModels = () => {
  // Establish relations between models
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = { initModels };
