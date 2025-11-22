/**
 * Event Service
 * Business logic for event management
 */

import { Event, EventStatus } from '../../../src/models/Event';
import { events, generateId } from '../data/dataStore';
import { EventApplication, ApplicationStatus } from '../models/EventApplication';
import { Attendance, AttendanceStatus } from '../models/Attendance';
import { eventApplications, attendances } from '../data/dataStore';
import { GamificationService } from './gamificationService';

export class EventService {
  private gamificationService: GamificationService;

  constructor() {
    this.gamificationService = new GamificationService();
  }
  // Get all events
  getAllEvents(): Event[] {
    return events;
  }

  // Get event by ID
  getEventById(id: string): Event | undefined {
    return events.find(event => event.id === id);
  }

  // Get events by organizer
  getEventsByOrganizer(organizerId: string): Event[] {
    return events.filter(event => event.organizerId === organizerId);
  }

  // Get events by organization
  getEventsByOrganization(organizationId: string): Event[] {
    return events.filter(event => event.organizationId === organizationId);
  }

  // Get public events
  getPublicEvents(): Event[] {
    return events.filter(event => event.isPublic && event.status === EventStatus.PUBLISHED);
  }

  // Create new event
  createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event {
    const newEvent: Event = {
      ...eventData,
      id: generateId('event'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    events.push(newEvent);
    return newEvent;
  }

  // Update event
  updateEvent(id: string, updates: Partial<Event>): Event | null {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return null;

    events[eventIndex] = {
      ...events[eventIndex],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };
    return events[eventIndex];
  }

  // Delete event
  deleteEvent(id: string): boolean {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return false;
    events.splice(eventIndex, 1);
    return true;
  }

  // Search events
  searchEvents(query: string): Event[] {
    const lowerQuery = query.toLowerCase();
    return events.filter(
      event =>
        event.title.toLowerCase().includes(lowerQuery) ||
        (event.description && event.description.toLowerCase().includes(lowerQuery)) ||
        (event.location && event.location.toLowerCase().includes(lowerQuery))
    );
  }

  // Apply to event
  applyToEvent(userId: string, eventId: string, notes?: string): EventApplication {
    const application: EventApplication = {
      id: generateId('app'),
      status: ApplicationStatus.PENDING,
      appliedAt: new Date(),
      userId,
      eventId,
      notes,
    };
    eventApplications.push(application);
    return application;
  }

  // Get applications for event
  getEventApplications(eventId: string): EventApplication[] {
    return eventApplications.filter(app => app.eventId === eventId);
  }

  // Get user applications
  getUserApplications(userId: string): EventApplication[] {
    return eventApplications.filter(app => app.userId === userId);
  }

  // Update application status
  updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus,
    notes?: string
  ): EventApplication | null {
    const appIndex = eventApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return null;

    eventApplications[appIndex] = {
      ...eventApplications[appIndex],
      status,
      reviewedAt: new Date(),
      notes: notes || eventApplications[appIndex].notes,
    };
    return eventApplications[appIndex];
  }

  // Check in to event
  checkInToEvent(userId: string, eventId: string): Attendance {
    let attendance = attendances.find(
      att => att.userId === userId && att.eventId === eventId
    );

    if (!attendance) {
      attendance = {
        id: generateId('att'),
        status: AttendanceStatus.CHECKED_IN,
        checkedInAt: new Date(),
        verified: false,
        createdAt: new Date(),
        userId,
        eventId,
      };
      attendances.push(attendance);
    } else {
      attendance.status = AttendanceStatus.CHECKED_IN;
      attendance.checkedInAt = new Date();
    }

    return attendance;
  }

  // Check out from event
  checkOutFromEvent(userId: string, eventId: string, hoursVolunteered?: number): Attendance | null {
    const attendance = attendances.find(
      att => att.userId === userId && att.eventId === eventId
    );

    if (!attendance) return null;

    attendance.status = AttendanceStatus.CHECKED_OUT;
    attendance.checkedOutAt = new Date();
    if (hoursVolunteered) {
      attendance.hoursVolunteered = hoursVolunteered;
    }

    // Integrate with gamification service
    this.gamificationService.processAttendance(userId, eventId, hoursVolunteered);

    return attendance;
  }

  // Get event attendance
  getEventAttendance(eventId: string): Attendance[] {
    return attendances.filter(att => att.eventId === eventId);
  }

  // Get user attendance
  getUserAttendance(userId: string): Attendance[] {
    return attendances.filter(att => att.userId === userId);
  }

  // Verify attendance
  verifyAttendance(attendanceId: string): Attendance | null {
    const attendance = attendances.find(att => att.id === attendanceId);
    if (!attendance) return null;

    attendance.verified = true;
    attendance.verifiedAt = new Date();

    // If not already processed, process for gamification
    if (!attendance.checkedOutAt && attendance.hoursVolunteered) {
      this.gamificationService.processAttendance(
        attendance.userId,
        attendance.eventId,
        attendance.hoursVolunteered
      );
    }

    return attendance;
  }
}

