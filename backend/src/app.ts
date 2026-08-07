import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/authRoutes';
import tournamentRoutes from './routes/tournamentRoutes';
import posterRoutes from './routes/posterRoutes';
import announcementRoutes from './routes/announcementRoutes';
import commentRoutes from './routes/commentRoutes';
import chatRoutes from './routes/chatRoutes';
import { errorHandler, AppError } from './middleware/errorMiddleware';

const app = express();

const allowedOrigins = [
  config.clientUrl,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://volleyball-mtaa-nairobi.vercel.app',
  'https://volleyball-mtaa-nairobi-o9sr.vercel.app',
].filter(Boolean) as string[];

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new AppError('Not allowed by CORS', 403));
    },
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root + health check
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    name: 'Volleyball Mtaa Nairobi API',
    status: 'running',
    version: '1.0.0',
  });
});

app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tournaments', tournamentRoutes);
app.use('/api/v1/posters', posterRoutes);
app.use('/api/v1/announcements', announcementRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/chat', chatRoutes);

// 404 handler
app.use((req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

export default app;
