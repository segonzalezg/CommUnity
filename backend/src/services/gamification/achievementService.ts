/**
 * Achievement Service - Handles achievement tracking and unlocking
 * Uses mock data storage until database integration
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import type { Badge, UserBadge } from './badgeService';
import type { UserXP } from './xpService';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number;
  requirements: AchievementRequirement[];
}

export enum AchievementCategory {
  VOLUNTEERING = 'volunteering',
  SOCIAL = 'social',
  MILESTONE = 'milestone',
  SPECIAL = 'special',
}

export interface AchievementRequirement {
  type: RequirementType;
  condition: string;
  threshold?: number;
  metadata?: Record<string, any>;
}

export enum RequirementType {
  BADGE_COUNT = 'badge_count',
  BADGE_SPECIFIC = 'badge_specific',
  XP_THRESHOLD = 'xp_threshold',
  LEVEL_THRESHOLD = 'level_threshold',
  EVENT_COUNT = 'event_count',
  HOURS_VOLUNTEERED = 'hours_volunteered',
  CONSECUTIVE_DAYS = 'consecutive_days',
  CATEGORY_PARTICIPATION = 'category_participation',
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress?: Record<string, number>;
}

// Load achievement rules from JSON
let achievementRules: Achievement[] = [];

try {
  const rulesPath = join(__dirname, 'achievementRules.json');
  const rulesData = readFileSync(rulesPath, 'utf-8');
  achievementRules = JSON.parse(rulesData);
} catch (error) {
  // If file doesn't exist yet, use default achievements
  console.warn('achievementRules.json not found, using default achievements');
  achievementRules = getDefaultAchievements();
}

function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first_achievement',
      name: 'Getting Started',
      description: 'Unlock your first badge',
      icon: '🎯',
      category: AchievementCategory.MILESTONE,
      points: 100,
      requirements: [
        {
          type: RequirementType.BADGE_COUNT,
          condition: '>=',
          threshold: 1,
        },
      ],
    },
    {
      id: 'badge_collector',
      name: 'Badge Collector',
      description: 'Unlock 5 badges',
      icon: '🏅',
      category: AchievementCategory.MILESTONE,
      points: 200,
      requirements: [
        {
          type: RequirementType.BADGE_COUNT,
          condition: '>=',
          threshold: 5,
        },
      ],
    },
    {
      id: 'badge_master',
      name: 'Badge Master',
      description: 'Unlock all badges',
      icon: '👑',
      category: AchievementCategory.SPECIAL,
      points: 500,
      requirements: [
        {
          type: RequirementType.BADGE_COUNT,
          condition: '>=',
          threshold: 8, // Total number of badges
        },
      ],
    },
    {
      id: 'level_warrior',
      name: 'Level Warrior',
      description: 'Reach level 10',
      icon: '⚔️',
      category: AchievementCategory.MILESTONE,
      points: 300,
      requirements: [
        {
          type: RequirementType.LEVEL_THRESHOLD,
          condition: '>=',
          threshold: 10,
        },
      ],
    },
    {
      id: 'xp_legend',
      name: 'XP Legend',
      description: 'Reach 10000 XP',
      icon: '🔥',
      category: AchievementCategory.MILESTONE,
      points: 400,
      requirements: [
        {
          type: RequirementType.XP_THRESHOLD,
          condition: '>=',
          threshold: 10000,
        },
      ],
    },
    {
      id: 'community_champion',
      name: 'Community Champion',
      description: 'Attend 100 events',
      icon: '🌟',
      category: AchievementCategory.VOLUNTEERING,
      points: 350,
      requirements: [
        {
          type: RequirementType.EVENT_COUNT,
          condition: '>=',
          threshold: 100,
        },
      ],
    },
    {
      id: 'time_philanthropist',
      name: 'Time Philanthropist',
      description: 'Volunteer for 200 hours',
      icon: '💝',
      category: AchievementCategory.VOLUNTEERING,
      points: 400,
      requirements: [
        {
          type: RequirementType.HOURS_VOLUNTEERED,
          condition: '>=',
          threshold: 200,
        },
      ],
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a 30-day login streak',
      icon: '🔥',
      category: AchievementCategory.SOCIAL,
      points: 250,
      requirements: [
        {
          type: RequirementType.CONSECUTIVE_DAYS,
          condition: '>=',
          threshold: 30,
        },
      ],
    },
  ];
}

// Export achievement rules getter
export function getAchievementRules(): Achievement[] {
  return achievementRules;
}

export function reloadAchievementRules(): void {
  try {
    const rulesPath = join(__dirname, 'achievementRules.json');
    const rulesData = readFileSync(rulesPath, 'utf-8');
    achievementRules = JSON.parse(rulesData);
  } catch (error) {
    console.error('Failed to reload achievement rules:', error);
  }
}

// Mock data storage
const mockUserAchievements: Map<string, UserAchievement[]> = new Map();

/**
 * Get user achievements
 */
