/**
 * Event Routes
 * Defines all event-related API endpoints
 */

import { Router } from 'express';
import { EventController } from '../controllers/eventController';

const router = Router();
const eventController = new EventController();

// Event CRUD
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

// Event applications
router.post('/:id/apply', eventController.applyToEvent);
router.get('/:id/applications', eventController.getEventApplications);

// Event attendance
router.post('/:id/checkin', eventController.checkIn);
router.post('/:id/checkout', eventController.checkOut);
router.get('/:id/attendance', eventController.getEventAttendance);

// Similar events
router.get('/:id/similar', (req, res, next) => {
  // This will be handled by matching controller
  next();
});

export default router;

