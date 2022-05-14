const express = require("express");

// Controllers
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users.controllers");

// Middlewares
const { validateSession } = require("../middlewares/auth.middlewares");
const {
  userExists,
  protectAccountOwner,
} = require("../middlewares/users.middlewares");
const {
  createUserValidations,
  validateResult,
} = require("../middlewares/validations.middlewares");

const router = express.Router();

router.post("/", createUserValidations, validateResult, createNewUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/", getAllUsers);

router
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
