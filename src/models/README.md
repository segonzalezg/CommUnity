# Data Models

This directory contains TypeScript interfaces for all data models in the CommUnity platform.

## Models

- **User** - User accounts and profiles
- **Organization** - Organizations and groups
- **Event** - Events and gatherings
- **Message** - Messages and communications
- **Badge** - Badges that users can earn
- **Achievement** - Achievements that users can unlock

## Usage

Import models from the index file:

```typescript
import { User, Event, Organization, Message, Badge, Achievement } from '@/models';
```

Or import specific models:

```typescript
import { User, UserRole } from '@/models/User';
import { Event, EventStatus } from '@/models/Event';
```

## Documentation

For complete documentation including field definitions, relationships, and database migration notes, see:
- [`/docs/data_model.md`](../../docs/data_model.md)

## Database Schema

The Prisma schema placeholder is located at:
- [`/prisma/schema.prisma`](../../prisma/schema.prisma)

## Notes

- All models use `string` for IDs (UUIDs in database)
- All timestamps use `Date` type
- Optional fields are marked with `?`
- Relationships are optional in interfaces (populated when needed via joins)
- Enums are exported from each model file

