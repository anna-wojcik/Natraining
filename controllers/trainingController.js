const Training = require("../models/trainingModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTrainings = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    // + Error handling

    res.status(200).json({
      status: "success",
      data: {
        training,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTraining = async (req, res) => {
  try {
    const training = await Training.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        training,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // + Error handling

    res.status(200).json({
      status: "success",
      data: {
        training,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);

    // + Error handling

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
