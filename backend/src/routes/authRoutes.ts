import express from 'express';
import {
  register,
  login,
  me,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/securityMiddleware';

const router = express.Router();

// Public routes (rate-limited to prevent abuse)
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.post('/refresh', refreshToken);

// Protected routes
router.use(protect);

router.post('/logout', logout);
router.get('/me', me);

export default router;
