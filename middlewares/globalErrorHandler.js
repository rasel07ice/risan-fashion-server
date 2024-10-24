const AppError = require("../utils/AppError");
// Error Handler For Development Environment
const devError = (err, res) => {
  console.log("dev error");
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    reson: err.reson,
    message: err.message,
    stack: err.stack,
  });
};

//Error Handler For Production Environment
const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
};

// not found Error Handler
const notFoundErrorHandler = (err) => {
  console.log("not found");
  const message = `contact not exits with ${err.path}: ${err.value}.`;
  return new AppError(message, 404);
};

// Cast Error Handler
const castErrorHandler = (err) => {
  console.log("cast error");
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// duplicate Error Handler
const duplicateErrorHandler = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `field value:${value} aleady exist. please use another`;
  return new AppError(message, 409);
};

//validation Error Handler
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 403);
};

//Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  console.log(`error:${err.status}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(`error:${err.statusCode}`);
  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = castErrorHandler(err);
    if (err.code === 11000) err = duplicateErrorHandler(err);
    if (err.name === "ValidationError") err = validationErrorHandler(err);
    prodError(err, res);
  }
};
module.exports = globalErrorHandler;
