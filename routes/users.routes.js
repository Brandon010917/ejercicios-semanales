const express = require("express");

// Controllers
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  createUserValidations,
  validateResult,
} = require("../middlewares/validations.middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidations, validateResult, createNewUser);

router
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = {
  usersRouter: router,
};
