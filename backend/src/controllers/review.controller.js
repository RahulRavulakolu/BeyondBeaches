import Review from '../models/Review.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  if (req.params.userId) filter = { user: req.params.userId };

  const reviews = await Review.find(filter)
    .populate({
      path: 'user',
      select: 'name photo',
    })
    .populate({
      path: 'tour',
      select: 'name imageCover',
    });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name photo',
    })
    .populate({
      path: 'tour',
      select: 'name imageCover',
    });

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  // Check if the user has already reviewed this tour
  const existingReview = await Review.findOne({
    user: req.user.id,
    tour: req.body.tour,
  });

  if (existingReview) {
    return next(
      new AppError('You have already reviewed this tour', 400)
    );
  }

  const newReview = await Review.create(req.body);

  // Populate the review with user and tour data
  await newReview.populate('user', 'name photo').populate('tour', 'name').execPopulate();

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if the user is the owner of the review or an admin
  if (review.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new AppError('You do not have permission to update this review', 403)
    );
  }

  // Only allow updating the review and rating
  const { review: reviewText, rating } = req.body;
  const updateData = {};
  
  if (reviewText) updateData.review = reviewText;
  if (rating) updateData.rating = rating;

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('user', 'name photo')
    .populate('tour', 'name');

  res.status(200).json({
    status: 'success',
    data: {
      review: updatedReview,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if the user is the owner of the review or an admin
  if (review.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new AppError('You do not have permission to delete this review', 403)
    );
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
