const mongoose = require("mongoose");
const Training = require("./trainingModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review can not be empty"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be belowe or equal 5.0"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Review must belong to a User"],
    },
    training: {
      type: mongoose.Schema.ObjectId,
      ref: "Training",
      required: [true, "A Review must belong to a Training"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ training: 1, user: 1 }, { unique: true }); // każda kombinacja training i user musi być unikalna, jeden użytkownik będzie mógł dodać jedną opinię do jednej wycieczki

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (trainingId) {
  // this - current Model = Review
  const stats = await this.aggregate([
    {
      $match: { training: trainingId },
    },
    {
      $group: {
        _id: "$training",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Training.findByIdAndUpdate(trainingId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Training.findByIdAndUpdate(trainingId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Aktualizacja ratingsAverage przy dodaniu nowej opinii. 
reviewSchema.post("save", function () {
  // this points to current review
  // this.constructor = Review (Model)
  this.constructor.calcAverageRatings(this.training);
});

// // Aktualizacja ratingsAverage przy edytowaniu/usunięciu opinii.
reviewSchema.post(/^findOneAnd/, async function (doc) {
  // doc to dokument, który został zaktualizowany/usunięty
  if (!doc) return;

  await doc.constructor.calcAverageRatings(doc.training);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;