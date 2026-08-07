import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User, { IUser } from '../models/User';
import { config } from '../config/env';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';
import { sendPasswordResetEmail } from '../utils/email';

const signAccessToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiresIn,
  } as jwt.SignOptions);
};

const signRefreshToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  } as jwt.SignOptions);
};

const toSafeUser = (user: IUser) => {
  const obj = user.toObject();
  delete (obj as any).password;
  return obj;
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Please provide name, email and password', 400));
    }
    if (password.length < 8) {
      return next(new AppError('Password must be at least 8 characters long', 400));
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return next(new AppError('An account with this email already exists', 409));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: role || 'community_member',
    });

    const accessToken = signAccessToken(user._id.toString());

    res.status(201).json({
      success: true,
      data: {
        user: toSafeUser(user),
        accessToken,
        refreshToken: signRefreshToken(user._id.toString()),
      },
    });
  } catch (error) {
    logger.error(`Register error: ${error}`);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated. Contact support.', 403));
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const accessToken = signAccessToken(user._id.toString());

    res.status(200).json({
      success: true,
      data: {
        user: toSafeUser(user),
        accessToken,
        refreshToken: signRefreshToken(user._id.toString()),
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return next(new AppError('Please provide a refresh token', 400));
    }

    const decoded = jwt.verify(token, config.jwtRefreshSecret) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    res.status(200).json({
      success: true,
      data: {
        user: toSafeUser(user),
        accessToken: signAccessToken(user._id.toString()),
      },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid refresh token. Please log in again.', 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Your session has expired. Please log in again.', 401));
    }
    logger.error(`Refresh token error: ${error}`);
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/v1/auth/me
export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new AppError('You are not logged in', 401));
    }
    res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  } catch (error) {
    logger.error(`Me error: ${error}`);
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
export const logout = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Forgot password (send reset link)
// @route   POST /api/v1/auth/forgot-password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError('Please provide your email address', 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Always respond success to avoid user enumeration
      return res.status(200).json({
        success: true,
        message: 'If an account exists for that email, a reset link has been sent.',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    res.status(200).json({
      success: true,
      message: 'If an account exists for that email, a reset link has been sent.',
    });
  } catch (error) {
    logger.error(`Forgot password error: ${error}`);
    next(error);
  }
};

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return next(new AppError('Please provide a token and new password', 400));
    }
    if (password.length < 8) {
      return next(new AppError('Password must be at least 8 characters long', 400));
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can now log in.',
    });
  } catch (error) {
    logger.error(`Reset password error: ${error}`);
    next(error);
  }
};
