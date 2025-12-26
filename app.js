const path = require("path");
const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const trainingRouter = require("./routes/trainingRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from the body into req.body
app.use(express.json());

app.set("view engine", "pug"); // template engine - pug
app.set("views", path.join(__dirname, "views"));

// app.use((req, res, next) => {
//   console.log("Hello from the middleware");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/trainings", trainingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
