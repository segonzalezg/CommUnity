/**
 * API service functions for CommUnity
 * These functions connect to the backend API endpoints
 */

import { apiClient } from "../api";
import {
  User,
  Event,
  Organization,
  Badge,
  Achievement,
  LeaderboardEntry,
  Message,
} from "@/types";

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<{ token: string; user: User }>(
      "/auth/login",
      { email, password }
    );
    if (typeof window !== "undefined" && response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    return response;
  },

  signup: async (data: {
    email: string;
    username: string;
    displayName: string;
    password: string;
  }) => {
    const response = await apiClient.post<{ token: string; user: User }>(
      "/auth/signup",
      data
    );
    if (typeof window !== "undefined" && response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    return response;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
};

// User Services
export const userService = {
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/users/me");
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.patch<User>("/users/me", data);
  },

  getUser: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },
};

// Event Services
export const eventService = {
  getEvents: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Event[]> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<Event[]>(`/events${query ? `?${query}` : ""}`);
  },

  getEvent: async (id: string): Promise<Event> => {
    return apiClient.get<Event>(`/events/${id}`);
  },

  createEvent: async (data: Partial<Event>): Promise<Event> => {
    return apiClient.post<Event>("/events", data);
  },

  updateEvent: async (id: string, data: Partial<Event>): Promise<Event> => {
    return apiClient.patch<Event>(`/events/${id}`, data);
  },

  deleteEvent: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/events/${id}`);
  },

  registerForEvent: async (eventId: string): Promise<void> => {
    return apiClient.post<void>(`/events/${eventId}/register`, {});
  },

  unregisterFromEvent: async (eventId: string): Promise<void> => {
    return apiClient.delete<void>(`/events/${eventId}/register`);
  },
};

// Organization Services
export const organizationService = {
  getOrganizations: async (): Promise<Organization[]> => {
    return apiClient.get<Organization[]>("/organizations");
  },

  getOrganization: async (id: string): Promise<Organization> => {
    return apiClient.get<Organization>(`/organizations/${id}`);
  },

  createOrganization: async (
    data: Partial<Organization>
  ): Promise<Organization> => {
    return apiClient.post<Organization>("/organizations", data);
  },

  updateOrganization: async (
    id: string,
    data: Partial<Organization>
  ): Promise<Organization> => {
    return apiClient.patch<Organization>(`/organizations/${id}`, data);
  },

  getOrganizationEvents: async (
    organizationId: string
  ): Promise<Event[]> => {
    return apiClient.get<Event[]>(
      `/organizations/${organizationId}/events`
    );
  },
};

// Gamification Services
export const gamificationService = {
  getBadges: async (): Promise<Badge[]> => {
    return apiClient.get<Badge[]>("/badges");
  },

  getUserAchievements: async (userId?: string): Promise<Achievement[]> => {
    const endpoint = userId
      ? `/users/${userId}/achievements`
      : "/users/me/achievements";
    return apiClient.get<Achievement[]>(endpoint);
  },

  getLeaderboard: async (params?: {
    period?: "all" | "month" | "week";
  }): Promise<LeaderboardEntry[]> => {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append("period", params.period);
    const query = queryParams.toString();
    return apiClient.get<LeaderboardEntry[]>(
      `/leaderboard${query ? `?${query}` : ""}`
    );
  },
};

// Messaging Services
export const messagingService = {
  getConversations: async (): Promise<
    Array<{ user: User; lastMessage: Message }>
  > => {
    return apiClient.get<Array<{ user: User; lastMessage: Message }>>(
      "/messages/conversations"
    );
  },

  getMessages: async (userId: string): Promise<Message[]> => {
    return apiClient.get<Message[]>(`/messages/conversations/${userId}`);
  },

  sendMessage: async (
    receiverId: string,
    content: string
  ): Promise<Message> => {
    return apiClient.post<Message>("/messages", {
      receiverId,
      content,
    });
  },

  markAsRead: async (messageId: string): Promise<void> => {
    return apiClient.patch<void>(`/messages/${messageId}/read`, {});
  },
};

