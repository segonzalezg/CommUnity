# CommUnity API Routes Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. In production, JWT-based authentication will be implemented.

---

## Users

### Get All Users
```
GET /api/users
```
Query Parameters:
- `search` (string): Search users by name, username, email, or bio
- `role` (string): Filter by role (USER, ADMIN, MODERATOR, ORGANIZER)

### Get User by ID
```
GET /api/users/:id
```

### Create User
```
POST /api/users
```
Body:
```json
{
  "email": "user@example.com",
  "username": "username",
  "displayName": "Display Name",
  "passwordHash": "hashed_password",
  "role": "USER",
  "bio": "Optional bio",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### Update User
```
PUT /api/users/:id
```
Body: Partial user object with fields to update

### Delete User
```
DELETE /api/users/:id
```

---

## Events

### Get All Events
```
GET /api/events
```
Query Parameters:
- `search` (string): Search events by title, description, or location
- `organizer` (string): Filter by organizer ID
- `organization` (string): Filter by organization ID
- `public` (boolean): Filter public events only

### Get Event by ID
```
GET /api/events/:id
```

### Create Event
```
POST /api/events
```
Body:
```json
{
  "title": "Event Title",
  "description": "Event description",
  "slug": "event-slug",
  "startDate": "2024-02-15T09:00:00Z",
  "endDate": "2024-02-15T15:00:00Z",
  "location": "Event Location",
  "isPublic": true,
  "isOnline": false,
  "maxAttendees": 50,
  "registrationRequired": true,
  "organizerId": "user-1",
  "organizationId": "org-1"
}
```

### Update Event
```
PUT /api/events/:id
```
Body: Partial event object with fields to update

### Delete Event
```
DELETE /api/events/:id
```

### Apply to Event
```
POST /api/events/:id/apply
```
Body:
```json
{
  "userId": "user-1",
  "notes": "Optional application notes"
}
```

### Get Event Applications
```
GET /api/events/:id/applications
```

### Check In to Event
```
POST /api/events/:id/checkin
```
Body:
```json
{
  "userId": "user-1"
}
```

### Check Out from Event
```
POST /api/events/:id/checkout
```
Body:
```json
{
  "userId": "user-1",
  "hoursVolunteered": 6
}
```

### Get Event Attendance
```
GET /api/events/:id/attendance
```

### Get Similar Events
```
GET /api/events/:id/similar
```
Query Parameters:
- `limit` (number): Maximum number of similar events to return (default: 5)

---

## Organizations

### Get All Organizations
```
GET /api/organizations
```
Query Parameters:
- `search` (string): Search organizations by name or description
- `owner` (string): Filter by owner ID
- `public` (boolean): Filter public organizations only

### Get Organization by ID
```
GET /api/organizations/:id
```

### Get Organization by Slug
```
GET /api/organizations/slug/:slug
```

### Create Organization
```
POST /api/organizations
```
Body:
```json
{
  "name": "Organization Name",
  "slug": "organization-slug",
  "description": "Organization description",
  "ownerId": "user-1",
  "isPublic": true
}
```

### Update Organization
```
PUT /api/organizations/:id
```
Body: Partial organization object with fields to update

### Delete Organization
```
DELETE /api/organizations/:id
```

---

## Matching

### Suggest Events
```
POST /api/matching/suggest
```
Body:
```json
{
  "userId": "user-1",
  "location": "Optional location filter",
  "interests": ["volunteering", "environment"],
  "maxDistance": 50,
  "dateRange": {
    "start": "2024-02-01T00:00:00Z",
    "end": "2024-03-01T00:00:00Z"
  },
  "limit": 10
}
```

Response:
```json
[
  {
    "event": { /* Event object */ },
    "score": 85,
    "reasons": ["Upcoming event", "Verified organization"]
  }
]
```

---

## Gamification

### Get User Stats
```
GET /api/users/:userId/stats
```

### Get User Badges
```
GET /api/users/:userId/badges
```

### Get User Achievements
```
GET /api/users/:userId/achievements
```

### Get Leaderboard
```
GET /api/gamification/leaderboard
```
Query Parameters:
- `limit` (number): Number of users to return (default: 10)
- `category` (string): Sort by category (points, events, hours, streak)

### Award Points
```
POST /api/gamification/award-points
```
Body:
```json
{
  "userId": "user-1",
  "points": 100,
  "reason": "Event attendance"
}
```

### Award Badge
```
POST /api/gamification/award-badge
```
Body:
```json
{
  "userId": "user-1",
  "name": "Badge Name",
  "description": "Badge description",
  "category": "VOLUNTEERING",
  "rarity": "COMMON",
  "iconUrl": "https://example.com/icon.png"
}
```

### Award Achievement
```
POST /api/gamification/award-achievement
```
Body:
```json
{
  "userId": "user-1",
  "name": "Achievement Name",
  "description": "Achievement description",
  "category": "FIRST_EVENT",
  "pointsReward": 100,
  "iconUrl": "https://example.com/icon.png"
}
```

---

## Messaging

### Get User Messages
```
GET /api/users/:userId/messages
```

### Get Unread Message Count
```
GET /api/users/:userId/messages/unread-count
```

### Mark All Messages as Read
```
PUT /api/users/:userId/messages/read-all
```

### Get Conversation
```
GET /api/conversations/:userId1/:userId2
```

### Get Event Messages
```
GET /api/events/:eventId/messages
```

### Get Organization Messages
```
GET /api/organizations/:organizationId/messages
```

### Send Direct Message
```
POST /api/messages/direct
```
Body:
```json
{
  "senderId": "user-1",
  "recipientId": "user-2",
  "content": "Message content"
}
```

### Send Event Message
```
POST /api/messages/event
```
Body:
```json
{
  "senderId": "user-1",
  "eventId": "event-1",
  "content": "Message content"
}
```

### Send Organization Message
```
POST /api/messages/organization
```
Body:
```json
{
  "senderId": "user-1",
  "organizationId": "org-1",
  "content": "Message content",
  "messageType": "ORGANIZATION"
}
```

### Reply to Message
```
POST /api/messages/:messageId/reply
```
Body:
```json
{
  "senderId": "user-1",
  "content": "Reply content"
}
```

### Mark Message as Read
```
PUT /api/messages/:messageId/read
```
Body:
```json
{
  "userId": "user-1"
}
```

### Edit Message
```
PUT /api/messages/:messageId
```
Body:
```json
{
  "userId": "user-1",
  "content": "Updated message content"
}
```

### Delete Message
```
DELETE /api/messages/:messageId
```
Body:
```json
{
  "userId": "user-1"
}
```

---

## Applications

### Get User Applications
```
GET /api/applications/users/:userId/applications
```

### Update Application Status
```
PUT /api/applications/:id/status
```
Body:
```json
{
  "status": "APPROVED",
  "notes": "Optional notes"
}
```

---

## Attendance

### Get User Attendance
```
GET /api/attendance/users/:userId/attendance
```

### Verify Attendance
```
POST /api/attendance/:id/verify
```

---

## Health Check

### Health Check
```
GET /health
```
Returns server status and timestamp.

---

## Response Format

### Success Response
```json
{
  // Response data
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

**Last Updated**: 2024-01-25  
**API Version**: 1.0.0
