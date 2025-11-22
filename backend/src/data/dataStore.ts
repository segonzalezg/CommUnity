/**
 * Data Store Service
 * Manages in-memory data storage and provides data access methods
 */

import {
  mockUsers,
  mockOrganizations,
  mockEvents,
  mockMessages,
  mockBadges,
  mockAchievements,
  mockEventApplications,
  mockAttendances,
  mockGamificationStats,
} from './mockData';

import { User } from '../../../src/models/User';
import { Event } from '../../../src/models/Event';
import { Organization } from '../../../src/models/Organization';
import { Message } from '../../../src/models/Message';
import { Badge } from '../models/Badge';
import { Achievement } from '../models/Achievement';
import { EventApplication } from '../models/EventApplication';
import { Attendance } from '../models/Attendance';
import { GamificationStats } from '../models/GamificationStats';

// Clone arrays to avoid mutations
export const users: User[] = JSON.parse(JSON.stringify(mockUsers));
export const organizations: Organization[] = JSON.parse(JSON.stringify(mockOrganizations));
export const events: Event[] = JSON.parse(JSON.stringify(mockEvents));
export const messages: Message[] = JSON.parse(JSON.stringify(mockMessages));
export const badges: Badge[] = JSON.parse(JSON.stringify(mockBadges));
export const achievements: Achievement[] = JSON.parse(JSON.stringify(mockAchievements));
export const eventApplications: EventApplication[] = JSON.parse(JSON.stringify(mockEventApplications));
export const attendances: Attendance[] = JSON.parse(JSON.stringify(mockAttendances));
export const gamificationStats: GamificationStats[] = JSON.parse(JSON.stringify(mockGamificationStats));

// Helper function to generate IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