export function getUserAchievements(userId: string): UserAchievement[] {
  return mockUserAchievements.get(userId) || [];
}

/**
 * Check if user has achievement
 */
export function hasAchievement(userId: string, achievementId: string): boolean {
  const userAchievements = getUserAchievements(userId);
  return userAchievements.some(achievement => achievement.achievementId === achievementId);
}

/**
 * Unlock achievement for user
 */
export function unlockAchievement(userId: string, achievementId: string): UserAchievement | null {
  if (hasAchievement(userId, achievementId)) {
    return null; // Already unlocked
  }

  const achievement = achievementRules.find(a => a.id === achievementId);
  if (!achievement) {
    return null; // Achievement not found
  }

  const userAchievement: UserAchievement = {
    userId,
    achievementId,
    unlockedAt: new Date(),
  };

  if (!mockUserAchievements.has(userId)) {
    mockUserAchievements.set(userId, []);
  }
  mockUserAchievements.get(userId)!.push(userAchievement);

  return userAchievement;
}

/**
 * Check requirement fulfillment
 */
function checkRequirement(
  requirement: AchievementRequirement,
  userData: {
    badgeCount?: number;
    badges?: string[];
    level?: number;
    totalXP?: number;
    eventCount?: number;
    hoursVolunteered?: number;
    consecutiveDays?: number;
  }
): boolean {
  const { type, condition, threshold } = requirement;

  switch (type) {
    case RequirementType.BADGE_COUNT:
      if (userData.badgeCount === undefined) return false;
      return evaluateCondition(userData.badgeCount, condition, threshold || 0);

    case RequirementType.BADGE_SPECIFIC:
      if (!userData.badges || !requirement.metadata?.badgeId) return false;
      return userData.badges.includes(requirement.metadata.badgeId);

    case RequirementType.LEVEL_THRESHOLD:
      if (userData.level === undefined) return false;
      return evaluateCondition(userData.level, condition, threshold || 0);

    case RequirementType.XP_THRESHOLD:
      if (userData.totalXP === undefined) return false;
      return evaluateCondition(userData.totalXP, condition, threshold || 0);

    case RequirementType.EVENT_COUNT:
      if (userData.eventCount === undefined) return false;
      return evaluateCondition(userData.eventCount, condition, threshold || 0);

    case RequirementType.HOURS_VOLUNTEERED:
      if (userData.hoursVolunteered === undefined) return false;
      return evaluateCondition(userData.hoursVolunteered, condition, threshold || 0);

    case RequirementType.CONSECUTIVE_DAYS:
      if (userData.consecutiveDays === undefined) return false;
      return evaluateCondition(userData.consecutiveDays, condition, threshold || 0);

    default:
      return false;
  }
}

/**
 * Evaluate condition (>=, >, ==, <=, <)
 */
function evaluateCondition(value: number, condition: string, threshold: number): boolean {
  switch (condition) {
    case '>=':
      return value >= threshold;
    case '>':
      return value > threshold;
    case '==':
      return value === threshold;
    case '<=':
      return value <= threshold;
    case '<':
      return value < threshold;
    default:
      return false;
  }
}

/**
 * Check and unlock achievements for a user
 */
