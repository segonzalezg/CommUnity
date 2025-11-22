# Data Model Documentation

This document describes all data models, their fields, types, relationships, and purpose within the CommUnity platform.

## Table of Contents

- [User](#user)
- [Organization](#organization)
- [Event](#event)
- [Message](#message)
- [Badge](#badge)
- [Achievement](#achievement)
- [Relationships Overview](#relationships-overview)
- [Future Database Migration Notes](#future-database-migration-notes)

---

## User

Represents a user account in the CommUnity platform.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `email` | `string` | Yes | User's email address (unique) |
| `username` | `string` | Yes | Unique username |
| `displayName` | `string` | Yes | Display name shown to other users |
| `passwordHash` | `string` | Yes | Hashed password (never store plain text) |
| `avatarUrl` | `string?` | No | URL to user's avatar image |
| `bio` | `string?` | No | User's biography/description |
| `phoneNumber` | `string?` | No | User's phone number (optional) |
| `isEmailVerified` | `boolean` | Yes | Whether email has been verified |
| `isActive` | `boolean` | Yes | Whether account is active (not suspended/deleted) |
| `role` | `UserRole` | Yes | User's role in the system |
| `createdAt` | `Date` | Yes | Account creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |
| `lastLoginAt` | `Date?` | No | Last login timestamp |

### UserRole Enum

- `USER` - Standard user
- `ADMIN` - Platform administrator
- `MODERATOR` - Community moderator
- `ORGANIZER` - Event organizer

### Relationships

- **Many-to-Many** with `Organization` (via join table)
- **Many-to-Many** with `Event` (attendance)
- **One-to-Many** with `Message` (as sender)
- **One-to-Many** with `Message` (as recipient)
- **Many-to-Many** with `Badge` (earned badges)
- **Many-to-Many** with `Achievement` (unlocked achievements)

---

## Organization

Represents an organization or group within the platform.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `name` | `string` | Yes | Organization name |
| `slug` | `string` | Yes | URL-friendly identifier (unique) |
| `description` | `string?` | No | Organization description |
| `logoUrl` | `string?` | No | URL to organization logo |
| `coverImageUrl` | `string?` | No | URL to cover image |
| `websiteUrl` | `string?` | No | External website URL |
| `contactEmail` | `string?` | No | Contact email address |
| `isPublic` | `boolean` | Yes | Whether organization is publicly visible |
| `isVerified` | `boolean` | Yes | Whether organization is verified |
| `createdAt` | `Date` | Yes | Creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |
| `ownerId` | `string` | Yes | ID of the user who owns the organization |

### Relationships

- **Many-to-One** with `User` (owner)
- **Many-to-Many** with `User` (members, via join table)
- **One-to-Many** with `Event` (events hosted by organization)
- **One-to-Many** with `Message` (messages in organization)

---

## Event

Represents an event that can be created and attended by users.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `title` | `string` | Yes | Event title |
| `description` | `string?` | No | Event description |
| `slug` | `string` | Yes | URL-friendly identifier (unique) |
| `startDate` | `Date` | Yes | Event start date and time |
| `endDate` | `Date` | Yes | Event end date and time |
| `location` | `string?` | No | Physical location (if not online) |
| `locationUrl` | `string?` | No | URL to location (maps, virtual meeting, etc.) |
| `coverImageUrl` | `string?` | No | URL to event cover image |
| `isPublic` | `boolean` | Yes | Whether event is publicly visible |
| `isOnline` | `boolean` | Yes | Whether event is online/virtual |
| `maxAttendees` | `number?` | No | Maximum number of attendees (null = unlimited) |
| `registrationRequired` | `boolean` | Yes | Whether registration is required |
| `registrationDeadline` | `Date?` | No | Registration deadline |
| `status` | `EventStatus` | Yes | Current status of the event |
| `createdAt` | `Date` | Yes | Creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |
| `organizerId` | `string` | Yes | ID of the user organizing the event |
| `organizationId` | `string?` | No | ID of the organization hosting the event (optional) |

### EventStatus Enum

- `DRAFT` - Event is being created/edited
- `PUBLISHED` - Event is published and visible
- `ONGOING` - Event is currently happening
- `COMPLETED` - Event has ended
- `CANCELLED` - Event was cancelled

### Relationships

- **Many-to-One** with `User` (organizer)
- **Many-to-One** with `Organization` (optional host organization)
- **Many-to-Many** with `User` (attendees, via join table)
- **One-to-Many** with `Message` (messages related to event)

---

## Message

Represents a message sent between users, or within events/organizations.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `content` | `string` | Yes | Message content/text |
| `messageType` | `MessageType` | Yes | Type of message |
| `isRead` | `boolean` | Yes | Whether message has been read |
| `isEdited` | `boolean` | Yes | Whether message has been edited |
| `createdAt` | `Date` | Yes | Creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |
| `readAt` | `Date?` | No | Timestamp when message was read |
| `senderId` | `string` | Yes | ID of the user who sent the message |
| `recipientId` | `string?` | No | ID of the recipient (for direct messages) |
| `eventId` | `string?` | No | ID of the event (for event messages) |
| `organizationId` | `string?` | No | ID of the organization (for org messages) |
| `parentMessageId` | `string?` | No | ID of parent message (for replies) |

### MessageType Enum

- `DIRECT` - Direct message between users
- `EVENT` - Message in an event context
- `ORGANIZATION` - Message in an organization context
- `ANNOUNCEMENT` - System or organization announcement

### Relationships

- **Many-to-One** with `User` (sender)
- **Many-to-One** with `User` (recipient, optional for direct messages)
- **Many-to-One** with `Event` (optional, for event-related messages)
- **Many-to-One** with `Organization` (optional, for org-related messages)
- **Many-to-One** with `Message` (parent message, for replies/threading)
- **One-to-Many** with `Message` (replies to this message)

---

## Badge

Represents a badge that can be earned by users for various accomplishments.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `name` | `string` | Yes | Badge name |
| `description` | `string?` | No | Badge description |
| `iconUrl` | `string?` | No | URL to badge icon/image |
| `category` | `BadgeCategory` | Yes | Badge category |
| `rarity` | `BadgeRarity` | Yes | Badge rarity level |
| `isActive` | `boolean` | Yes | Whether badge is currently active |
| `createdAt` | `Date` | Yes | Creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |

### BadgeCategory Enum

- `PARTICIPATION` - For participating in events
- `ACHIEVEMENT` - For achieving milestones
- `COMMUNITY` - For community contributions
- `EVENT` - For event-related accomplishments
- `SOCIAL` - For social interactions

### BadgeRarity Enum

- `COMMON` - Common badge
- `UNCOMMON` - Uncommon badge
- `RARE` - Rare badge
- `EPIC` - Epic badge
- `LEGENDARY` - Legendary badge

### Relationships

- **Many-to-Many** with `User` (users who have earned the badge, via join table)

---

## Achievement

Represents an achievement that can be unlocked by users.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `name` | `string` | Yes | Achievement name |
| `description` | `string?` | No | Achievement description |
| `iconUrl` | `string?` | No | URL to achievement icon/image |
| `points` | `number` | Yes | Points awarded for unlocking this achievement |
| `category` | `AchievementCategory` | Yes | Achievement category |
| `requirements` | `string?` | No | Description or JSON of requirements to unlock |
| `isActive` | `boolean` | Yes | Whether achievement is currently active |
| `createdAt` | `Date` | Yes | Creation timestamp |
| `updatedAt` | `Date` | Yes | Last update timestamp |

### AchievementCategory Enum

- `EVENTS` - Event-related achievements
- `MESSAGING` - Messaging-related achievements
- `ORGANIZATIONS` - Organization-related achievements
- `SOCIAL` - Social interaction achievements
- `MILESTONE` - Milestone achievements

### Relationships

- **Many-to-Many** with `User` (users who have unlocked the achievement, via join table)

---

## Relationships Overview

### Entity Relationship Diagram (Conceptual)

```
User
├── 1:N → Organization (owner)
├── M:N → Organization (members)
├── 1:N → Event (organizer)
├── M:N → Event (attendees)
├── 1:N → Message (sender)
├── 1:N → Message (recipient)
├── M:N → Badge (earned badges)
└── M:N → Achievement (unlocked achievements)

Organization
├── N:1 → User (owner)
├── M:N → User (members)
├── 1:N → Event (hosted events)
└── 1:N → Message (org messages)

Event
├── N:1 → User (organizer)
├── N:1 → Organization (host, optional)
├── M:N → User (attendees)
└── 1:N → Message (event messages)

Message
├── N:1 → User (sender)
├── N:1 → User (recipient, optional)
├── N:1 → Event (event context, optional)
├── N:1 → Organization (org context, optional)
├── N:1 → Message (parent message, optional)
└── 1:N → Message (replies)

Badge
└── M:N → User (earned by)

Achievement
└── M:N → User (unlocked by)
```

### Join Tables Required (for Many-to-Many relationships)

1. **UserOrganization** - Links users to organizations (membership)
   - `userId` (FK)
   - `organizationId` (FK)
   - `role` (member role in organization)
   - `joinedAt` (timestamp)

2. **UserEvent** - Links users to events (attendance)
   - `userId` (FK)
   - `eventId` (FK)
   - `status` (registered, attended, cancelled)
   - `registeredAt` (timestamp)

3. **UserBadge** - Links users to badges (earned badges)
   - `userId` (FK)
   - `badgeId` (FK)
   - `earnedAt` (timestamp)

4. **UserAchievement** - Links users to achievements (unlocked achievements)
   - `userId` (FK)
   - `achievementId` (FK)
   - `unlockedAt` (timestamp)
   - `pointsAwarded` (points at time of unlock)

---

## Future Database Migration Notes

### Prisma Schema Considerations

When implementing the Prisma schema, consider:

1. **Indexes**: Add indexes on frequently queried fields:
   - `User.email`, `User.username` (unique indexes)
   - `Organization.slug` (unique index)
   - `Event.slug` (unique index)
   - `Event.startDate`, `Event.endDate` (for date range queries)
   - `Message.createdAt` (for chronological ordering)
   - Foreign keys (automatic in Prisma)

2. **Constraints**:
   - Unique constraints on `email`, `username`, `slug` fields
   - Check constraints for date ranges (endDate > startDate)
   - Enum validation

3. **Default Values**:
   - `isEmailVerified`: `false`
   - `isActive`: `true`
   - `isPublic`: `true` (for organizations/events)
   - `status`: `DRAFT` (for events)
   - `isRead`: `false` (for messages)
   - `isEdited`: `false` (for messages)

4. **Cascading Deletes**:
   - Consider soft deletes vs hard deletes
   - Define cascade behavior for related records

5. **Timestamps**:
   - All models should have `createdAt` and `updatedAt`
   - Use Prisma's `@updatedAt` directive for automatic updates

6. **Data Types**:
   - Use `String` for UUIDs (with `@default(uuid())`)
   - Use `DateTime` for dates
   - Use `Boolean` for flags
   - Use `Int` for numbers
   - Use `String?` for optional text fields

### Migration Steps

1. Create base models with core fields
2. Add relationships (foreign keys)
3. Create join tables for many-to-many relationships
4. Add indexes for performance
5. Add constraints and validations
6. Seed initial data (badges, achievements, admin user)

---

## Notes for Backend Engineer

- All models use `string` for IDs (will be UUIDs in database)
- All timestamps use `Date` type
- Optional fields are marked with `?` in TypeScript
- Relationships are optional in interfaces (populated when needed)
- Enums are defined in each model file and exported
- Use the `src/models/index.ts` file for importing all models

---

## Notes for System Architect

- Models are designed to support:
  - Multi-tenancy (organizations)
  - Event management
  - Social features (messaging, badges, achievements)
  - Role-based access control (user roles)
  - Public/private visibility controls
  - Soft delete capability (isActive flags)

- Future considerations:
  - Add `deletedAt` for soft deletes if needed
  - Consider adding audit fields (createdBy, updatedBy)
  - May need additional fields for analytics
  - Consider adding notification preferences to User model
