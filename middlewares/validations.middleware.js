const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// User validations
const createUserValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Username must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Must provide a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];
// End user validations

// Repair validations
const createRepairValidations = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isString()
    .withMessage("Date must be a string")
    .isDate()
    .withMessage("Must be a date"),
  body("computerNumber")
    .notEmpty()
    .withMessage("computerNumber is required")
    .isNumeric()
    .withMessage("computerNumber must be a number"),
  body("comments")
    .notEmpty()
    .withMessage("Comments is required")
    .isString()
    .withMessage("Comments must be a string"),
];
// End repair valitations

const validateResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join(". ");

    return next(new AppError(404, errorsMsg));
  }

  next();
});

module.exports = {
  createUserValidations,
  createRepairValidations,
  validateResult,
};
