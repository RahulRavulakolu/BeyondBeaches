import Booking from '../models/Booking.model.js';
import Trip from '../models/Trip.model.js';
import User from '../models/User.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllBookings = catchAsync(async (req, res, next) => {
  // Allow nested routes
  let filter = {};
  if (req.params.tripId) filter = { trip: req.params.tripId };
  if (req.params.userId) filter = { user: req.params.userId };

  const features = new APIFeatures(Booking.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bookings = await features.query;

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

export const getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if the user has permission to view this booking
  if (
    req.user.role !== 'admin' &&
    booking.user._id.toString() !== req.user.id &&
    (booking.trip.guides && !booking.trip.guides.includes(req.user.id)) &&
    booking.trip.createdBy._id.toString() !== req.user.id
  ) {
    return next(
      new AppError('You do not have permission to view this booking', 403)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const createBooking = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.trip) req.body.trip = req.params.tripId;
  if (!req.body.user) req.body.user = req.user.id;

  // 1) Check if the trip exists
  const trip = await Trip.findById(req.body.trip);
  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  // 2) Check if the trip has available spots
  const bookings = await Booking.find({
    trip: trip._id,
    status: { $in: ['confirmed', 'pending'] },
  });

  const totalParticipants = bookings.reduce(
    (acc, booking) => acc + booking.participants,
    0
  );

  if (totalParticipants + req.body.participants > trip.maxGroupSize) {
    return next(new AppError('Not enough spots available for this trip', 400));
  }

  // 3) Calculate price based on number of participants
  const price = trip.price * req.body.participants;

  // 4) Create booking
  const newBooking = await Booking.create({
    ...req.body,
    price,
    status: 'pending',
  });

  // 5) Populate the booking with trip and user data
  await newBooking.populate('trip').populate('user').execPopulate();

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if the user has permission to update this booking
  if (
    req.user.role !== 'admin' &&
    booking.user._id.toString() !== req.user.id &&
    (booking.trip.guides && !booking.trip.guides.includes(req.user.id)) &&
    booking.trip.createdBy._id.toString() !== req.user.id
  ) {
    return next(
      new AppError('You do not have permission to update this booking', 403)
    );
  }

  // Prevent changing certain fields
  const allowedFields = [
    'status',
    'participants',
    'specialRequests',
    'paymentStatus',
    'paymentId',
    'paymentMethod',
    'cancellationReason',
  ];

  const updatedFields = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      updatedFields[key] = req.body[key];
    }
  });

  // If updating status to 'cancelled', set cancelledAt
  if (updatedFields.status === 'cancelled' && !booking.cancelledAt) {
    updatedFields.cancelledAt = Date.now();
  }

  // If updating paymentStatus to 'paid', set paidAt
  if (updatedFields.paymentStatus === 'paid' && !booking.paidAt) {
    updatedFields.paidAt = Date.now();
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('trip')
    .populate('user');

  res.status(200).json({
    status: 'success',
    data: {
      booking: updatedBooking,
    },
  });
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if the user has permission to delete this booking
  if (
    req.user.role !== 'admin' &&
    booking.user._id.toString() !== req.user.id &&
    (booking.trip.guides && !booking.trip.guides.includes(req.user.id)) &&
    booking.trip.createdBy._id.toString() !== req.user.id
  ) {
    return next(
      new AppError('You do not have permission to delete this booking', 403)
    );
  }

  // Soft delete by setting isActive to false
  booking.isActive = false;
  await booking.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  // Get bookings for the logged-in user
  const bookings = await Booking.find({ user: req.user.id })
    .populate({
      path: 'trip',
      select: 'name imageCover startLocation price duration',
    })
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

export const getBookingsOnMyTrips = catchAsync(async (req, res, next) => {
  // Get trips created by the logged-in user (for guides/agencies)
  const trips = await Trip.find({
    $or: [
      { createdBy: req.user.id },
      { guides: { $in: [req.user.id] } },
    ],
  }).select('_id');

  const tripIds = trips.map((trip) => trip._id);

  const bookings = await Booking.find({ trip: { $in: tripIds } })
    .populate({
      path: 'trip',
      select: 'name imageCover startLocation',
    })
    .populate({
      path: 'user',
      select: 'name email photo',
    })
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

export const updateBookingStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (!status || !allowedStatuses.includes(status)) {
    return next(
      new AppError(
        `Please provide a valid status: ${allowedStatuses.join(', ')}`,
        400
      )
    );
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if the user has permission to update this booking status
  if (
    req.user.role !== 'admin' &&
    booking.trip.createdBy._id.toString() !== req.user.id &&
    !booking.trip.guides.some(
      (guide) => guide._id.toString() === req.user.id
    )
  ) {
    return next(
      new AppError(
        'You do not have permission to update the status of this booking',
        403
      )
    );
  }

  booking.status = status;
  
  // If cancelling, set cancellation reason if provided
  if (status === 'cancelled' && req.body.cancellationReason) {
    booking.cancellationReason = req.body.cancellationReason;
    booking.cancelledAt = Date.now();
  }

  await booking.save();

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const processPayment = catchAsync(async (req, res, next) => {
  const { paymentMethodId, paymentAmount } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if the booking belongs to the user making the request
  if (booking.user._id.toString() !== req.user.id) {
    return next(
      new AppError('You do not have permission to pay for this booking', 403)
    );
  }

  // Check if the booking is already paid
  if (booking.paymentStatus === 'paid') {
    return next(new AppError('This booking has already been paid for', 400));
  }

  // In a real application, you would integrate with a payment processor here
  // For example: Stripe, PayPal, etc.
  // This is a simplified example
  try {
    // Simulate payment processing
    // In a real app, this would be an API call to your payment processor
    const paymentSuccessful = true; // Replace with actual payment processing logic

    if (paymentSuccessful) {
      // Update booking with payment details
      booking.paymentStatus = 'paid';
      booking.paymentId = paymentMethodId; // This would be a payment intent ID or similar
      booking.paymentMethod = 'card'; // Or get this from the payment method
      booking.paidAt = Date.now();
      booking.status = 'confirmed'; // Update status to confirmed after successful payment

      await booking.save();

      // In a real app, you might want to send a confirmation email here

      res.status(200).json({
        status: 'success',
        data: {
          booking,
        },
      });
    } else {
      // Handle failed payment
      booking.paymentStatus = 'failed';
      await booking.save();

      return next(
        new AppError('Payment failed. Please try again with a different payment method.', 400)
      );
    }
  } catch (err) {
    // Handle payment processing errors
    booking.paymentStatus = 'failed';
    await booking.save();

    return next(
      new AppError(
        'There was an error processing your payment. Please try again.',
        500
      )
    );
  }
});
