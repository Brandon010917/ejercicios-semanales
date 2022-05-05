// Models
const { Repair } = require("../models/repair.model");
const { User } = require("../models/user.model");

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: "pending",
      },
      include: [{ model: User }],
    });

    res.status(200).json({
      repairs,
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewRepair = async (req, res) => {
  try {
    const { date, computerNumber, comments, userId } = req.body;

    const newRepair = await Repair.create({
      date,
      computerNumber,
      comments,
      userId,
    });

    res.status(201).json({
      newRepair,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { repair } = req;

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    const { status } = req.body;

    await repair.update({ status });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({
      status: "cancelled)",
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRepairs,
  createNewRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
