/**
 * Matching Service
 * Business logic for matching users with events
 */

import { Event } from '../../../src/models/Event';
import { User } from '../../../src/models/User';
import { events, users, organizations } from '../data/dataStore';
import { attendances, eventApplications } from '../data/dataStore';

export interface MatchingCriteria {
  userId: string;
  location?: string;
  interests?: string[];
  maxDistance?: number;
  eventTypes?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  limit?: number;
}

export interface EventMatch {
  event: Event;
  score: number;
  reasons: string[];
}

export class MatchingService {
  // Suggest events for a user
  suggestEvents(criteria: MatchingCriteria): EventMatch[] {
    const user = users.find(u => u.id === criteria.userId);
    if (!user) return [];

    const userAttendedEventIds = new Set(
      attendances.map(att => att.eventId)
    );
    const userAppliedEventIds = new Set(
      eventApplications
        .filter(app => app.userId === criteria.userId && app.status !== 'REJECTED')
        .map(app => app.eventId)
    );

    // Filter out events user already attended or applied to
    let candidateEvents = events.filter(
      event =>
        event.status === 'PUBLISHED' &&
        event.isPublic &&
        !userAttendedEventIds.has(event.id) &&
        !userAppliedEventIds.has(event.id)
    );

    // Apply filters
    if (criteria.location) {
      candidateEvents = candidateEvents.filter(event =>
        event.location?.toLowerCase().includes(criteria.location!.toLowerCase())
      );
    }

    if (criteria.dateRange?.start) {
      candidateEvents = candidateEvents.filter(
        event => event.startDate >= criteria.dateRange!.start!
      );
    }

    if (criteria.dateRange?.end) {
      candidateEvents = candidateEvents.filter(
        event => event.startDate <= criteria.dateRange!.end!
      );
    }

    // Calculate match scores
    const matches: EventMatch[] = candidateEvents.map(event => {
      let score = 50; // Base score
      const reasons: string[] = [];

      // Boost score for upcoming events
      if (event.startDate > new Date()) {
        score += 20;
        reasons.push('Upcoming event');
      }

      // Boost score if user hasn't attended similar events
      const similarEvents = events.filter(
        e => e.organizationId === event.organizationId && e.id !== event.id
      );
      if (similarEvents.length > 0) {
        score += 10;
        reasons.push('From organization you might like');
      }

      // Boost score for events with available spots
      if (event.maxAttendees) {
        const currentAttendees = attendances.filter(
          att => att.eventId === event.id && att.status !== 'NO_SHOW'
        ).length;
        const availability = (event.maxAttendees - currentAttendees) / event.maxAttendees;
        if (availability > 0.5) {
          score += 15;
          reasons.push('Plenty of spots available');
        }
      }

      // Boost score for verified organizations
      if (event.organizationId) {
        const org = organizations.find(o => o.id === event.organizationId);
        if (org?.isVerified) {
          score += 10;
          reasons.push('Verified organization');
        }
      }

      return {
        event,
        score: Math.min(100, score), // Cap at 100
        reasons,
      };
    });

    // Sort by score (highest first)
    matches.sort((a, b) => b.score - a.score);

    // Apply limit
    const limit = criteria.limit || 10;
    return matches.slice(0, limit);
  }

  // Get similar events to a given event
  getSimilarEvents(eventId: string, limit: number = 5): Event[] {
    const event = events.find(e => e.id === eventId);
    if (!event) return [];

    return events
      .filter(
        e =>
          e.id !== eventId &&
          e.status === 'PUBLISHED' &&
          (e.organizationId === event.organizationId ||
            e.location === event.location ||
            (e.description &&
              event.description &&
              this.calculateSimilarity(e.description, event.description) > 0.3))
      )
      .slice(0, limit);
  }

  private calculateSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    const intersection = new Set(Array.from(words1).filter(x => words2.has(x)));
    const union = new Set([...Array.from(words1), ...Array.from(words2)]);
    return intersection.size / union.size;
  }
}

