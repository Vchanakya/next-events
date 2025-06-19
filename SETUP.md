# Setup Instructions

## Prerequisites

Before running the Event Manager application, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm - [Install pnpm](https://pnpm.io/installation)
- **Git** - [Download here](https://git-scm.com/)

## Project Structure

```
event-manager/
├── backend/          # GraphQL Apollo Server
├── frontend/         # Next.js React Application
├── ENTITIES.md       # Data model documentation
├── SETUP.md         # This file
├── NOTES.md         # Implementation notes
└── README.md        # Project overview
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-manager
```

### 2. Install Backend Dependencies

```bash
cd backend
pnpm install
# or
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
pnpm install
# or
npm install
```

## Running the Application

### Development Mode

You'll need to run both the backend and frontend servers simultaneously.

#### Terminal 1 - Backend Server

```bash
cd backend
pnpm start
# or
npm start
```

The GraphQL server will start at: **http://localhost:3001**

- GraphQL Playground: **http://localhost:3001/graphql**

#### Terminal 2 - Frontend Server

```bash
cd frontend
pnpm dev
# or
npm run dev
```

The Next.js application will start at: **http://localhost:3000**

### Production Build

#### Backend

```bash
cd backend
pnpm build
pnpm start:prod
```

#### Frontend

```bash
cd frontend
pnpm build
pnpm start
```

## Development Workflow

### 1. GraphQL Schema Changes

If you modify the GraphQL schema (`backend/src/schema.ts`):

1. Restart the backend server
2. Regenerate frontend types:
   ```bash
   cd frontend
   pnpm codegen
   # or
   npm run codegen
   ```

### 2. Frontend Development

- Hot reload is enabled for development
- Changes to components/pages will auto-refresh
- TypeScript errors will show in the browser and terminal

### 3. Backend Development

- Server automatically restarts on file changes (ts-node)
- GraphQL Playground available for testing queries/mutations

## Available Scripts

### Backend (`backend/package.json`)

- `pnpm start` - Start development server with ts-node
- `pnpm test` - Run tests (not implemented)

### Frontend (`frontend/package.json`)

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm codegen` - Generate TypeScript types from GraphQL schema

## Environment Variables

### Backend

No environment variables required for basic setup. The server runs on port 3001 by default.

Optional environment variables:

```bash
# backend/.env (create if needed)
PORT=3001
NODE_ENV=development
```

### Frontend

The frontend expects the GraphQL endpoint at `http://localhost:3001/graphql`.

Optional environment variables:

```bash
# frontend/.env.local (create if needed)
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
```

## Database/Storage

The application uses **in-memory storage** for development:

- Data is stored in JavaScript Maps
- Data is lost when the backend server restarts
- Seed data is automatically generated on startup

### Seed Data

The application automatically creates sample data:

- 3 sample events
- 5 sample attendees with various RSVP statuses
- Events with different dates (past, present, future)

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   Error: listen EADDRINUSE: address already in use :::3001
   ```

   **Solution**: Kill the process using port 3001 or change the port in `backend/src/index.ts`

2. **GraphQL CodeGen Errors**

   ```bash
   Error: Failed to load schema
   ```

   **Solution**: Ensure the backend server is running before running `pnpm codegen`

3. **Module Not Found Errors**
   **Solution**:

   ```bash
   rm -rf node_modules package-lock.json
   pnpm install
   ```

4. **TypeScript Errors in Frontend**
   **Solution**: Regenerate GraphQL types:
   ```bash
   cd frontend
   pnpm codegen
   ```

### Backend Debugging

Enable GraphQL debugging:

```typescript
// backend/src/index.ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(), // Enable playground
  ],
});
```

### Frontend Debugging

Apollo Client DevTools:

1. Install [Apollo Client DevTools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm)
2. Open Chrome DevTools → Apollo tab
3. Inspect queries, mutations, and cache

## API Documentation

### GraphQL Schema

Visit **http://localhost:3001/graphql** when the backend is running to explore:

- Available queries and mutations
- Schema documentation
- Interactive query builder

### Key Endpoints

**Queries:**

- `events` - List all events with pagination
- `event(id)` - Get single event with attendees

**Mutations:**

- `createEvent(title, date)` - Create new event
- `addAttendee(eventId, name, email, rsvp)` - Add attendee to event
- `removeAttendee(eventId, attendeeId)` - Remove attendee from event

## Testing

### Backend Testing

```bash
cd backend
# Tests not implemented yet
pnpm test
```

### Frontend Testing

```bash
cd frontend
# Tests not implemented yet
pnpm test
```

### Manual Testing

1. **Create Event**: Visit `/events/new`
2. **View Events**: Visit `/events`
3. **Manage Attendees**: Click on any event → Add/remove attendees
4. **Test RSVP**: Try different RSVP statuses when adding attendees

## Docker Support

```
docker-compose up --build
```
