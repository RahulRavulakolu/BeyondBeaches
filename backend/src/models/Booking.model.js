import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trip',
      required: [true, 'Booking must belong to a trip'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user'],
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price'],
    },
    startDate: {
      type: Date,
      required: [true, 'Booking must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Booking must have an end date'],
    },
    participants: {
      type: Number,
      required: [true, 'Please specify number of participants'],
      min: [1, 'Participants must be at least 1'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentId: String,
    paymentMethod: String,
    paidAt: Date,
    payment: {
      provider: {
        type: String,
        trim: true,
      },
      transactionId: {
        type: String,
        trim: true,
      },
      amount: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        trim: true,
        uppercase: true,
      },
      receiptUrl: {
        type: String,
        trim: true,
      },
      raw: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot be more than 500 characters'],
    },
    cancellationReason: String,
    cancelledAt: Date,
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate trip and user data when querying bookings
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'trip',
    select: 'title price duration imageCover startLocation',
  });
  next();
});

// Only show active bookings by default
bookingSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// Calculate end date based on trip duration
bookingSchema.pre('save', async function (next) {
  if (!this.startDate || !this.trip) return next();

  const trip = await this.model('Trip').findById(this.trip);
  if (!trip) return next();

  const endDate = new Date(this.startDate);
  endDate.setDate(endDate.getDate() + trip.duration);
  this.endDate = endDate;

  next();
});

// Virtual for calculating total price
bookingSchema.virtual('totalPrice').get(function () {
  return this.price * this.participants;
});

// Indexes for better query performance
bookingSchema.index({ trip: 1, user: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
