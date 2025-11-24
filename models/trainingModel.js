const mongoose = require("mongoose");
const slugify = require("slugify");

const trainingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Training must have a name"],
      unique: true,
      trim: true,
      minlength: [10, "A Training must have more or equal than 10 characters"],
      maxlength: [40, "A Training must have less or equal than 40 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Training must have a duration"],
    },
    trainingType: {
      type: String,
      required: [true, "A Training must have a training type"],
      trim: true,
      enum: {
        values: [
          "Football",
          "Volleyball",
          "Handball",
          "Basketball",
          "Tennis",
          "Hockey",
        ],
        message:
          "Training type is either: Football, Volleyball, Handball, Basketball, Tennis, Hockey",
      },
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Training must have a group size"],
    },
    level: {
      type: String,
      required: [true, "A Training must have a level"],
      trim: true,
      enum: {
        values: ["Beginer", "Intermediate", "Advanced"],
        message: "Level is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10.0,
      // set is called every time new value is set, it runs callback function
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Training must have a price"],
    },
    summary: {
      type: String,
      required: [true, "A Training must have a summary"],
    },
    description: {
      type: String,
      required: [true, "A Training must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A Training must have a image cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    startTime: {
      type: String,
      required: [true, "A Training must have a start time"],
    },
    endTime: {
      type: String,
      required: [true, "A Training must have a end time"],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true, // dezaktywacja treningu np. z powodu braku zainteresowania
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room", // dodanie referencji do Room
    },
    trainers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// wirtualna referencja do reviews

trainingSchema.pre("save", function (next) {
  // this: to aktualnie przetwarzany dokument
  this.slug = slugify(this.name, { lower: true });

  next(); // wywłoanie kolejnego middlewara
});

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;