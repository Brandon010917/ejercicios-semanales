const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

// Models
const { User } = require("../models/user.model");
const { AppError } = require("../utils/appError");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: "available",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  res.status(200).json({
    users,
  });
});

const createNewUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);

  console.log(salt);

  const hasedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hasedPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    newUser,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const data = filterObj(req.body, "name", "email");

  await user.update({ ...data });

  res.status(200).json({
    status: "success",
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: "deleted",
  });

  res.status(200).json({
    status: "success",
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: "available",
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, "Invalid credentials"));
  }

  user.password = undefined;

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    token,
    user,
  });
});

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
