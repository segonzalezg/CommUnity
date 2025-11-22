/**
 * Gamification Integration - Integrates gamification services
 * Provides unified functions for attendance flow and API endpoints
 */

import {
  awardXP,
  awardXPByReason,
  getUserXP,
  XPReason,
  type UserXP,
} from './xpService';

import {
  checkAndUnlockBadges,
  getUserBadges,
  getAllBadgesWithProgress,
  updateUserStats,
  type UserBadge,
} from './badgeService';

import {
  checkAndUnlockAchievements,
  getUserAchievements,
  getAllAchievementsWithProgress,
  type UserAchievement,
} from './achievementService';

export interface GamificationResult {
  userXP: UserXP;
  unlockedBadges: UserBadge[];
  unlockedAchievements: UserAchievement[];
  levelUp?: boolean;
}

/**
 * Process attendance and award gamification rewards
 * This is the main integration function for the attendance flow
 */
export function processAttendance(
  userId: string,
  eventId: string,
  hoursVolunteered?: number
): GamificationResult {
  // Award XP for attendance
  const userXP = awardXPByReason(userId, XPReason.ATTENDANCE, {
    eventId,
  });

  // Award XP for hours volunteered if provided
  if (hoursVolunteered && hoursVolunteered > 0) {
    awardXPByReason(userId, XPReason.VOLUNTEER_HOUR, {
      eventId,
      hours: hoursVolunteered,
    });
    // Refresh user XP to get updated values
    const updatedXP = getUserXP(userId);
    if (updatedXP) {
      Object.assign(userXP, updatedXP);
    }
  }

  // Get user XP (refresh to get latest)
  const currentXP = getUserXP(userId)!;
  const currentLevel = currentXP.level;

  // Get current user stats (we need to track these properly)
  // For now, we'll use a simplified approach
  const userBadges = getUserBadges(userId);
  
  // Update user stats for badge checking
  // In a real implementation, you'd fetch these from a database
  const totalEvents = currentXP.xpHistory.filter(
    t => t.reason === XPReason.ATTENDANCE
  ).length;
  
  const totalHours = hoursVolunteered || 0; // This should be cumulative

  // Check and unlock badges
  const unlockedBadges = checkAndUnlockBadges(userId, {
    totalEvents,
    totalHours,
    level: currentXP.level,
    totalXP: currentXP.totalXP,
  });

  // Award XP for newly unlocked badges
  for (const badge of unlockedBadges) {
    awardXPByReason(userId, XPReason.BADGE_EARNED, { eventId });
  }

  // Refresh user XP after badge XP awards
  const finalXP = getUserXP(userId)!;
  
  // Get all user badges for achievement checking
  const allUserBadges = getUserBadges(userId);

  // Check and unlock achievements
  const unlockedAchievements = checkAndUnlockAchievements(userId, {
    badges: allUserBadges,
    userXP: finalXP,
    totalEvents,
    totalHours,
  });

  // Award XP for newly unlocked achievements
  for (const achievement of unlockedAchievements) {
    awardXPByReason(userId, XPReason.ACHIEVEMENT_UNLOCK, { eventId });
  }

  // Final user XP
  const finalUserXP = getUserXP(userId)!;
  
  // Check for level up
  const levelUp = finalUserXP.level > currentLevel;

  return {
    userXP: finalUserXP,
    unlockedBadges,
    unlockedAchievements,
    levelUp,
  };
}

/**
 * Process event completion
 */
