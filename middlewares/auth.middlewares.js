const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const validateSession = catchAsync(async (req, res, next) => {
  const { headers } = req;
  let token;

  if (headers.authorization && headers.authorization.startsWith("Bearer ")) {
    token = headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError(404, "Invalid session"));
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findOne({
    where: {
      id: decodedToken.id,
      status: "available",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return next(new AppError(404, "Invalid session"));
  }

  req.currentUser = user;

  next();
});

const protectedEmployee = catchAsync(async (req, res, next) => {
  const { role } = req.currentUser;

  if (role !== "admin" && role !== "employee") {
    return next(new AppError(404, "Access denied"));
  }

  next();
});

module.exports = {
  validateSession,
  protectedEmployee,
};
