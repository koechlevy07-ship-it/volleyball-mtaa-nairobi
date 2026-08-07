import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { config } from './config/env';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import tournamentRoutes from './routes/tournamentRoutes';
import posterRoutes from './routes/posterRoutes';
import announcementRoutes from './routes/announcementRoutes';
import commentRoutes from './routes/commentRoutes'; // <--- ADD THIS LINE
import { errorHandler } from './middleware/errorMiddleware';
import logger from './utils/logger';

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tournaments', tournamentRoutes);
app.use('/api/v1/posters', posterRoutes);
app.use('/api/v1/announcements', announcementRoutes);
app.use('/api/v1/comments', commentRoutes); // <--- ADD THIS LINE

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(`${err}`);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(`${err}`);
  process.exit(1);
});