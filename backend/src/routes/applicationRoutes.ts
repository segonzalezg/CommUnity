/**
 * Application Routes
 * Defines all application-related API endpoints
 */

import { Router } from 'express';
import { EventController } from '../controllers/eventController';

const router = Router();
const eventController = new EventController();

router.get('/users/:userId/applications', eventController.getUserApplications);
router.put('/:id/status', eventController.updateApplicationStatus);

export default router;

