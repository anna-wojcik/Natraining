const Training = require("../models/trainingModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const trainings = await Training.find();

  res.status(200).render("overview", {
    title: "All Trainings",
    trainings,
  });
});
