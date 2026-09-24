const AppError = require("../../utils/AppError");
const multer = require("multer");

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

  return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((error) => error.message)
    .join(". ");

  throw new AppError(message, 400);
};

const errorhandler = (err, req, res, next) => {
  console.error(err.message);

  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: "Resume file cannot exceed 5 MB",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field",
      LIMIT_FILE_COUNT: "Too many files uploaded",
      LIMIT_FIELD_KEY: "Field name is too long",
      LIMIT_FIELD_VALUE: "Field value is too large",
      LIMIT_FIELD_COUNT: "Too many form fields",
      LIMIT_PART_COUNT: "Too many multipart parts",
      LIMIT_HEADER_COUNT: "Too many multipart headers",
    };

    return res.status(400).json({
      status: "fail",
      message: messages[err.code] || "File upload failed",
    });
  }

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
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
      details: err.details,
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("Technical Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    details: err.details,
  });
};
module.exports = errorhandler;
