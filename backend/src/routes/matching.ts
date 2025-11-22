/**
 * Matching API Routes
 * Handles requests for event matching and recommendations
 */

import { Router, Request, Response } from 'express';
import { getMatchesForUser } from '../services/matching/matchEngine';
import { mockUsers, mockEvents } from '../services/matching/mockData';

const router = Router();

/**
 * GET /matching/suggest
 * Get event suggestions for a user based on matching algorithm
 * 
 * Query params:
 * - userId: string (required) - ID of the user to get matches for
 * - limit: number (optional) - Maximum number of results to return (default: 10)
 */
router.get('/suggest', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const limit = req.query.limit 
      ? parseInt(req.query.limit as string, 10) 
      : 10;

    if (!userId) {
      return res.status(400).json({
        error: 'Missing required parameter: userId',
      });
    }

    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({
        error: 'Invalid limit parameter. Must be a positive number.',
      });
    }

    // Get matches using the matching engine
    const matches = getMatchesForUser(userId, mockUsers, mockEvents);

    // Apply limit
    const limitedMatches = matches.slice(0, limit);

    // Format response
    res.json({
      userId,
      matches: limitedMatches,
      totalMatches: matches.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
});

/**
 * GET /matching/suggest/:userId
 * Alternative endpoint using path parameter
 */
router.get('/suggest/:userId', (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const limit = req.query.limit 
      ? parseInt(req.query.limit as string, 10) 
      : 10;

    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({
        error: 'Invalid limit parameter. Must be a positive number.',
      });
    }

    // Get matches using the matching engine
    const matches = getMatchesForUser(userId, mockUsers, mockEvents);

    // Apply limit
    const limitedMatches = matches.slice(0, limit);

    // Format response
    res.json({
      userId,
      matches: limitedMatches,
      totalMatches: matches.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
});

export default router;

