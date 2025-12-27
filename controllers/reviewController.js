const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Training = require("../models/trainingModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new AppError("No review found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) return next(new AppError("No review found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) return next(new AppError("No review found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.setTrainingUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.training) req.body.training = req.params.trainingId;
  if (!req.body.user) req.body.user = req.user.id;

  if (!(await Training.findById(req.params.trainingId))) {
    return next(
      AppError(
        "Can not add review to this training. Training with that ID does not exists!",
        404
      )
    );
  }
  next();
});
