// Models
const { User } = require("../models/user.model");

// Utils
const { filterObj } = require("../utils/filterObj");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "available",
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const data = filterObj(req.body, "name", "email");

    await user.update({ ...data });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({
      status: "deleted",
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
};
