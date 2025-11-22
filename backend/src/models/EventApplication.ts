/**
 * Event Application Model
 * Represents a user's application to attend an event
 */

export interface EventApplication {
  id: string;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt?: Date;
  notes?: string;
  
  // Relationships
  userId: string;
  user?: any; // User type
  eventId: string;
  event?: any; // Event type
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