export function checkAndUnlockAchievements(
  userId: string,
  userData: {
    badges?: UserBadge[];
    userXP?: UserXP;
    totalEvents?: number;
    totalHours?: number;
    consecutiveDays?: number;
  }
): UserAchievement[] {
  const unlockedAchievements: UserAchievement[] = [];

  // Prepare user data for requirement checking
  const requirementData = {
    badgeCount: userData.badges?.length || 0,
    badges: userData.badges?.map(b => b.badgeId) || [],
    level: userData.userXP?.level || 1,
    totalXP: userData.userXP?.totalXP || 0,
    eventCount: userData.totalEvents || 0,
    hoursVolunteered: userData.totalHours || 0,
    consecutiveDays: userData.consecutiveDays || 0,
  };

  // Check each achievement
  for (const achievement of achievementRules) {
    if (hasAchievement(userId, achievement.id)) {
      continue; // Already unlocked
    }

    // Check if all requirements are met
    const allRequirementsMet = achievement.requirements.every(req =>
      checkRequirement(req, requirementData)
    );

    if (allRequirementsMet) {
      const userAchievement = unlockAchievement(userId, achievement.id);
      if (userAchievement) {
        unlockedAchievements.push(userAchievement);
      }
    }
  }

  return unlockedAchievements;
}

/**
 * Get achievement progress for user
 */
export function getAchievementProgress(
  userId: string,
  achievementId: string,
  userData?: {
    badges?: UserBadge[];
    userXP?: UserXP;
    totalEvents?: number;
    totalHours?: number;
    consecutiveDays?: number;
  }
): {
  achievement: Achievement;
  unlocked: boolean;
  progress: Record<string, number>;
  requirements: Array<{
    requirement: AchievementRequirement;
    met: boolean;
    currentValue: number;
    threshold?: number;
  }>;
  allRequirementsMet: boolean;
} | null {
  const achievement = achievementRules.find(a => a.id === achievementId);
  if (!achievement) {
    return null;
  }

  const unlocked = hasAchievement(userId, achievementId);

  const progressData = {
    badgeCount: userData?.badges?.length || 0,
    level: userData?.userXP?.level || 1,
    totalXP: userData?.userXP?.totalXP || 0,
    eventCount: userData?.totalEvents || 0,
    hoursVolunteered: userData?.totalHours || 0,
    consecutiveDays: userData?.consecutiveDays || 0,
  };

  const requirementsProgress = achievement.requirements.map(req => {
    let currentValue = 0;
    
    switch (req.type) {
      case RequirementType.BADGE_COUNT:
        currentValue = progressData.badgeCount;
        break;
      case RequirementType.LEVEL_THRESHOLD:
        currentValue = progressData.level;
        break;
      case RequirementType.XP_THRESHOLD:
        currentValue = progressData.totalXP;
        break;
      case RequirementType.EVENT_COUNT:
        currentValue = progressData.eventCount;
        break;
      case RequirementType.HOURS_VOLUNTEERED:
        currentValue = progressData.hoursVolunteered;
        break;
      case RequirementType.CONSECUTIVE_DAYS:
        currentValue = progressData.consecutiveDays;
        break;
    }

    const met = checkRequirement(req, { ...progressData, badges: userData?.badges?.map(b => b.badgeId) });

    return {
      requirement: req,
      met,
      currentValue,
      threshold: req.threshold,
    };
  });

  const allRequirementsMet = requirementsProgress.every(r => r.met);

  return {
    achievement,
    unlocked,
    progress: progressData,
    requirements: requirementsProgress,
    allRequirementsMet,
  };
}

/**
 * Get all achievements with progress for user
 */
export function getAllAchievementsWithProgress(
  userId: string,
  userData?: {
    badges?: UserBadge[];
    userXP?: UserXP;
    totalEvents?: number;
    totalHours?: number;
    consecutiveDays?: number;
  }
): Array<{
  achievement: Achievement;
  unlocked: boolean;
  progress: Record<string, number>;
  requirements: Array<{
    requirement: AchievementRequirement;
    met: boolean;
    currentValue: number;
    threshold?: number;
  }>;
  allRequirementsMet: boolean;
  unlockedAt?: Date;
}> {
  const userAchievements = getUserAchievements(userId);
  const achievementMap = new Map(userAchievements.map(a => [a.achievementId, a]));

  return achievementRules.map(achievement => {
    const progressInfo = getAchievementProgress(userId, achievement.id, userData);
    const userAchievement = achievementMap.get(achievement.id);

    return {
      ...progressInfo!,
      unlockedAt: userAchievement?.unlockedAt,
    };
  });
}

/**
 * Reset mock data (for testing)
 */
export function resetAchievementMockData(): void {
  mockUserAchievements.clear();
}
