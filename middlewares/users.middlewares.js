// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: "available",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return next(new AppError(404, "Can't find user with the given id"));
  }

  req.user = user;

  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { id } = req.params;

  if (currentUser.id !== +id) {
    return next(
      new AppError(404, "You can't update or delete other users accounts")
    );
  }

  next();
});

module.exports = { userExists, protectAccountOwner };
