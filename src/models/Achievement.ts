/**
 * Achievement Model
 * Represents an achievement that can be unlocked by users
 */

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  points: number;
  category: AchievementCategory;
  requirements?: string; // JSON string or description of requirements
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  unlockedBy?: User[];
}

export enum AchievementCategory {
  EVENTS = 'EVENTS',
  MESSAGING = 'MESSAGING',
  ORGANIZATIONS = 'ORGANIZATIONS',
  SOCIAL = 'SOCIAL',
  MILESTONE = 'MILESTONE',
}

