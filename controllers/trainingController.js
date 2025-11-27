const Training = require("../models/trainingModel");
const qs = require("qs");

exports.getAllTrainings = async (req, res) => {
  try {
    // Filtering
    let queryObj = qs.parse(req.query);
    let excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    let query = Training.find(queryObj);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Fields limiting
    if (req.query.fields) {
      const limitedFields = req.query.fields.split(",").join(" ");
      query = query.select(limitedFields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTrainings = await Training.countDocuments();
      if (skip >= numTrainings) throw new Error("This page does not exist");
    }

    const trainings = await query;

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
