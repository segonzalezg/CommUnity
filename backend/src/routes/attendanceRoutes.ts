/**
 * Attendance Routes
 * Defines all attendance-related API endpoints
 */

import { Router } from 'express';
import { EventController } from '../controllers/eventController';

const router = Router();
const eventController = new EventController();

router.get('/users/:userId/attendance', eventController.getUserAttendance);
router.post('/:id/verify', eventController.verifyAttendance);

export default router;

