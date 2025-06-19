# Implementation Notes

## Project Overview

This Event Manager application was built as a technical demonstration showcasing:

- GraphQL API design with Apollo Server
- Next.js with App Router
- TypeScript throughout the stack
- Modern React patterns with hooks
- Form handling with Formik and Yup validation

## Architecture Decisions

### Backend Choices

**GraphQL with Apollo Server**

- ✅ **Chosen**: Provides flexible querying, strong typing, and excellent developer tools
- ❌ **Alternative**: REST API - would require multiple endpoints and over fetching

**In-Memory Storage**

- ✅ **Chosen**: Simplifies development, no database setup required
- ❌ **Limitation**: Data is lost on server restart
- 🔮 **Future**: Replace with PostgreSQL/MongoDB for persistence

**Cursor-Based Pagination**

- ✅ **Chosen**: Scalable, consistent results, works well with GraphQL
- ❌ **Alternative**: Offset-based pagination - simpler but less scalable

### Frontend Choices

**Next.js with App Router**

- ✅ **Chosen**: Modern React framework with excellent developer experience
- ✅ **App Router**: Latest routing system with better performance
- ❌ **Alternative**: Pages Router - older but more stable

**Mantine UI Library**

- ✅ **Chosen**: Comprehensive component library with great TypeScript support
- ❌ **Original Requirement**: TailwindCSS - time constraints led to Mantine choice
- 🔧 **Trade-off**: Faster development vs exact requirement match

**Apollo Client**

- ✅ **Chosen**: Excellent GraphQL integration, caching, and DevTools
- ❌ **Alternative**: React Query - would work but requires more setup for GraphQL

## Technical Implementations

### RSVP Status Management

**Status Values**: `ATTENDING`, `NOT_ATTENDING`, `MAYBE`

- Simple enum approach for MVP
- Extensible to more granular statuses
- Color-coded UI indicators for better UX

**Implementation**:

```typescript
// Backend validation
rsvp: String! // Required field
  // Frontend form validation
  .oneOf(["ATTENDING", "NOT_ATTENDING", "MAYBE"]);
```

### Form Validation Strategy

**Formik + Yup Combination**:

- Real-time validation feedback
- TypeScript integration
- Consistent error handling patterns

**Example**:

```typescript
const eventSchema = Yup.object().shape({
  title: Yup.string().min(3).max(100).required(),
  date: Yup.date().min(new Date()).required(),
});
```

### Error Handling Approach

**GraphQL Error Pattern**:

- Server returns structured errors
- Frontend shows user-friendly notifications
- Development errors logged to console

**User Experience**:

- Loading states for all mutations
- Success/error notifications
- Confirmation dialogs for destructive actions

## Known Issues and Limitations

### Current Limitations

1. **No Authentication**

   - Events can be created/modified by anyone
   - No user ownership tracking
   - **Impact**: Not production-ready
   - **Mitigation**: Would add JWT-based auth system

2. **In-Memory Storage**

   - Data lost on server restart
   - No data persistence
   - **Impact**: Demo/development only
   - **Mitigation**: Database integration planned

3. **Limited Error Boundaries**

   - Basic error handling only
   - No comprehensive error recovery
   - **Impact**: Poor error experience in edge cases
   - **Mitigation**: Add React Error Boundaries

4. **No Real-Time Updates**
   - Changes don't reflect across browser tabs
   - **Impact**: Multiple users see stale data
   - **Mitigation**: WebSocket subscriptions or polling

## Development Workflow

### Code Generation

**GraphQL Code Generation**:

```bash
npm run codegen
```

- Generates TypeScript types from schema
- Creates typed Apollo hooks
- Ensures type safety across stack

### File Organization

```
frontend/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── graphql/         # GraphQL queries/mutations
├── types/           # TypeScript type definitions
└── theme.ts         # Mantine theme configuration

backend/
├── src/
│   ├── index.ts     # Server entry point
│   └── schema.ts    # GraphQL schema definition
└── package.json
```

## Assumptions Made

### Business Logic

1. **Event Creation**: Anyone can create events (no auth required for demo)
2. **Attendee Management**: Anyone can add/remove attendees
3. **RSVP Changes**: Attendees can change RSVP status freely
4. **Event Timing**: No restriction on past event modifications

### Data Model

1. **No Event Capacity**: Unlimited attendees per event
2. **Simple RSVP**: Only three status values needed
3. **No User Profiles**: Attendees are simple records

### Technical

1. **Browser Support**: Modern browsers with ES2017+ support
2. **Device Support**: Desktop-first, mobile-friendly
3. **Network**: Reliable internet connection assumed
4. **Scale**: Small to medium event sizes (<1000 attendees)

## Final Notes

Time constraints led to some simplifications (Mantine vs TailwindCSS, no authentication), but the core functionality meets all requirements and provides a solid foundation for future development.
