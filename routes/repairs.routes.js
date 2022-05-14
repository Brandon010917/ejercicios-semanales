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
const {
  validateSession,
  protectedEmployee,
} = require("../middlewares/auth.middlewares");
const { repairExists } = require("../middlewares/repairs.middlewares");
const {
  createRepairValidations,
  validateResult,
} = require("../middlewares/validations.middlewares");

const router = express.Router();

router.use(validateSession);

router.post("/", createRepairValidations, validateResult, createNewRepair);

router.use(protectedEmployee);

router.get("/", getAllRepairs);

router
  .use("/:id", repairExists)
  .route("/:id")
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = {
  repairsRouter: router,
};
