const globalErrorHandler = (err, req, res, next) => {
  statusCode = err.statusCode || 500;
  message = err.message || "fail";

  res.status(statusCode).json({
    status: err.status,
    message,
    error: err,
    stack: err.stack,
  });
};

module.exports = { globalErrorHandler };
