// Models
const { Repair } = require("../models/repair.model");
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const repairExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: "pending",
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  });

  if (!repair) {
    return next(new AppError(404, "Can't find repair with the given id"));
  }

  req.repair = repair;

  next();
});

module.exports = { repairExists };
