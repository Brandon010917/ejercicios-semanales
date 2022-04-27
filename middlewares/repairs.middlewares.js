// Models
const { Repair } = require("../models/repair.model");

const repairExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: "repair not found given that id",
      });
    }

    req.repair = repair;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairExists };
