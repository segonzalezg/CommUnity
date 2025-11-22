# API Endpoints Documentation

This document lists all the API endpoints that the frontend expects from the backend.

## Base URL
```
http://localhost:3001/api
```

## Authentication

### POST /auth/login
Login a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": { /* User object */ }
}
```

### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "displayName": "John Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": { /* User object */ }
}
```

## Users

### GET /users/me
Get current authenticated user.

**Response:**
```json
{ /* User object */ }
```

### PATCH /users/me
Update current user's profile.

**Request Body:**
```json
{
  "displayName": "John Doe",
  "bio": "Updated bio",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{ /* Updated User object */ }
```

### GET /users/:id
Get user by ID.

**Response:**
```json
{ /* User object */ }
```

## Events

### GET /events
Get list of events with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search in title, description, tags
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response:**
```json
[
  { /* Event object */ },
  { /* Event object */ }
]
```

### GET /events/:id
Get event by ID.

**Response:**
```json
{ /* Event object */ }
```

### POST /events
Create a new event (requires ORGANIZER role).

**Request Body:**
```json
{
  "title": "Event Title",
  "description": "Event description",
  "startDate": "2024-01-01T10:00:00Z",
  "endDate": "2024-01-01T14:00:00Z",
  "location": "Event Location",
  "maxVolunteers": 20,
  "category": "Environment",
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{ /* Event object */ }
```

### PATCH /events/:id
Update an event (requires ORGANIZER role).

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:**
```json
{ /* Updated Event object */ }
```

### DELETE /events/:id
Delete an event (requires ORGANIZER role).

**Response:**
```json
{ "message": "Event deleted successfully" }
```

### POST /events/:id/register
Register current user for an event.

**Response:**
```json
{ "message": "Registered successfully" }
```

### DELETE /events/:id/register
Unregister current user from an event.

**Response:**
```json
{ "message": "Unregistered successfully" }
```

## Organizations

### GET /organizations
Get list of organizations.

**Response:**
```json
[
  { /* Organization object */ },
  { /* Organization object */ }
]
```

### GET /organizations/:id
Get organization by ID.

**Response:**
```json
{ /* Organization object */ }
```

### POST /organizations
Create a new organization.

**Request Body:**
```json
{
  "name": "Organization Name",
  "slug": "organization-slug",
  "description": "Organization description"
}
```

**Response:**
```json
{ /* Organization object */ }
```

### PATCH /organizations/:id
Update an organization.

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Response:**
```json
{ /* Updated Organization object */ }
```

### GET /organizations/:id/events
Get events for an organization.

**Response:**
```json
[
  { /* Event object */ },
  { /* Event object */ }
]
```

## Gamification

### GET /badges
Get all available badges.

**Response:**
```json
[
  { /* Badge object */ },
  { /* Badge object */ }
]
```

### GET /users/me/achievements
Get current user's achievements.

**Response:**
```json
[
  { /* Achievement object */ },
  { /* Achievement object */ }
]
```

### GET /users/:id/achievements
Get achievements for a specific user.

**Response:**
```json
[
  { /* Achievement object */ },
  { /* Achievement object */ }
]
```

### GET /leaderboard
Get leaderboard entries.

**Query Parameters:**
- `period` (optional): "all" | "month" | "week"

**Response:**
```json
[
  { /* LeaderboardEntry object */ },
  { /* LeaderboardEntry object */ }
]
```

## Messaging

### GET /messages/conversations
Get all conversations for current user.

**Response:**
```json
[
  {
    "user": { /* User object */ },
    "lastMessage": { /* Message object */ }
  }
]
```

### GET /messages/conversations/:userId
Get messages in a conversation with a specific user.

**Response:**
```json
[
  { /* Message object */ },
  { /* Message object */ }
]
```

### POST /messages
Send a message.

**Request Body:**
```json
{
  "receiverId": "user_id",
  "content": "Message content"
}
```

**Response:**
```json
{ /* Message object */ }
```

### PATCH /messages/:id/read
Mark a message as read.

**Response:**
```json
{ "message": "Message marked as read" }
```

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: "USER" | "ADMIN" | "MODERATOR" | "ORGANIZER";
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  xp?: number;
  level?: number;
}
```

### Event
```typescript
{
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
```

### Organization
```typescript
{
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
```

### Badge
```typescript
{
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}
```

### Achievement
```typescript
{
  id: string;
  userId: string;
  badgeId: string;
  badge?: Badge;
  earnedAt: string;
}
```

### LeaderboardEntry
```typescript
{
  userId: string;
  user: User;
  xp: number;
  level: number;
  rank: number;
  badgesCount: number;
}
```

### Message
```typescript
{
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sender?: User;
  receiver?: User;
  createdAt: string;
  readAt?: string;
}
```

