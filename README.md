# CommUnity - Volunteer & Gamification Platform

A full-stack web application for connecting volunteers with organizations through a gamified volunteering platform.

## Overview

CommUnity is a volunteering platform that gamifies the volunteer experience, helping organizations find the right volunteers and helping volunteers discover opportunities that match their skills, availability, and interests.

**System Type**: Full-stack web application  
**Architecture**: Layered architecture (Frontend → API → Business Logic → Data Access → Database)  
**Database**: PostgreSQL with Prisma ORM  
**Frontend**: Next.js 14 + TypeScript + TailwindCSS  
**Backend**: Node.js + Express/Fastify + TypeScript  

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CommUnity
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   
   Frontend: Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```
   
   Backend: Create `backend/.env`:
   ```env
   PORT=3001
   DATABASE_URL=your_database_url
   ```

4. **Run the application**
   
   In separate terminals:
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   ```

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`

## Frontend

A modern Next.js 14 frontend application for the CommUnity volunteer and gamification platform.

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Code Quality**: ESLint, Prettier

### Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Frontend Project Structure

```
frontend/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── events/            # Event discovery pages
│   ├── home/              # Home dashboard
│   ├── leaderboards/      # Leaderboards page
│   ├── messages/          # Messaging UI
│   ├── org/               # Organization pages
│   └── profile/           # User profile page
├── components/            # Reusable React components
│   ├── gamification/     # XP bar, badges, achievements
│   ├── layout/           # Layout components (Navbar, Layout)
│   └── ui/               # UI primitives (Button, Card, Input)
├── lib/                  # Utility functions and services
│   ├── api/              # API client and services
│   ├── theme.ts          # Theme configuration
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
└── docs/                 # Documentation
```

### Frontend Features

#### ✅ Completed Features

1. **Authentication**
   - Login page (`/auth/login`)
   - Signup page (`/auth/signup`)

2. **Core Pages**
   - Home dashboard (`/home`) with XP progress and upcoming events
   - Event discovery (`/events`) with search and filters
   - Event detail page (`/events/[id]`)
   - User profile (`/profile`) with skills, availability, preferences

3. **Organization UI**
   - Organization dashboard (`/org/dashboard`)
   - Event management (`/org/events`)
   - Event creation form (`/org/events/create`)

4. **Gamification**
   - XP bar component
   - Badge list component
   - Achievement popup component
   - Leaderboards page (`/leaderboards`)

5. **Messaging**
   - Chat panel with conversation list
   - Message input and display
   - Real-time message interface

### Frontend Component Usage

#### Button Component

```tsx
import { Button } from "@/components/ui/Button";

// As a button
<Button variant="primary" size="md">Click me</Button>

// As a link
<Button href="/events" variant="outline">View Events</Button>
```

#### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

#### XP Bar Component

```tsx
import { XPBar } from "@/components/gamification/XPBar";

<XPBar currentXP={1250} level={5} />
```

## Backend

Backend API server for the CommUnity volunteering platform.

### Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
npm start
```

### API Endpoints

#### Health Check
- `GET /health` - Server health status

#### Matching Engine
- `GET /matching/suggest?userId=<userId>&limit=<limit>` - Get event suggestions for a user
- `GET /matching/suggest/:userId?limit=<limit>` - Alternative endpoint with path parameter

#### Example Request
```bash
curl http://localhost:3001/matching/suggest?userId=user1&limit=5
```

### Matching Algorithm

The matching engine uses a weighted scoring system:

- **Skill Match** (50%): Percentage of required skills that the user has
- **Availability Match** (20%): How well the event time fits user's availability
- **Distance Score** (20%): Proximity of event to user's location
- **Cause Affinity** (10%): Alignment between event cause and user preferences

### Mock Data

The service currently uses mock data for users and events. Available user IDs:
- `user1` - Alice Johnson (Education focus)
- `user2` - Bob Smith (Food service)
- `user3` - Carol Williams (Healthcare)
- `user4` - David Brown (Construction)
- `user5` - Emma Davis (Marketing/Design)

For complete API endpoint documentation, see `docs/api_routes.md`.

## Documentation

The `docs/` directory contains comprehensive project documentation:

### Core Documents

1. **architecture.md**
   - High-level system architecture
   - Technology stack decisions
   - Core modules and separation of concerns
   - Security and scalability considerations
   - Complete folder structure definition

2. **data_model.md**
   - Complete data model definitions
   - Entity relationships
   - All database models (18 models)
   - Model fields and relationships
   - Prisma schema reference

3. **api_routes.md**
   - Complete API endpoint documentation
   - Request/response formats
   - Authentication requirements
   - Error handling standards
   - Mock data examples

## Development

### Code Style

- ESLint is configured with Next.js and Prettier
- Prettier is configured for consistent code formatting
- TypeScript throughout the stack for type safety

### Adding New Pages (Frontend)

1. Create a new file in the `app/` directory
2. Use the `Layout` component for consistent page structure
3. Follow the existing patterns for API calls and state management

### Adding New Components (Frontend)

1. Create component files in `components/` directory
2. Use TypeScript for type safety
3. Follow the existing component patterns
4. Export from appropriate index files if needed

## Key Architectural Principles

1. **Separation of Concerns**: Clear boundaries between frontend, backend, and shared code
2. **Type Safety**: TypeScript throughout the stack
3. **RESTful API**: Standard REST endpoints with JSON responses
4. **Scalability**: Structure supports growth and feature additions
5. **Security**: Authentication, authorization, and data validation at every layer
6. **Maintainability**: Clear folder structure and documentation

## Next Steps

- [ ] Connect all pages to real backend API
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add form validation
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Optimize images and assets
- [ ] Add PWA support
- [ ] Set up database migrations
- [ ] Implement authentication system
- [ ] Deploy to production

## License

Part of the CommUnity project.

