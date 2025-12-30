import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import tripRoutes from './trip.routes.js';
import bookingRoutes from './booking.routes.js';
import reviewRoutes from './review.routes.js';

const router = express.Router();

/**
 * API Routes
 * All API routes are prefixed with /api/v1
 */

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'BeyondBeaches API is running',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (no authentication required)
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Trip routes
router.use('/trips', tripRoutes);

// Booking routes
router.use('/bookings', bookingRoutes);

// Review routes
router.use('/reviews', reviewRoutes);

// 404 handler for API routes
router.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default router;
