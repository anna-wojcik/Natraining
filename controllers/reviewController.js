const Review = require("../models/reviewModel");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // + Error handling

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // + Error handling

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

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
