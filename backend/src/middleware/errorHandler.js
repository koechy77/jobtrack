const AppError = require("../../utils/AppError");

const handleJWTExpiredError = () => {
  return new AppError("Your session has expired. Please log in again.", 401);
};

const handleJWTError = () => {
  return new AppError("Invalid token. Please log in again.", 401);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];

  const message = `Duplicate field value: ${value}. Please use another value.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((error) => error.message)
    .join(". ");

  return new AppError(message, 400);
};

const errorhandler = (err, req, res) => {
  console.error(err.message);
  if (err.name === "JsonWebTokenError") {
    err = handleJWTError();
  }

  if (err.name === "TokenExpiredError") {
    err = handleJWTExpiredError();
  }

  if (err.name === "CastError") {
    err = handleCastErrorDB(err);
  }

  if (err.code === 11000) {
    err = handleDuplicateFieldsDB(err);
  }

  if (err.name === "ValidationError") {
    err = handleValidationErrorDB(err);
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statuscode || 500).json({
      status: err.status || "error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("Technical Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};
module.exports = errorhandler;
