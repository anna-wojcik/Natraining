const Review = require("../models/reviewModel");
const Training = require("../models/trainingModel");
const APIFeatures = require("../utils/apiFeatures");
const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Training.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const trainings = await features.query;

  res.status(200).render("overview", {
    title: "All Trainings",
    trainings,
  });
});

exports.getTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findOne({ slug: req.params.slug });

  if (!training) {
    return next(new AppError("There is no training with that name.", 404));
  }

  res.status(200).render("training", {
    title: `${training.name} Training`,
    training,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "Create new account",
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render("account", {
    title: "Your account",
    activePage: "settings",
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id }).populate({
    path: "training",
    select: "-__v",
  });

  res.status(200).render("account", {
    title: "My Reviews",
    activePage: "reviews",
    reviews,
  });
});

exports.getMyTrainings = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  let trainingIds = bookings.map((el) => el.training);

  // 2) Find training with the returned IDs
  const trainings = await Training.find({ _id: { $in: trainingIds } });

  res.status(200).render("account", {
    title: "Your trainings",
    activePage: "trainings",
    trainings,
  });
});

exports.getAllTrainings = catchAsync(async (req, res, next) => {
  const trainings = await Training.find();

  res.status(200).render("account", {
    title: "Manage trainings",
    activePage: "manage-trainings",
    trainings,
  });
});
