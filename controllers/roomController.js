const Room = require("../models/roomModel");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    // + Filter np. available

    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    // + Error handler

    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    
    res.status(201).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // + Error handling

    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

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

