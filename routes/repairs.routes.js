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
const {
  createRepairValidations,
  validateResult,
} = require("../middlewares/validations.middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllRepairs)
  .post(createRepairValidations, validateResult, createNewRepair);

router
  .use("/:id", repairExists)
  .route("/:id")
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = {
  repairsRouter: router,
};
