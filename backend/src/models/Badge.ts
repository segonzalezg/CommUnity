/**
 * Badge Model
 * Represents a badge in the gamification system
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  createdAt: Date;
  
  // Relationships
  userId: string;
  user?: any; // User type
  earnedAt: Date;
}

export enum BadgeCategory {
  VOLUNTEERING = 'VOLUNTEERING',
  ATTENDANCE = 'ATTENDANCE',
  LEADERSHIP = 'LEADERSHIP',
  COMMUNITY = 'COMMUNITY',
  SPECIAL = 'SPECIAL',
}

export enum BadgeRarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

