/**
 * Event Model
 * Represents an event in the CommUnity platform
 */

export interface Event {
  id: string;
  title: string;
  description?: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  locationUrl?: string;
  coverImageUrl?: string;
  isPublic: boolean;
  isOnline: boolean;
  maxAttendees?: number;
  registrationRequired: boolean;
  registrationDeadline?: Date;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  organizerId: string;
  organizer?: User;
  organizationId?: string;
  organization?: Organization;
  attendees?: User[];
  messages?: Message[];
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

