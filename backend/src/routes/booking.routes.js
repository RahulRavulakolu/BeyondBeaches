import express from 'express';
import {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getMyBookings,
  getBookingsOnMyTrips,
  updateBookingStatus,
  processPayment,
} from '../controllers/booking.controller.js';
import { protect, restrictTo } from '../controllers/auth.controller.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes for users to manage their own bookings
router.get('/my-bookings', getMyBookings);
router.post('/:id/process-payment', processPayment);

// Routes for guides/agencies to manage bookings on their trips
router.get('/my-trips', getBookingsOnMyTrips);
router.patch('/:id/status', updateBookingStatus);

// Admin and guide routes
router.use(restrictTo('admin', 'guide'));

router
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

// Nested routes
// GET /trips/:tripId/bookings - Get all bookings for a specific trip
router.get('/trips/:tripId', getAllBookings);

// GET /users/:userId/bookings - Get all bookings for a specific user (admin only)
router.get('/users/:userId', restrictTo('admin'), getAllBookings);

export default router;
