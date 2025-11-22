/**
 * Example Integration - Shows how to integrate chat routes into Express app
 * 
 * This is an example file showing how to use the messaging service.
 * Copy the relevant parts into your main Express application file.
 */

import express, { Express } from 'express';
import cors from 'cors';
import chatRoutes from './chatRoutes';

/**
 * Example Express app setup with chat routes
 */
export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'CommUnity Backend' });
  });

  // Mount chat routes
  app.use('/api/chat', chatRoutes);

  // Error handling middleware (basic example)
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

/**
 * Example server startup
 */
/*
const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Chat API available at http://localhost:${PORT}/api/chat`);
});
*/

