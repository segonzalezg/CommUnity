/**
 * Gamification Service
 * Business logic for gamification system
 */

import { Badge, BadgeCategory, BadgeRarity } from '../models/Badge';
import { Achievement, AchievementCategory } from '../models/Achievement';
import { GamificationStats } from '../models/GamificationStats';
import {
  badges,
  achievements,
  gamificationStats,
  generateId,
} from '../data/dataStore';
import { attendances, eventApplications } from '../data/dataStore';

export class GamificationService {
  // Get user stats
  getUserStats(userId: string): GamificationStats | null {
    return gamificationStats.find(stats => stats.userId === userId) || null;
  }

  // Get user badges
  getUserBadges(userId: string): Badge[] {
    return badges.filter(badge => badge.userId === userId);
  }

  // Get user achievements
  getUserAchievements(userId: string): Achievement[] {
    return achievements.filter(achievement => achievement.userId === userId);
  }

  // Award points
  awardPoints(userId: string, points: number, reason?: string): GamificationStats | null {
    let stats = gamificationStats.find(s => s.userId === userId);
    if (!stats) {
      stats = {
        userId,
        totalPoints: 0,
        currentLevel: 1,
        totalBadges: 0,
        totalAchievements: 0,
        totalEventsAttended: 0,
        totalHoursVolunteered: 0,
        currentStreak: 0,
        longestStreak: 0,
        updatedAt: new Date(),
      };
      gamificationStats.push(stats);
    }

    stats.totalPoints += points;
    stats.currentLevel = Math.floor(stats.totalPoints / 500) + 1; // Level up every 500 points
    stats.lastActivityAt = new Date();
    stats.updatedAt = new Date();

    return stats;
  }

  // Award badge
  awardBadge(
    userId: string,
    name: string,
    description: string,
    category: BadgeCategory,
    rarity: BadgeRarity = BadgeRarity.COMMON,
    iconUrl?: string
  ): Badge {
    const badge: Badge = {
      id: generateId('badge'),
      name,
      description,
      iconUrl,
      category,
      rarity,
      createdAt: new Date(),
      userId,
      earnedAt: new Date(),
    };
    badges.push(badge);

    // Update stats
    const stats = this.getUserStats(userId);
    if (stats) {
      stats.totalBadges += 1;
      stats.updatedAt = new Date();
    }

    return badge;
  }

  // Award achievement
  awardAchievement(
    userId: string,
    name: string,
    description: string,
    category: AchievementCategory,
    pointsReward: number,
    iconUrl?: string
  ): Achievement {
    const achievement: Achievement = {
      id: generateId('ach'),
      name,
      description,
      iconUrl,
      pointsReward,
      category,
      createdAt: new Date(),
      userId,
      earnedAt: new Date(),
    };
    achievements.push(achievement);

    // Award points
    this.awardPoints(userId, pointsReward);

    // Update stats
    const stats = this.getUserStats(userId);
    if (stats) {
      stats.totalAchievements += 1;
      stats.updatedAt = new Date();
    }

    return achievement;
  }

  // Process attendance for gamification
  processAttendance(userId: string, eventId: string, hoursVolunteered?: number): void {
    const stats = this.getUserStats(userId);
    if (!stats) return;

    // Award points for attendance
    const basePoints = 50;
    const hoursPoints = hoursVolunteered ? hoursVolunteered * 10 : 0;
    this.awardPoints(userId, basePoints + hoursPoints, 'Event attendance');

    // Update attendance stats
    stats.totalEventsAttended += 1;
    if (hoursVolunteered) {
      stats.totalHoursVolunteered += hoursVolunteered;
    }

    // Check for achievements
    if (stats.totalEventsAttended === 1) {
      this.awardAchievement(
        userId,
        'Getting Started',
        'Attended your first event',
        AchievementCategory.FIRST_EVENT,
        100
      );
    }

    if (stats.totalHoursVolunteered >= 50) {
      const existing = achievements.find(
        ach => ach.userId === userId && ach.category === AchievementCategory.VOLUNTEER_HOURS
      );
      if (!existing) {
        this.awardAchievement(
          userId,
          'Dedicated Volunteer',
          'Volunteered 50+ hours',
          AchievementCategory.VOLUNTEER_HOURS,
          500
        );
      }
    }

    // Update streak
    this.updateStreak(userId);
  }

  // Update user streak
  updateStreak(userId: string): void {
    const stats = this.getUserStats(userId);
    if (!stats) return;

    const now = new Date();
    const lastActivity = stats.lastActivityAt;

    if (!lastActivity) {
      stats.currentStreak = 1;
      stats.longestStreak = Math.max(stats.longestStreak, 1);
    } else {
      const daysDiff = Math.floor(
        (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff <= 1) {
        stats.currentStreak += 1;
      } else {
        stats.currentStreak = 1;
      }

      stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    }

    stats.lastActivityAt = now;
    stats.updatedAt = now;
  }

  // Get leaderboard
  getLeaderboard(limit: number = 10): GamificationStats[] {
    return [...gamificationStats]
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
  }

  // Get leaderboard by category
  getLeaderboardByCategory(
    category: 'points' | 'events' | 'hours' | 'streak',
    limit: number = 10
  ): GamificationStats[] {
    const sorted = [...gamificationStats].sort((a, b) => {
      switch (category) {
        case 'points':
          return b.totalPoints - a.totalPoints;
        case 'events':
          return b.totalEventsAttended - a.totalEventsAttended;
        case 'hours':
          return b.totalHoursVolunteered - a.totalHoursVolunteered;
        case 'streak':
          return b.currentStreak - a.currentStreak;
        default:
          return 0;
      }
    });

    return sorted.slice(0, limit);
  }
}

