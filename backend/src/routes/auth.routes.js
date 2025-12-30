import express from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  verifyEmail,
  resendVerificationEmail,
} from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

// Protected routes (authentication required)
router.use(protect);

router.post('/logout', logout);
router.patch('/update-password', updatePassword);

export default router;
