import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  getGuides,
  getAgencies,
  uploadUserPhoto,
} from '../controllers/user.controller.js';
import {
  protect,
  restrictTo,
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protected routes (require authentication)
router.use(protect);

// User profile routes
router.get('/me', getMe, getUser);
router.patch('/update-me', updateMe);
router.patch('/update-password', updatePassword);
router.delete('/delete-me', deleteMe);
router.patch('/upload-photo', uploadUserPhoto);

// Guide and agency routes
router.get('/guides', getGuides);
router.get('/agencies', getAgencies);

// Admin-only routes
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
