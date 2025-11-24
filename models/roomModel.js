const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Room must have a name"],
      trim: true,
      unique: true,
      minlength: [2, "A Room must have more or equal than 10 characters"],
      maxlength: [20, "A Room must have less or equal than 40 characters"],
    },
    roomType: {
      type: String,
      required: true,
      enum: {
        values: ["Hall", "Gym", "Court", "Fitness"],
        message: "Room type is either: Hall, Gym, Court, Fitness",
      },
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    isAvailable: {
      type: Boolean,
      default: true, // dezaktywacja sali np. w remoncie
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate - pokaże wszystkie treningi przypisane do sali
roomSchema.virtual("trainings", {
  ref: "Training",
  foreignField: "room",
  localField: "_id",
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
