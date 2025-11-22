/**
 * Gamification Controller
 * Handles HTTP requests for gamification operations
 */

import { Request, Response } from 'express';
import { GamificationService } from '../services/gamificationService';

const gamificationService = new GamificationService();

export class GamificationController {
  // GET /api/users/:userId/stats
  getUserStats = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const stats = gamificationService.getUserStats(userId);

      if (!stats) {
        return res.status(404).json({ error: 'Stats not found for user' });
      }

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  };

  // GET /api/users/:userId/badges
  getUserBadges = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const badges = gamificationService.getUserBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch badges' });
    }
  };

  // GET /api/users/:userId/achievements
  getUserAchievements = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const achievements = gamificationService.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  };

  // POST /api/gamification/award-points
  awardPoints = (req: Request, res: Response) => {
    try {
      const { userId, points, reason } = req.body;

      if (!userId || !points) {
        return res.status(400).json({ error: 'userId and points are required' });
      }

      const stats = gamificationService.awardPoints(userId, points, reason);

      if (!stats) {
        return res.status(404).json({ error: 'Failed to award points' });
      }

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to award points' });
    }
  };

  // POST /api/gamification/award-badge
  awardBadge = (req: Request, res: Response) => {
    try {
      const { userId, name, description, category, rarity, iconUrl } = req.body;

      if (!userId || !name || !description || !category) {
        return res.status(400).json({ error: 'userId, name, description, and category are required' });
      }

      const badge = gamificationService.awardBadge(
        userId,
        name,
        description,
        category,
        rarity,
        iconUrl
      );

      res.status(201).json(badge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to award badge' });
    }
  };

  // POST /api/gamification/award-achievement
  awardAchievement = (req: Request, res: Response) => {
    try {
      const { userId, name, description, category, pointsReward, iconUrl } = req.body;

      if (!userId || !name || !description || !category || !pointsReward) {
        return res.status(400).json({
          error: 'userId, name, description, category, and pointsReward are required',
        });
      }

      const achievement = gamificationService.awardAchievement(
        userId,
        name,
        description,
        category,
        pointsReward,
        iconUrl
      );

      res.status(201).json(achievement);
    } catch (error) {
      res.status(500).json({ error: 'Failed to award achievement' });
    }
  };

  // GET /api/gamification/leaderboard
  getLeaderboard = (req: Request, res: Response) => {
    try {
      const { limit, category } = req.query;
      const limitNum = limit ? parseInt(limit as string, 10) : 10;

      let leaderboard;
      if (category && typeof category === 'string') {
        leaderboard = gamificationService.getLeaderboardByCategory(
          category as 'points' | 'events' | 'hours' | 'streak',
          limitNum
        );
      } else {
        leaderboard = gamificationService.getLeaderboard(limitNum);
      }

      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  };
}

