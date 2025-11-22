/**
 * Matching Controller
 * Handles HTTP requests for matching operations
 */

import { Request, Response } from 'express';
import { MatchingService } from '../services/matchingService';

const matchingService = new MatchingService();

export class MatchingController {
  // POST /api/matching/suggest
  suggestEvents = (req: Request, res: Response) => {
    try {
      const criteria = req.body;

      if (!criteria.userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Convert date strings to Date objects if provided
      if (criteria.dateRange) {
        if (criteria.dateRange.start) {
          criteria.dateRange.start = new Date(criteria.dateRange.start);
        }
        if (criteria.dateRange.end) {
          criteria.dateRange.end = new Date(criteria.dateRange.end);
        }
      }

      const matches = matchingService.suggestEvents(criteria);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed to suggest events' });
    }
  };

  // GET /api/events/:id/similar
  getSimilarEvents = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit as string, 10) : 5;

      const similarEvents = matchingService.getSimilarEvents(id, limitNum);
      res.json(similarEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch similar events' });
    }
  };
}

