import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration in days'],
      min: [1, 'Duration must be at least 1 day'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Please add maximum group size'],
      min: [1, 'Group size must be at least 1'],
    },
    difficulty: {
      type: String,
      required: [true, 'Please add a difficulty level'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A trip must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A trip must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A trip must have a cover image'],
    },
    images: [String],
    startDates: [Date],
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    agency: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please add the creator of this trip'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create trip slug from the name
tripSchema.pre('save', function (next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  next();
});

// Populate guides with their data
tripSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: 'name photo role',
  }).populate({
    path: 'agency',
    select: 'name photo role',
  }).populate({
    path: 'createdBy',
    select: 'name photo role',
  });
  next();
});

// Virtual populate reviews
tripSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'trip',
  localField: '_id',
});

// Virtual populate bookings
tripSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'trip',
  localField: '_id',
  justOne: false,
});

// Indexes for better query performance
tripSchema.index({ price: 1, ratingsAverage: -1 });
tripSchema.index({ slug: 1 });
tripSchema.index({ startLocation: '2dsphere' });

// Calculate average rating when a review is saved or updated
tripSchema.statics.calcAverageRatings = async function (tripId) {
  const stats = await this.model('Review').aggregate([
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
    await this.findByIdAndUpdate(tripId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await this.findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Call calcAverageRatings after save and remove
tripSchema.post('save', function () {
  this.constructor.calcAverageRatings(this._id);
});

// Call calcAverageRatings after update and delete
const updateTripStats = async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.trip);
  }
};

tripSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

tripSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r._id);
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
