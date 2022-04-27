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

const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser);

router
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = {
  usersRouter: router,
};
