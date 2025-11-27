const express = require("express");
const morgan = require("morgan");

const trainingRouter = require("./routes/trainingRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const roomRouter = require("./routes/roomRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from the body into req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/trainings", trainingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/rooms", roomRouter);

module.exports = app;
