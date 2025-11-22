/**
 * Badge Service - Handles badge unlocking and tracking
 * Uses mock data storage until database integration
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  unlockCondition: BadgeUnlockCondition;
}

export enum BadgeCategory {
  ATTENDANCE = 'attendance',
  VOLUNTEERING = 'volunteering',
  ACHIEVEMENT = 'achievement',
  SOCIAL = 'social',
  MILESTONE = 'milestone',
}

export enum BadgeRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export interface BadgeUnlockCondition {
  type: UnlockConditionType;
  threshold?: number;
  eventType?: string;
  metadata?: Record<string, any>;
}

export enum UnlockConditionType {
  TOTAL_EVENTS = 'total_events',
  TOTAL_HOURS = 'total_hours',
  CONSECUTIVE_DAYS = 'consecutive_days',
  CATEGORY_COUNT = 'category_count',
  XP_THRESHOLD = 'xp_threshold',
  LEVEL_THRESHOLD = 'level_threshold',
  SPECIFIC_ACHIEVEMENT = 'specific_achievement',
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  unlockedAt: Date;
  progress?: number;
  maxProgress?: number;
}

// Mock badge definitions
export const BADGE_DEFINITIONS: Badge[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Attend your first event',
    icon: '🚶',
    category: BadgeCategory.ATTENDANCE,
    rarity: BadgeRarity.COMMON,
    unlockCondition: {
      type: UnlockConditionType.TOTAL_EVENTS,
      threshold: 1,
    },
  },
  {
    id: 'dedicated_volunteer',
    name: 'Dedicated Volunteer',
    description: 'Attend 10 events',
    icon: '⭐',
    category: BadgeCategory.ATTENDANCE,
    rarity: BadgeRarity.UNCOMMON,
    unlockCondition: {
      type: UnlockConditionType.TOTAL_EVENTS,
      threshold: 10,
    },
  },
  {
    id: 'community_hero',
    name: 'Community Hero',
    description: 'Attend 50 events',
    icon: '🦸',
    category: BadgeCategory.ATTENDANCE,
    rarity: BadgeRarity.RARE,
    unlockCondition: {
      type: UnlockConditionType.TOTAL_EVENTS,
      threshold: 50,
    },
  },
  {
    id: 'time_giver',
    name: 'Time Giver',
    description: 'Volunteer for 10 hours',
    icon: '⏰',
    category: BadgeCategory.VOLUNTEERING,
    rarity: BadgeRarity.UNCOMMON,
    unlockCondition: {
      type: UnlockConditionType.TOTAL_HOURS,
      threshold: 10,
    },
  },
  {
    id: 'hour_master',
    name: 'Hour Master',
    description: 'Volunteer for 100 hours',
    icon: '👑',
    category: BadgeCategory.VOLUNTEERING,
    rarity: BadgeRarity.EPIC,
    unlockCondition: {
      type: UnlockConditionType.TOTAL_HOURS,
      threshold: 100,
    },
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Login for 7 consecutive days',
    icon: '🐦',
    category: BadgeCategory.SOCIAL,
    rarity: BadgeRarity.UNCOMMON,
    unlockCondition: {
      type: UnlockConditionType.CONSECUTIVE_DAYS,
      threshold: 7,
    },
  },
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '🌟',
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.UNCOMMON,
    unlockCondition: {
      type: UnlockConditionType.LEVEL_THRESHOLD,
      threshold: 5,
    },
  },
  {
    id: 'xp_champion',
    name: 'XP Champion',
    description: 'Reach 5000 XP',
    icon: '💎',
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.RARE,
    unlockCondition: {
      type: UnlockConditionType.XP_THRESHOLD,
      threshold: 5000,
    },
  },
];

// Mock data storage
const mockUserBadges: Map<string, UserBadge[]> = new Map();
const mockUserStats: Map<string, UserStats> = new Map();

export interface UserStats {
  userId: string;
  totalEvents: number;
  totalHours: number;
  consecutiveDays: number;
  lastLoginDate?: Date;
  currentLevel: number;
  totalXP: number;
  categoryCounts: Record<string, number>;
}

/**
 * Get or create user stats
 */
function getUserStats(userId: string): UserStats {
  if (!mockUserStats.has(userId)) {
    mockUserStats.set(userId, {
      userId,
      totalEvents: 0,
      totalHours: 0,
      consecutiveDays: 0,
      currentLevel: 1,
      totalXP: 0,
      categoryCounts: {},
    });
  }
  return mockUserStats.get(userId)!;
}

/**
 * Get user badges
 */
export function getUserBadges(userId: string): UserBadge[] {
  return mockUserBadges.get(userId) || [];
}

/**
 * Check if user has badge
 */
export function hasBadge(userId: string, badgeId: string): boolean {
  const userBadges = getUserBadges(userId);
  return userBadges.some(badge => badge.badgeId === badgeId);
}

/**
 * Unlock badge for user
 */