export function processEventCompletion(
  userId: string,
  eventId: string,
  hoursVolunteered: number
): GamificationResult {
  // Award XP for event completion
  const userXP = awardXPByReason(userId, XPReason.EVENT_COMPLETION, {
    eventId,
  });

  // Award XP for hours volunteered
  if (hoursVolunteered > 0) {
    awardXPByReason(userId, XPReason.VOLUNTEER_HOUR, {
      eventId,
      hours: hoursVolunteered,
    });
  }

  // Refresh user XP
  const currentXP = getUserXP(userId)!;
  const currentLevel = currentXP.level;

  // Calculate stats
  const totalEvents = currentXP.xpHistory.filter(
    t => t.reason === XPReason.ATTENDANCE || t.reason === XPReason.EVENT_COMPLETION
  ).length;
  
  // This should be cumulative from database, for now we'll use a placeholder
  const totalHours = hoursVolunteered;

  // Check and unlock badges
  const unlockedBadges = checkAndUnlockBadges(userId, {
    totalEvents,
    totalHours,
    level: currentXP.level,
    totalXP: currentXP.totalXP,
  });

  // Award XP for badges
  for (const badge of unlockedBadges) {
    awardXPByReason(userId, XPReason.BADGE_EARNED, { eventId });
  }

  // Refresh and check achievements
  const finalXP = getUserXP(userId)!;
  const allUserBadges = getUserBadges(userId);

  const unlockedAchievements = checkAndUnlockAchievements(userId, {
    badges: allUserBadges,
    userXP: finalXP,
    totalEvents,
    totalHours,
  });

  // Award XP for achievements
  for (const achievement of unlockedAchievements) {
    awardXPByReason(userId, XPReason.ACHIEVEMENT_UNLOCK, { eventId });
  }

  const finalUserXP = getUserXP(userId)!;
  const levelUp = finalUserXP.level > currentLevel;

  return {
    userXP: finalUserXP,
    unlockedBadges,
    unlockedAchievements,
    levelUp,
  };
}

/**
 * Process daily login
 */
export function processDailyLogin(userId: string): GamificationResult {
  const currentXP = getUserXP(userId);
  const currentLevel = currentXP?.level || 1;

  // Award XP for daily login
  const userXP = awardXPByReason(userId, XPReason.DAILY_LOGIN);

  // Update consecutive days (this would normally come from a database)
  // For now, we'll use a placeholder
  const consecutiveDays = 1; // Should be fetched from user stats

  // Check badges
  const unlockedBadges = checkAndUnlockBadges(userId, {
    consecutiveDays,
    level: userXP.level,
    totalXP: userXP.totalXP,
  });

  // Award XP for badges
  for (const badge of unlockedBadges) {
    awardXPByReason(userId, XPReason.BADGE_EARNED);
  }

  // Check achievements
  const finalXP = getUserXP(userId)!;
  const allUserBadges = getUserBadges(userId);

  const unlockedAchievements = checkAndUnlockAchievements(userId, {
    badges: allUserBadges,
    userXP: finalXP,
    consecutiveDays,
  });

  // Award XP for achievements
  for (const achievement of unlockedAchievements) {
    awardXPByReason(userId, XPReason.ACHIEVEMENT_UNLOCK);
  }

  const finalUserXP = getUserXP(userId)!;
  const levelUp = finalUserXP.level > currentLevel;

  return {
    userXP: finalUserXP,
    unlockedBadges,
    unlockedAchievements,
    levelUp,
  };
}

/**
 * Get complete gamification status for a user
 */
export function getUserGamificationStatus(userId: string): {
  userXP: UserXP | null;
  badges: ReturnType<typeof getAllBadgesWithProgress>;
  achievements: ReturnType<typeof getAllAchievementsWithProgress>;
} {
  const userXP = getUserXP(userId);
  const userBadges = getUserBadges(userId);

  const badges = getAllBadgesWithProgress(userId);
  const achievements = getAllAchievementsWithProgress(userId, {
    badges: userBadges,
    userXP: userXP || undefined,
  });

  return {
    userXP,
    badges,
    achievements,
  };
}

/**
 * Award custom XP (for special events or admin actions)
 */
export function awardCustomXP(
  userId: string,
  amount: number,
  reason: string,
  eventId?: string,
  opportunityId?: string
): UserXP {
  // Use a custom reason that maps to a known type or create a generic one
  return awardXP(userId, amount, XPReason.ACHIEVEMENT_UNLOCK, eventId, opportunityId);
}
