/**
 * Gamification User Routes
 * Defines user-specific gamification API endpoints
 */

import { Router } from 'express';
import { GamificationController } from '../controllers/gamificationController';

const router = Router();
const gamificationController = new GamificationController();

router.get('/:userId/stats', gamificationController.getUserStats);
router.get('/:userId/badges', gamificationController.getUserBadges);
router.get('/:userId/achievements', gamificationController.getUserAchievements);

export default router;

