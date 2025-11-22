/**
 * Example Usage - Shows how to integrate gamification services with API endpoints
 * 
 * This file demonstrates how to use the gamification services in your controllers/routes.
 * This file can be removed in production - it's just for reference.
 */

/* 
// Example: Attendance Controller/Route Handler
import { processAttendance, getUserGamificationStatus } from './gamificationIntegration';

// When a user checks in to an event
export async function checkInToEvent(userId: string, eventId: string, hoursVolunteered?: number) {
  try {
    // Process attendance and award rewards
    const result = await processAttendance(userId, eventId, hoursVolunteered);
    
    // result contains:
    // - userXP: Updated user XP and level
    // - unlockedBadges: Array of newly unlocked badges
    // - unlockedAchievements: Array of newly unlocked achievements
    // - levelUp: Boolean indicating if user leveled up
    
    // Send notifications for rewards (if needed)
    if (result.unlockedBadges.length > 0) {
      // Notify user about new badges
    }
    
    if (result.unlockedAchievements.length > 0) {
      // Notify user about new achievements
    }
    
    if (result.levelUp) {
      // Notify user about level up
    }
    
    return {
      success: true,
      xpAwarded: result.userXP.totalXP,
      level: result.userXP.level,
      unlockedBadges: result.unlockedBadges,
      unlockedAchievements: result.unlockedAchievements,
      levelUp: result.levelUp,
    };
  } catch (error) {
    console.error('Error processing attendance:', error);
    throw error;
  }
}

// Example: Get User Gamification Status (for profile page, etc.)
export async function getUserStatus(userId: string) {
  try {
    const status = getUserGamificationStatus(userId);
    
    // status contains:
    // - userXP: User's XP and level information
    // - badges: All badges with progress
    // - achievements: All achievements with progress
    
    return {
      xp: status.userXP,
      badges: status.badges,
      achievements: status.achievements,
    };
  } catch (error) {
    console.error('Error getting user status:', error);
    throw error;
  }
}

// Example: Event Completion
import { processEventCompletion } from './gamificationIntegration';

export async function completeEvent(userId: string, eventId: string, hoursVolunteered: number) {
  try {
    const result = await processEventCompletion(userId, eventId, hoursVolunteered);
    return result;
  } catch (error) {
    console.error('Error processing event completion:', error);
    throw error;
  }
}

// Example: Daily Login
import { processDailyLogin } from './gamificationIntegration';

export async function handleDailyLogin(userId: string) {
  try {
    const result = await processDailyLogin(userId);
    return result;
  } catch (error) {
    console.error('Error processing daily login:', error);
    throw error;
  }
}
*/
