/**
 * Matching Engine Service
 * 
 * Implements a scoring system to match users with volunteer events based on:
 * - Skill Match (50%)
 * - Availability Match (20%)
 * - Distance Score (20%)
 * - Cause Affinity (10%)
 */

// Type Definitions
export interface User {
  id: string;
  name: string;
  skills: string[];
  availability: AvailabilityWindow[];
  location: Location;
  causePreferences: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  eventDate: Date;
  duration: number; // in hours
  location: Location;
  cause: string;
  organizationId: string;
  organizationName: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface AvailabilityWindow {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // "HH:MM" format
  endTime: string; // "HH:MM" format
}

export interface MatchResult {
  event: Event;
  matchScore: number;
  breakdown: {
    skillMatch: number;
    availabilityMatch: number;
    distanceScore: number;
    causeAffinity: number;
  };
}

// Scoring Weights
const WEIGHTS = {
  SKILL_MATCH: 0.5,
  AVAILABILITY_MATCH: 0.2,
  DISTANCE_SCORE: 0.2,
  CAUSE_AFFINITY: 0.1,
};

/**
 * Compute skill match score (0-1)
 * Based on the percentage of required skills that the user has
 */
export function computeSkillMatch(user: User, event: Event): number {
  if (event.requiredSkills.length === 0) {
    return 1.0; // If no skills required, perfect match
  }

  const userSkillsSet = new Set(user.skills.map(s => s.toLowerCase()));
  const matchingSkills = event.requiredSkills.filter(skill =>
    userSkillsSet.has(skill.toLowerCase())
  );

  return matchingSkills.length / event.requiredSkills.length;
}

/**
 * Compute availability match score (0-1)
 * Checks if the event date/time falls within user's availability windows
 */
export function computeAvailabilityMatch(user: User, event: Event): number {
  const eventDate = new Date(event.eventDate);
  const dayOfWeek = eventDate.getDay();
  
  // Find matching availability window for the event's day
  const matchingWindow = user.availability.find(
    window => window.dayOfWeek === dayOfWeek
  );

  if (!matchingWindow) {
    return 0; // No availability on this day
  }

  // Parse event time (assuming eventDate includes time)
  const eventHour = eventDate.getHours();
  const eventMinute = eventDate.getMinutes();
  const eventTimeMinutes = eventHour * 60 + eventMinute;

  // Parse availability window
  const [startHour, startMinute] = matchingWindow.startTime.split(':').map(Number);
  const [endHour, endMinute] = matchingWindow.endTime.split(':').map(Number);
  const startTimeMinutes = startHour * 60 + startMinute;
  const endTimeMinutes = endHour * 60 + endMinute;

  // Check if event time falls within availability window
  const eventEndTimeMinutes = eventTimeMinutes + (event.duration * 60);
  
  if (eventTimeMinutes >= startTimeMinutes && eventEndTimeMinutes <= endTimeMinutes) {
    return 1.0; // Perfect match - event fits completely within availability
  } else if (eventTimeMinutes >= startTimeMinutes && eventTimeMinutes < endTimeMinutes) {
    // Partial match - event starts within window but extends beyond
    const overlapMinutes = endTimeMinutes - eventTimeMinutes;
    const overlapRatio = Math.min(overlapMinutes / (event.duration * 60), 1.0);
    return overlapRatio * 0.7; // Partial credit for overlap
  } else {
    return 0; // No overlap
  }
}

/**
 * Compute distance score (0-1)
 * Based on the distance between user and event location
 * Uses Haversine formula for great-circle distance
 */
export function computeDistanceScore(user: User, event: Event): number {
  const distance = calculateDistance(user.location, event.location);
  
  // Distance scoring: closer = higher score
  // Maximum distance for full score: 5km
  // Score decreases linearly to 0 at 50km
  const maxDistanceForFullScore = 5; // km
  const maxDistance = 50; // km
  
  if (distance <= maxDistanceForFullScore) {
    return 1.0;
  } else if (distance >= maxDistance) {
    return 0;
  } else {
    // Linear interpolation between maxDistanceForFullScore and maxDistance
    return 1.0 - ((distance - maxDistanceForFullScore) / (maxDistance - maxDistanceForFullScore));
  }
}

/**
 * Calculate distance between two locations using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(loc2.latitude - loc1.latitude);
  const dLon = toRadians(loc2.longitude - loc1.longitude);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(loc1.latitude)) *
      Math.cos(toRadians(loc2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Compute cause affinity score (0-1)
 * Based on how well the event's cause matches user's preferences
 */
export function computeCauseAffinity(user: User, event: Event): number {
  if (user.causePreferences.length === 0) {
    return 0.5; // Neutral score if user has no preferences
  }

  const userCausesSet = new Set(
    user.causePreferences.map(c => c.toLowerCase())
  );
  
  const eventCause = event.cause.toLowerCase();
  
  if (userCausesSet.has(eventCause)) {
    return 1.0; // Perfect match
  }
  
  // Partial match based on keyword similarity
  // Check if any user preference contains the event cause or vice versa
  for (const userCause of user.causePreferences) {
    if (userCause.toLowerCase().includes(eventCause) || 
        eventCause.includes(userCause.toLowerCase())) {
      return 0.7; // Partial match
    }
  }
  
  return 0; // No match
}

/**
 * Calculate overall match score
 * Combines all scoring components with their respective weights
 */
export function calculateMatchScore(user: User, event: Event): MatchResult {
  const skillMatch = computeSkillMatch(user, event);
  const availabilityMatch = computeAvailabilityMatch(user, event);
  const distanceScore = computeDistanceScore(user, event);
  const causeAffinity = computeCauseAffinity(user, event);

  const matchScore =
    skillMatch * WEIGHTS.SKILL_MATCH +
    availabilityMatch * WEIGHTS.AVAILABILITY_MATCH +
    distanceScore * WEIGHTS.DISTANCE_SCORE +
    causeAffinity * WEIGHTS.CAUSE_AFFINITY;

  return {
    event,
    matchScore,
    breakdown: {
      skillMatch,
      availabilityMatch,
      distanceScore,
      causeAffinity,
    },
  };
}

/**
 * Get ranked event matches for a user
 * Returns events sorted by match score (highest first)
 */
export function getMatchesForUser(
  userId: string,
  users: User[],
  events: Event[]
): MatchResult[] {
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  // Calculate match scores for all events
  const matches = events.map(event => calculateMatchScore(user, event));

  // Sort by match score (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

