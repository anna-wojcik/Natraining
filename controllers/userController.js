const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("No User found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "This route is not defined! Please use /signup instead",
  });
};

// Do not update password with this
exports.updateUser = catchAsync(async (req, res, next) => {
  const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newUser) return next(new AppError("No User found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const newUser = await User.findByIdAndDelete(req.params.id);

  if (!newUser) return next(new AppError("No User found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
