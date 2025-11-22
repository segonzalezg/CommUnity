/**
 * XP Service - Handles XP calculation, awarding, and tracking
 * Uses mock data storage until database integration
 */

export interface UserXP {
  userId: string;
  totalXP: number;
  level: number;
  xpHistory: XPTransaction[];
}

export interface XPTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: XPReason;
  timestamp: Date;
  eventId?: string;
  opportunityId?: string;
}

export enum XPReason {
  ATTENDANCE = 'attendance',
  EVENT_COMPLETION = 'event_completion',
  VOLUNTEER_HOUR = 'volunteer_hour',
  ACHIEVEMENT_UNLOCK = 'achievement_unlock',
  BADGE_EARNED = 'badge_earned',
  DAILY_LOGIN = 'daily_login',
  PROFILE_COMPLETION = 'profile_completion',
}

/**
 * XP Calculation Rules
 * - Attendance: 50 XP per event
 * - Event Completion: 100 XP per completed event
 * - Volunteer Hour: 25 XP per hour volunteered
 * - Achievement Unlock: 200 XP per achievement
 * - Badge Earned: 150 XP per badge
 * - Daily Login: 10 XP per day (once per day)
 * - Profile Completion: 100 XP for completing profile
 */
export const XP_RULES: Record<XPReason, number> = {
  [XPReason.ATTENDANCE]: 50,
  [XPReason.EVENT_COMPLETION]: 100,
  [XPReason.VOLUNTEER_HOUR]: 25,
  [XPReason.ACHIEVEMENT_UNLOCK]: 200,
  [XPReason.BADGE_EARNED]: 150,
  [XPReason.DAILY_LOGIN]: 10,
  [XPReason.PROFILE_COMPLETION]: 100,
};

/**
 * Level calculation: XP required = 100 * level^2
 * Level 1: 0-100 XP
 * Level 2: 101-400 XP
 * Level 3: 401-900 XP
 * etc.
 */
export function calculateLevel(totalXP: number): number {
  let level = 1;
  let requiredXP = 0;
  
  while (true) {
    requiredXP = 100 * level * level;
    if (totalXP < requiredXP) {
      return level;
    }
    level++;
  }
}

export function getXPForNextLevel(level: number): number {
  return 100 * level * level;
}

export function getXPProgress(level: number, totalXP: number): {
  currentLevelXP: number;
  nextLevelXP: number;
  progressPercentage: number;
} {
  const currentLevelMinXP = level > 1 ? 100 * (level - 1) * (level - 1) : 0;
  const nextLevelXP = getXPForNextLevel(level);
  const currentLevelXP = totalXP - currentLevelMinXP;
  const progressPercentage = Math.min(
    (currentLevelXP / (nextLevelXP - currentLevelMinXP)) * 100,
    100
  );

  return {
    currentLevelXP,
    nextLevelXP,
    progressPercentage,
  };
}

// Mock data storage (in-memory)
const mockUserXP: Map<string, UserXP> = new Map();
const mockXPTransactions: Map<string, XPTransaction> = new Map();

/**
 * Get or create user XP record
 */
function getUserXPRecord(userId: string): UserXP {
  if (!mockUserXP.has(userId)) {
    mockUserXP.set(userId, {
      userId,
      totalXP: 0,
      level: 1,
      xpHistory: [],
    });
  }
  return mockUserXP.get(userId)!;
}

/**
 * Award XP to a user
 * @param userId - User ID
 * @param amount - Amount of XP to award
 * @param reason - Reason for awarding XP
 * @param eventId - Optional event ID
 * @param opportunityId - Optional opportunity ID
 * @returns Updated user XP record
 */
export function awardXP(
  userId: string,
  amount: number,
  reason: XPReason,
  eventId?: string,
  opportunityId?: string
): UserXP {
  const userXP = getUserXPRecord(userId);
  const oldLevel = userXP.level;
  
  // Create transaction
  const transaction: XPTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    amount,
    reason,
    timestamp: new Date(),
    eventId,
    opportunityId,
  };

  // Update user XP
  userXP.totalXP += amount;
  userXP.level = calculateLevel(userXP.totalXP);
  userXP.xpHistory.push(transaction);

  // Store transaction
  mockXPTransactions.set(transaction.id, transaction);

  // Check for level up
  const levelUp = userXP.level > oldLevel;

  return {
    ...userXP,
    ...(levelUp && { levelUp }),
  } as UserXP & { levelUp?: boolean };
}

/**
 * Get user XP details
 */
export function getUserXP(userId: string): UserXP | null {
  return mockUserXP.get(userId) || null;
}

/**
 * Get user XP history
 */
export function getUserXPHistory(userId: string, limit?: number): XPTransaction[] {
  const userXP = mockUserXP.get(userId);
  if (!userXP) {
    return [];
  }

  const history = [...userXP.xpHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return limit ? history.slice(0, limit) : history;
}

/**
 * Calculate XP amount for a specific reason
 */
export function calculateXPAmount(reason: XPReason, metadata?: {
  hours?: number;
  multiplier?: number;
}): number {
  const baseAmount = XP_RULES[reason];
  
  if (reason === XPReason.VOLUNTEER_HOUR && metadata?.hours) {
    return baseAmount * metadata.hours;
  }
  
  if (metadata?.multiplier) {
    return Math.floor(baseAmount * metadata.multiplier);
  }
  
  return baseAmount;
}

/**
 * Award XP by reason (uses predefined rules)
 */
export function awardXPByReason(
  userId: string,
  reason: XPReason,
  metadata?: {
    eventId?: string;
    opportunityId?: string;
    hours?: number;
    multiplier?: number;
  }
): UserXP {
  const amount = calculateXPAmount(reason, metadata);
  return awardXP(
    userId,
    amount,
    reason,
    metadata?.eventId,
    metadata?.opportunityId
  );
}

/**
 * Get leaderboard (top users by XP)
 */
export function getLeaderboard(limit: number = 10): Array<{
  userId: string;
  totalXP: number;
  level: number;
  rank: number;
}> {
  const users = Array.from(mockUserXP.values())
    .sort((a, b) => b.totalXP - a.totalXP)
    .slice(0, limit)
    .map((user, index) => ({
      userId: user.userId,
      totalXP: user.totalXP,
      level: user.level,
      rank: index + 1,
    }));

  return users;
}

/**
 * Reset mock data (for testing purposes)
 */
export function resetMockData(): void {
  mockUserXP.clear();
  mockXPTransactions.clear();
}
