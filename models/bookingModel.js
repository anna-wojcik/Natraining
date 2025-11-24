const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'A Booking must belong to a User.'],
  },
  training: {
    type: mongoose.Schema.ObjectId,
    ref: "Training",
    required: [true, 'A Booking must belong to a Tour.'],
  },
  price: {
    type: Number,
    required: [true, "A Booking must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;