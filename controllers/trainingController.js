const Training = require("../models/trainingModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTrainings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Training.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const trainings = await features.query;

  res.status(200).json({
    status: "success",
    results: trainings.length,
    data: {
      trainings,
    },
  });
});

exports.getTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findById(req.params.id);

  if(!training) return next(new AppError('No training found with that ID', 404));

  res.status(200).json({
    status: "success",
    data: {
      training,
    },
  });
});

exports.createTraining = catchAsync(async (req, res, next) => {
  const training = await Training.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      training,
    },
  });
});

exports.updateTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!training) return next(new AppError('No training found with that ID', 404));

  res.status(200).json({
    status: "success",
    data: {
      training,
    },
  });
});

exports.deleteTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findByIdAndDelete(req.params.id);

  if(!training) return next(new AppError('No training found with that ID', 404));
  
  res.status(204).json({
    status: "success",
    data: null,
  });
});
