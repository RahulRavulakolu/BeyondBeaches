import { promisify } from 'util';
import Trip from '../models/Trip.model.js';
import Booking from '../models/Booking.model.js';
import Review from '../models/Review.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';

export const aliasTopTrips = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTrips = catchAsync(async (req, res, next) => {
  // Execute query
  const features = new APIFeatures(Trip.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const trips = await features.query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: trips.length,
    data: {
      trips,
    },
  });
});

export const getTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id).populate('reviews');

  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      trip,
    },
  });
});

export const createTrip = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.guides) req.body.guides = [req.user.id];
  if (!req.body.createdBy) req.body.createdBy = req.user.id;
  if (req.user?.role === 'agency' && !req.body.agency) req.body.agency = req.user.id;

  const newTrip = await Trip.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      trip: newTrip,
    },
  });
});

export const enforceTripOwnership = catchAsync(async (req, res, next) => {
  // Admins can manage everything
  if (req.user?.role === 'admin') return next();

  // Only enforce ownership for agencies
  if (req.user?.role !== 'agency') return next();

  const trip = await Trip.findById(req.params.id).select('agency createdBy');

  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  const ownerId = trip.agency || trip.createdBy;
  if (!ownerId || ownerId.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to perform this action', 403));
  }

  return next();
});

export const updateTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      trip,
    },
  });
});

export const deleteTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);

  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getTripStats = catchAsync(async (req, res, next) => {
  const stats = await Trip.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTrips: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

export const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Trip.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTripStarts: { $sum: 1 },
        trips: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTripStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

// /trips-within/233/center/34.111745,-118.113491/unit/mi
// /trips-within?distance=233&center=-40,45&unit=mi
// /trips-within/233/-40,45/mi
export const getTripsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400
      )
    );
  }

  const trips = await Trip.find({
    startLocation: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    status: 'success',
    results: trips.length,
    data: {
      data: trips,
    },
  });
});

export const getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Trip.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});

export const bookTrip = catchAsync(async (req, res, next) => {
  // 1) Get trip and check if it exists
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    return next(new AppError('No trip found with that ID', 404));
  }

  // 2) Check if the trip has available spots
  const bookings = await Booking.find({ trip: trip._id, status: 'confirmed' });
  const totalParticipants = bookings.reduce(
    (acc, booking) => acc + booking.participants,
    0
  );

  if (totalParticipants + req.body.participants > trip.maxGroupSize) {
    return next(new AppError('Not enough spots available for this trip', 400));
  }

  // 3) Create booking
  const booking = await Booking.create({
    trip: trip._id,
    user: req.user.id,
    price: trip.price,
    startDate: req.body.startDate,
    participants: req.body.participants,
    specialRequests: req.body.specialRequests,
  });

  // 4) Populate the booking with trip and user data
  await booking.populate('trip').populate('user').execPopulate();

  // 5) Send response
  res.status(201).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const getTripReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ trip: req.params.id });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const createTripReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.trip) req.body.trip = req.params.tripId;
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
