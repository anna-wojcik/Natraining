const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () => new AppError("Your token has expired. Please log in again!", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Global Error Handler
module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    console.log(error);

    if (error.name === "CastError") error = handleCastErrorDB(error); // Invalid ID
    if (error.name === "ValidationError") error = handleValidationError(error); // Incorrect data
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // Duplicate Fields
    if (error.name === "JsonWebTokenError") error = handleJWTError(error); // Invalid JsonWebTokenError
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error); // Token Expired

    sendErrorProd(error, res);
  }
};
