const Training = require("../models/trainingModel");
const APIFeatures = require("../utils/apiFeatures");
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
