const Training = require("../models/trainingModel");
const APIFeatures = require("../utils/apiFeatures");
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