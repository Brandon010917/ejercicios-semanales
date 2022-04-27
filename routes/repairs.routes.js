const express = require("express");

// Controllers
const {
  getAllRepairs,
  createNewRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require("../controllers/repairs.controllers");

// Middlewares
const { repairExists } = require("../middlewares/repairs.middlewares");

const router = express.Router();

router.route("/").get(getAllRepairs).post(createNewRepair);

router
  .use("/:id", repairExists)
  .route("/:id")
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = {
  repairsRouter: router,
};
