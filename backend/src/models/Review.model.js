import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
      trim: true,
      maxlength: [1000, 'A review must have less or equal than 1000 characters'],
      minlength: [10, 'A review must have more or equal than 10 characters'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A review must have a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    trip: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trip',
      required: [true, 'Review must belong to a trip'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent duplicate reviews from the same user on the same trip
reviewSchema.index({ trip: 1, user: 1 }, { unique: true });

// Populate user data when querying reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// Calculate average ratings when a review is saved
reviewSchema.statics.calcAverageRatings = async function (tripId) {
  const stats = await this.aggregate([
    {
      $match: { trip: tripId },
    },
    {
      $group: {
        _id: '$trip',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model('Trip').findByIdAndUpdate(tripId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await this.model('Trip').findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Call calcAverageRatings after save
reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.trip);
});

// Call calcAverageRatings after update and delete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.trip);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
