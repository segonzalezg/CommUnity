/**
 * User Model
 * Represents a user in the CommUnity platform
 */

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  passwordHash: string;
  avatarUrl?: string;
  bio?: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  
  // Relationships
  organizations?: Organization[];
  events?: Event[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
  badges?: Badge[];
  achievements?: Achievement[];
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  ORGANIZER = 'ORGANIZER',
}

