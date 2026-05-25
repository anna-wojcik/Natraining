const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const trainingRouter = require("./routes/trainingRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const bookingController = require("./controllers/bookingController");

const app = express();

// Handler needs raw data as String (before express.json() formats it to JSON), data come from Stripe
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout,
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allows to send cookies containing JWT
  }),
);

// Engine for generating emails
app.set("view engine", "pug"); // template engine - pug
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // max 100 request
  windowMs: 60 * 60 * 1000, // in 1 hour
  message: "Too many request from this IP. Please try again in an hour.",
});
app.use("/api", limiter); // limiter works only if URL contains /api

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "level",
      "price",
    ],
  }),
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.body);
  next();
});

// ROUTES
app.use("/api/v1/trainings", trainingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
