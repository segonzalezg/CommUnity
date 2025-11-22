/**
 * Attendance Model
 * Represents a user's attendance at an event
 */

export interface Attendance {
  id: string;
  status: AttendanceStatus;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  hoursVolunteered?: number;
  verified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  
  // Relationships
  userId: string;
  user?: any; // User type
  eventId: string;
  event?: any; // Event type
}

export enum AttendanceStatus {
  REGISTERED = 'REGISTERED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  NO_SHOW = 'NO_SHOW',
}

