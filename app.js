const express = require("express");
const morgan = require("morgan");

const trainingRouter = require("./routes/trainingRoutes");

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

module.exports = app;
