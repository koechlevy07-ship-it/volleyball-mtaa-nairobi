import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config/env';
import { AppError } from './errorMiddleware';

export interface JwtPayload {
  id: string;
  role: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Get token from cookies (if using cookies later)
    // if (req.cookies?.token) { token = req.cookies.token; }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtAccessSecret) as JwtPayload;

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('This account has been deactivated.', 401));
    }

    // Grant access
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Your token has expired. Please log in again.', 401));
    }
    next(new AppError('Authentication failed.', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('You are not logged in.', 401));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`You do not have permission to perform this action. Role: ${req.user.role}`, 403));
    }
    next();
  };
};