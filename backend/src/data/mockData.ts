/**
 * Mock In-Memory Data Store
 * This file contains all the mock data for the application
 */

import { User, UserRole } from '../../../src/models/User';
import { Event, EventStatus } from '../../../src/models/Event';
import { Organization } from '../../../src/models/Organization';
import { Message, MessageType } from '../../../src/models/Message';
import { Badge, BadgeCategory, BadgeRarity } from '../models/Badge';
import { Achievement, AchievementCategory } from '../models/Achievement';
import { EventApplication, ApplicationStatus } from '../models/EventApplication';
import { Attendance, AttendanceStatus } from '../models/Attendance';
import { GamificationStats } from '../models/GamificationStats';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    username: 'johndoe',
    displayName: 'John Doe',
    passwordHash: 'hashed_password_1',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    bio: 'Passionate volunteer and community builder',
    phoneNumber: '+1234567890',
    isEmailVerified: true,
    isActive: true,
    role: UserRole.USER,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastLoginAt: new Date('2024-01-20'),
  },
  {
    id: 'user-2',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    displayName: 'Jane Smith',
    passwordHash: 'hashed_password_2',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    bio: 'Event organizer and community leader',
    phoneNumber: '+1234567891',
    isEmailVerified: true,
    isActive: true,
    role: UserRole.ORGANIZER,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-19'),
    lastLoginAt: new Date('2024-01-19'),
  },
  {
    id: 'user-3',
    email: 'admin@community.com',
    username: 'admin',
    displayName: 'Admin User',
    passwordHash: 'hashed_password_3',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    isEmailVerified: true,
    isActive: true,
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-18'),
    lastLoginAt: new Date('2024-01-18'),
  },
];

// Mock Organizations
export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Green Earth Initiative',
    slug: 'green-earth-initiative',
    description: 'Dedicated to environmental conservation and sustainability',
    logoUrl: 'https://via.placeholder.com/150',
    coverImageUrl: 'https://via.placeholder.com/800x200',
    websiteUrl: 'https://greenearth.example.com',
    contactEmail: 'contact@greenearth.example.com',
    isPublic: true,
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    ownerId: 'user-2',
  },
  {
    id: 'org-2',
    name: 'Community Food Bank',
    slug: 'community-food-bank',
    description: 'Helping feed families in need',
    logoUrl: 'https://via.placeholder.com/150',
    coverImageUrl: 'https://via.placeholder.com/800x200',
    websiteUrl: 'https://foodbank.example.com',
    contactEmail: 'info@foodbank.example.com',
    isPublic: true,
    isVerified: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    ownerId: 'user-2',
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Beach Cleanup Day',
    description: 'Join us for a community beach cleanup to help protect our oceans',
    slug: 'beach-cleanup-day',
    startDate: new Date('2024-02-15T09:00:00'),
    endDate: new Date('2024-02-15T15:00:00'),
    location: 'Sunset Beach, CA',
    locationUrl: 'https://maps.example.com/sunset-beach',
    coverImageUrl: 'https://via.placeholder.com/800x400',
    isPublic: true,
    isOnline: false,
    maxAttendees: 50,
    registrationRequired: true,
    registrationDeadline: new Date('2024-02-10T23:59:59'),
    status: EventStatus.PUBLISHED,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    organizerId: 'user-2',
    organizationId: 'org-1',
  },
  {
    id: 'event-2',
    title: 'Food Distribution Drive',
    description: 'Help distribute food to families in need',
    slug: 'food-distribution-drive',
    startDate: new Date('2024-02-20T10:00:00'),
    endDate: new Date('2024-02-20T14:00:00'),
    location: 'Community Center, Main St',
    locationUrl: 'https://maps.example.com/community-center',
    coverImageUrl: 'https://via.placeholder.com/800x400',
    isPublic: true,
    isOnline: false,
    maxAttendees: 30,
    registrationRequired: true,
    registrationDeadline: new Date('2024-02-18T23:59:59'),
    status: EventStatus.PUBLISHED,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    organizerId: 'user-2',
    organizationId: 'org-2',
  },
  {
    id: 'event-3',
    title: 'Virtual Volunteer Orientation',
    description: 'Online orientation for new volunteers',
    slug: 'virtual-volunteer-orientation',
    startDate: new Date('2024-02-05T18:00:00'),
    endDate: new Date('2024-02-05T19:30:00'),
    location: 'Online',
    isPublic: true,
    isOnline: true,
    maxAttendees: 100,
    registrationRequired: true,
    status: EventStatus.PUBLISHED,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    organizerId: 'user-2',
    organizationId: 'org-1',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    content: 'Thank you for volunteering!',
    messageType: MessageType.DIRECT,
    isRead: false,
    isEdited: false,
    createdAt: new Date('2024-01-21T10:00:00'),
    updatedAt: new Date('2024-01-21T10:00:00'),
    senderId: 'user-2',
    recipientId: 'user-1',
    eventId: 'event-1',
  },
  {
    id: 'msg-2',
    content: 'Welcome to our community!',
    messageType: MessageType.ANNOUNCEMENT,
    isRead: true,
    isEdited: false,
    createdAt: new Date('2024-01-20T09:00:00'),
    updatedAt: new Date('2024-01-20T09:00:00'),
    readAt: new Date('2024-01-20T09:30:00'),
    senderId: 'user-2',
    organizationId: 'org-1',
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Volunteer',
    description: 'Completed your first volunteer event',
    iconUrl: 'https://via.placeholder.com/64',
    category: BadgeCategory.VOLUNTEERING,
    rarity: BadgeRarity.COMMON,
    createdAt: new Date('2024-01-15'),
    userId: 'user-1',
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: 'badge-2',
    name: 'Community Champion',
    description: 'Attended 10+ events',
    iconUrl: 'https://via.placeholder.com/64',
    category: BadgeCategory.COMMUNITY,
    rarity: BadgeRarity.RARE,
    createdAt: new Date('2024-01-18'),
    userId: 'user-1',
    earnedAt: new Date('2024-01-18'),
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    name: 'Getting Started',
    description: 'Attended your first event',
    iconUrl: 'https://via.placeholder.com/64',
    pointsReward: 100,
    category: AchievementCategory.FIRST_EVENT,
    createdAt: new Date('2024-01-15'),
    userId: 'user-1',
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: 'ach-2',
    name: 'Dedicated Volunteer',
    description: 'Volunteered 50+ hours',
    iconUrl: 'https://via.placeholder.com/64',
    pointsReward: 500,
    category: AchievementCategory.VOLUNTEER_HOURS,
    createdAt: new Date('2024-01-20'),
    userId: 'user-1',
    earnedAt: new Date('2024-01-20'),
  },
];

