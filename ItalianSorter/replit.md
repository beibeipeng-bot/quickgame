# Gioco di Ordinamento (Italian Sorting Game)

## Overview

This is an educational web application designed to teach students the QuickSort algorithm through an interactive sorting game. Students access the game via a shared link, enter their name, and compete to sort 20 random numbers using the fewest operations in the shortest time. Results are displayed on a live leaderboard that updates every 3 seconds. The application is entirely in Italian and focuses on providing clear visual feedback for learning purposes.

**Status**: ✅ Fully functional with backend integration and live leaderboard

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for component-based UI
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for server state management and automatic refetching
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design system

**Design System:**
- Uses "New York" style from Shadcn with custom color palette
- Inter font for body text, Poppins for headings
- Supports light/dark mode theming
- Educational-focused design inspired by Kahoot, Quizlet, and Duolingo
- Emphasis on clarity, immediate feedback, and distraction-free learning

**Component Structure:**
- `WelcomeScreen`: Name entry and validation
- `CountdownScreen`: 3-2-1 countdown before game starts
- `GameScreen`: Main game interface with number grid and pivot selection
- `NumberGrid`: Interactive grid of 20 numbers for sorting
- `GameStats`: Real-time display of time, operations, and sorting status
- `Leaderboard`: Live-updating ranking display with top 3 highlighting

**State Management:**
- Game flow managed through state machine (`welcome` → `countdown` → `playing` → `leaderboard`)
- React Query handles server state with automatic 3-second polling on leaderboard
- Local component state for game logic (timer, operations count, number array)

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- RESTful API design
- In-memory storage (MemStorage class) for player data
- Structured for easy migration to database (Drizzle ORM configured)

**API Endpoints:**
- `POST /api/submit`: Accepts player submission with name, operations count, and time
  - Validates unique player names
  - Returns 400 error with Italian message for duplicate submissions
  - Returns created player object on success
- `GET /api/ranking-data`: Returns all players sorted by operations (ascending), then time (ascending)
  - Supports automatic polling from frontend
  - Updates every 3 seconds when leaderboard is displayed

**Data Model:**
- Player schema: `id`, `name`, `operations`, `time`
- Validation using Zod schemas from shared types
- Schema defined in `shared/schema.ts` for type safety between client and server

**Storage Strategy:**
- Currently uses in-memory Map for development/testing
- Storage interface (IStorage) abstracts data layer for future database implementation
- Drizzle ORM configured for PostgreSQL migration path

**Game Logic:**
- QuickSort-inspired sorting mechanism
- Players select pivot numbers to partition the array
- Counts total operations (comparisons + swaps)
- Automatic completion detection when array is fully sorted
- Timer runs from game start to completion

### Ranking Algorithm

Players are ranked using a two-tier sorting system:
1. Primary: Fewer total operations (comparisons + swaps)
2. Secondary: Shorter completion time (tiebreaker)

Top 3 players receive visual distinction (red/bold styling).

### Error Handling

**Duplicate Name Submission:**
- Client-side check: Validates against existing players before starting countdown
- Server-side check: Rejects duplicate names with 400 error
- User feedback: Returns player to welcome screen with Italian error message
- Recovery: Player can enter a different name to try again

**Network Errors:**
- Mutation failures display generic retry message in Italian
- Player returned to welcome screen to attempt resubmission

### External Dependencies

**UI Component Libraries:**
- Radix UI (comprehensive set of headless UI primitives for accessibility)
- Shadcn/ui (pre-built components with Tailwind styling)
- Lucide React (icon library)
- cmdk (command palette component)
- Embla Carousel (carousel functionality)
- Vaul (drawer component)

**Data Fetching & State:**
- TanStack React Query (server state management, caching, polling)
- React Hook Form with Zod resolver (form validation)

**Styling:**
- Tailwind CSS (utility-first styling)
- class-variance-authority (component variant management)
- clsx & tailwind-merge (className utilities)

**Development:**
- Vite (build tool with HMR)
- TypeScript (type safety)
- Replit-specific plugins (error overlay, dev banner, cartographer)

**Database (Configured but not yet in use):**
- Drizzle ORM (TypeScript ORM)
- @neondatabase/serverless (PostgreSQL client)
- Drizzle-zod (schema to Zod conversion)

**Utilities:**
- date-fns (date formatting)
- nanoid (ID generation)
- Zod (schema validation)

## Recent Changes (October 2025)

- ✅ Implemented complete backend API with in-memory storage
- ✅ Connected frontend to backend using TanStack Query
- ✅ Added automatic leaderboard refresh every 3 seconds
- ✅ Implemented duplicate name validation with proper error handling
- ✅ Added error recovery flow returning users to welcome screen
- ✅ Tested complete end-to-end game flow including duplicate submission handling

## Future Enhancements

**Database Migration:**
The application currently uses in-memory storage. To persist data across server restarts, migrate to PostgreSQL:
1. Use `create_postgresql_database_tool` to set up database
2. Run Drizzle migrations to create `players` table
3. Update `server/storage.ts` to use database instead of MemStorage
4. No frontend changes required due to storage abstraction layer

**Additional Features:**
- Admin panel to view all games and reset leaderboard
- Different difficulty levels (10, 30, 50 numbers)
- Historical statistics and charts
- Export leaderboard to CSV for teachers
- Sound effects and animations for celebrations
