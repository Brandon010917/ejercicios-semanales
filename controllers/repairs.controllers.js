// Models
const { Repair } = require("../models/repair.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const createNewRepair = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comments } = req.body;
  const { currentUser } = req;

  const newRepair = await Repair.create({
    date,
    computerNumber,
    comments,
    userId: currentUser.id,
  });

  res.status(201).json({
    newRepair,
  });
});

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: "pending",
    },
    include: [{ model: User, attributes: { exclude: ["password"] } }],
  });

  res.status(200).json({
    repairs,
  });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const { status } = req.body;

  await repair.update({ status });

  res.status(200).json({
    status: "success",
  });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({
    status: "cancelled",
  });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllRepairs,
  createNewRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
