/**
 * CommUnity Backend Server
 * Main entry point for the Express API server
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import matchingRoutes from './routes/matching';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CommUnity Backend API',
  });
});

// API Routes
app.use('/matching', matchingRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'CommUnity Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      matching: '/matching/suggest?userId=<userId>',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CommUnity Backend Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Matching API: http://localhost:${PORT}/matching/suggest?userId=user1`);
});

