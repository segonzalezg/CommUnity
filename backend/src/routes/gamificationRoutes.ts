/**
 * Gamification Routes
 * Defines all gamification-related API endpoints
 */

import { Router } from 'express';
import { GamificationController } from '../controllers/gamificationController';

const router = Router();
const gamificationController = new GamificationController();

router.get('/leaderboard', gamificationController.getLeaderboard);
router.post('/award-points', gamificationController.awardPoints);
router.post('/award-badge', gamificationController.awardBadge);
router.post('/award-achievement', gamificationController.awardAchievement);

export default router;

