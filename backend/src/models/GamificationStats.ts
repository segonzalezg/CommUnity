/**
 * Gamification Stats Model
 * Represents a user's gamification statistics
 */

export interface GamificationStats {
  userId: string;
  totalPoints: number;
  currentLevel: number;
  totalBadges: number;
  totalAchievements: number;
  totalEventsAttended: number;
  totalHoursVolunteered: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt?: Date;
  updatedAt: Date;
}

