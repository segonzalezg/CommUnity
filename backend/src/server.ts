/**
 * Main Server File
 * Express server setup and route configuration
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import organizationRoutes from './routes/organizationRoutes';
import matchingRoutes from './routes/matchingRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import gamificationUserRoutes from './routes/gamificationUserRoutes';
import messagingRoutes from './routes/messagingRoutes';
import applicationRoutes from './routes/applicationRoutes';
import attendanceRoutes from './routes/attendanceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/users', gamificationUserRoutes);
app.use('/api', messagingRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/attendance', attendanceRoutes);

// Similar events route (handled by matching controller)
app.get('/api/events/:id/similar', (req, res, next) => {
  const matchingController = require('./controllers/matchingController').MatchingController;
  const controller = new matchingController();
  controller.getSimilarEvents(req, res, next);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

export default app;

