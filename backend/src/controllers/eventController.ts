/**
 * Event Controller
 * Handles HTTP requests for event operations
 */

import { Request, Response } from 'express';
import { EventService } from '../services/eventService';

// Create a singleton instance to maintain service state
const eventService = new EventService();

export class EventController {
  // GET /api/events
  getAllEvents = (req: Request, res: Response) => {
    try {
      const { search, organizer, organization, public: isPublic } = req.query;

      let events = eventService.getAllEvents();

      if (search && typeof search === 'string') {
        events = eventService.searchEvents(search);
      }

      if (organizer && typeof organizer === 'string') {
        events = events.filter(event => event.organizerId === organizer);
      }

      if (organization && typeof organization === 'string') {
        events = events.filter(event => event.organizationId === organization);
      }

      if (isPublic === 'true') {
        events = eventService.getPublicEvents();
      }

      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  };

  // GET /api/events/:id
  getEventById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = eventService.getEventById(id);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  };

  // POST /api/events
  createEvent = (req: Request, res: Response) => {
    try {
      const eventData = req.body;
      const newEvent = eventService.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  };

  // PUT /api/events/:id
  updateEvent = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedEvent = eventService.updateEvent(id, updates);

      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event' });
    }
  };

  // DELETE /api/events/:id
  deleteEvent = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = eventService.deleteEvent(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  };

  // POST /api/events/:id/apply
  applyToEvent = (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const { userId, notes } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const application = eventService.applyToEvent(userId, eventId, notes);
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to apply to event' });
    }
  };

  // GET /api/events/:id/applications
  getEventApplications = (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const applications = eventService.getEventApplications(eventId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  };

  // GET /api/users/:userId/applications
  getUserApplications = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const applications = eventService.getUserApplications(userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  };

  // PUT /api/applications/:id/status
  updateApplicationStatus = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'status is required' });
      }

      const application = eventService.updateApplicationStatus(id, status, notes);

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update application status' });
    }
  };

  // POST /api/events/:id/checkin
  checkIn = (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const attendance = eventService.checkInToEvent(userId, eventId);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check in' });
    }
  };

  // POST /api/events/:id/checkout
  checkOut = (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const { userId, hoursVolunteered } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const attendance = eventService.checkOutFromEvent(userId, eventId, hoursVolunteered);

      if (!attendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check out' });
    }
  };

  // GET /api/events/:id/attendance
  getEventAttendance = (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const attendance = eventService.getEventAttendance(eventId);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  };

  // GET /api/users/:userId/attendance
  getUserAttendance = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const attendance = eventService.getUserAttendance(userId);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  };

  // POST /api/attendance/:id/verify
  verifyAttendance = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const attendance = eventService.verifyAttendance(id);

      if (!attendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify attendance' });
    }
  };
}

