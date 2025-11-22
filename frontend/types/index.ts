/**
 * Shared TypeScript types for CommUnity frontend
 */

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  ORGANIZER = "ORGANIZER",
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  xp?: number;
  level?: number;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  isPublic: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  maxVolunteers?: number;
  currentVolunteers: number;
  imageUrl?: string;
  category: string;
  tags: string[];
  organizationId: string;
  organization?: Organization;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  badge?: Badge;
  earnedAt: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sender?: User;
  receiver?: User;
  createdAt: string;
  readAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  user: User;
  xp: number;
  level: number;
  rank: number;
  badgesCount: number;
}

