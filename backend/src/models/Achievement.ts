/**
 * Achievement Model
 * Represents an achievement in the gamification system
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  pointsReward: number;
  category: AchievementCategory;
  createdAt: Date;
  
  // Relationships
  userId: string;
  user?: any; // User type
  earnedAt: Date;
}

export enum AchievementCategory {
  FIRST_EVENT = 'FIRST_EVENT',
  VOLUNTEER_HOURS = 'VOLUNTEER_HOURS',
  STREAK = 'STREAK',
  ORGANIZER = 'ORGANIZER',
  COMMUNITY_BUILDER = 'COMMUNITY_BUILDER',
}

