/**
 * Badge Model
 * Represents a badge that can be earned by users
 */

export interface Badge {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  earnedBy?: User[];
}

export enum BadgeCategory {
  PARTICIPATION = 'PARTICIPATION',
  ACHIEVEMENT = 'ACHIEVEMENT',
  COMMUNITY = 'COMMUNITY',
  EVENT = 'EVENT',
  SOCIAL = 'SOCIAL',
}

export enum BadgeRarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