// Mock Event Applications
export const mockEventApplications: EventApplication[] = [
  {
    id: 'app-1',
    status: ApplicationStatus.APPROVED,
    appliedAt: new Date('2024-01-21'),
    reviewedAt: new Date('2024-01-22'),
    userId: 'user-1',
    eventId: 'event-1',
  },
  {
    id: 'app-2',
    status: ApplicationStatus.PENDING,
    appliedAt: new Date('2024-01-23'),
    userId: 'user-1',
    eventId: 'event-2',
  },
];

// Mock Attendances
export const mockAttendances: Attendance[] = [
  {
    id: 'att-1',
    status: AttendanceStatus.CHECKED_OUT,
    checkedInAt: new Date('2024-01-15T09:00:00'),
    checkedOutAt: new Date('2024-01-15T15:00:00'),
    hoursVolunteered: 6,
    verified: true,
    verifiedAt: new Date('2024-01-15T15:30:00'),
    createdAt: new Date('2024-01-15'),
    userId: 'user-1',
    eventId: 'event-1',
  },
];

// Mock Gamification Stats
export const mockGamificationStats: GamificationStats[] = [
  {
    userId: 'user-1',
    totalPoints: 1500,
    currentLevel: 5,
    totalBadges: 2,
    totalAchievements: 2,
    totalEventsAttended: 8,
    totalHoursVolunteered: 45,
    currentStreak: 3,
    longestStreak: 5,
    lastActivityAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    userId: 'user-2',
    totalPoints: 3200,
    currentLevel: 8,
    totalBadges: 5,
    totalAchievements: 4,
    totalEventsAttended: 25,
    totalHoursVolunteered: 120,
    currentStreak: 7,
    longestStreak: 10,
    lastActivityAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
];

