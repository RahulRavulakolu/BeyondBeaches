import express from 'express';
import {
  aliasTopTrips,
  getAllTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  enforceTripOwnership,
  getTripStats,
  getMonthlyPlan,
  getTripsWithin,
  getDistances,
  bookTrip,
  getTripReviews,
  createTripReview,
} from '../controllers/trip.controller.js';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import reviewRouter from './review.routes.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:tripId/reviews', reviewRouter);

// Special routes
router.route('/top-5-cheap').get(aliasTopTrips, getAllTrips);
router.route('/trip-stats').get(getTripStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'guide'), getMonthlyPlan);

// Geospatial routes
router
  .route('/trips-within/:distance/center/:latlng/unit/:unit')
  .get(getTripsWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

// Trip booking routes
router
  .route('/:tripId/bookings')
  .post(protect, restrictTo('user'), bookTrip);

// Trip review routes
router
  .route('/:tripId/reviews')
  .get(getTripReviews)
  .post(protect, restrictTo('user'), createTripReview);

// Regular CRUD routes
router
  .route('/')
  .get(getAllTrips)
  .post(protect, restrictTo('admin', 'guide', 'agency'), createTrip);

router
  .route('/:id')
  .get(getTrip)
  .patch(protect, restrictTo('admin', 'guide', 'agency'), enforceTripOwnership, updateTrip)
  .delete(protect, restrictTo('admin', 'guide', 'agency'), enforceTripOwnership, deleteTrip);

export default router;