export function unlockBadge(userId: string, badgeId: string): UserBadge | null {
  if (hasBadge(userId, badgeId)) {
    return null; // Already unlocked
  }

  const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
  if (!badge) {
    return null; // Badge not found
  }

  const userBadge: UserBadge = {
    userId,
    badgeId,
    unlockedAt: new Date(),
  };

  if (!mockUserBadges.has(userId)) {
    mockUserBadges.set(userId, []);
  }
  mockUserBadges.get(userId)!.push(userBadge);

  return userBadge;
}

/**
 * Check and unlock badges based on user stats
 */
export function checkAndUnlockBadges(
  userId: string,
  stats: {
    totalEvents?: number;
    totalHours?: number;
    level?: number;
    totalXP?: number;
    consecutiveDays?: number;
  }
): UserBadge[] {
  const userStats = getUserStats(userId);
  
  // Update user stats
  if (stats.totalEvents !== undefined) userStats.totalEvents = stats.totalEvents;
  if (stats.totalHours !== undefined) userStats.totalHours = stats.totalHours;
  if (stats.level !== undefined) userStats.currentLevel = stats.level;
  if (stats.totalXP !== undefined) userStats.totalXP = stats.totalXP;
  if (stats.consecutiveDays !== undefined) userStats.consecutiveDays = stats.consecutiveDays;

  const unlockedBadges: UserBadge[] = [];

  // Check each badge definition
  for (const badge of BADGE_DEFINITIONS) {
    if (hasBadge(userId, badge.id)) {
      continue; // Already unlocked
    }

    const condition = badge.unlockCondition;
    let shouldUnlock = false;

    switch (condition.type) {
      case UnlockConditionType.TOTAL_EVENTS:
        if (userStats.totalEvents >= (condition.threshold || 0)) {
          shouldUnlock = true;
        }
        break;

      case UnlockConditionType.TOTAL_HOURS:
        if (userStats.totalHours >= (condition.threshold || 0)) {
          shouldUnlock = true;
        }
        break;

      case UnlockConditionType.LEVEL_THRESHOLD:
        if (userStats.currentLevel >= (condition.threshold || 0)) {
          shouldUnlock = true;
        }
        break;

      case UnlockConditionType.XP_THRESHOLD:
        if (userStats.totalXP >= (condition.threshold || 0)) {
          shouldUnlock = true;
        }
        break;

      case UnlockConditionType.CONSECUTIVE_DAYS:
        if (userStats.consecutiveDays >= (condition.threshold || 0)) {
          shouldUnlock = true;
        }
        break;
    }

    if (shouldUnlock) {
      const userBadge = unlockBadge(userId, badge.id);
      if (userBadge) {
        unlockedBadges.push(userBadge);
      }
    }
  }

  return unlockedBadges;
}

/**
 * Get badge progress for user
 */
export function getBadgeProgress(userId: string, badgeId: string): {
  badge: Badge;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  progressPercentage: number;
} | null {
  const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
  if (!badge) {
    return null;
  }

  const userStats = getUserStats(userId);
  const unlocked = hasBadge(userId, badgeId);
  
  const condition = badge.unlockCondition;
  let progress = 0;
  let maxProgress = condition.threshold || 0;

  switch (condition.type) {
    case UnlockConditionType.TOTAL_EVENTS:
      progress = userStats.totalEvents;
      break;
    case UnlockConditionType.TOTAL_HOURS:
      progress = userStats.totalHours;
      break;
    case UnlockConditionType.LEVEL_THRESHOLD:
      progress = userStats.currentLevel;
      break;
    case UnlockConditionType.XP_THRESHOLD:
      progress = userStats.totalXP;
      break;
    case UnlockConditionType.CONSECUTIVE_DAYS:
      progress = userStats.consecutiveDays;
      break;
  }

  const progressPercentage = maxProgress > 0 
    ? Math.min((progress / maxProgress) * 100, 100)
    : 0;

  return {
    badge,
    unlocked,
    progress,
    maxProgress,
    progressPercentage,
  };
}

/**
 * Get all badges with progress for user
 */
export function getAllBadgesWithProgress(userId: string): Array<{
  badge: Badge;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  progressPercentage: number;
  unlockedAt?: Date;
}> {
  const userBadges = getUserBadges(userId);
  const badgeMap = new Map(userBadges.map(b => [b.badgeId, b]));

  return BADGE_DEFINITIONS.map(badge => {
    const userBadge = badgeMap.get(badge.id);
    const progressInfo = getBadgeProgress(userId, badge.id);
    
    return {
      ...progressInfo!,
      unlockedAt: userBadge?.unlockedAt,
    };
  });
}

/**
 * Update user stats (called by other services)
 */
export function updateUserStats(
  userId: string,
  updates: Partial<UserStats>
): void {
  const stats = getUserStats(userId);
  Object.assign(stats, updates);
}

/**
 * Reset mock data (for testing)
 */
export function resetMockData(): void {
  mockUserBadges.clear();
  mockUserStats.clear();
}
