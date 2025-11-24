const Training = require("../models/trainingModel");

exports.getAllTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find();

    res.status(200).json({
      status: "success",
      data: {
        data: trainings,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTraining = async (req, res, next) => {
  const training = Training.findById(req.params.id);

  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
