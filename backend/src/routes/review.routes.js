import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} from '../controllers/review.controller.js';
import { protect, restrictTo } from '../controllers/auth.controller.js';

const router = express.Router({ mergeParams: true });

// Protect all routes after this middleware
router.use(protect);

// Routes for users to manage their own reviews
router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

export default router;
