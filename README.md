# Mini Event Manager

## Goal

Build a minimal Event Manager using Next.js (App Router), React, TypeScript, and GraphQL. The app should allow users to:

- View a list of events
- Create a new event
- View event details (including attendees)
- Add/remove attendees

## Requirements

### 1. Backend (GraphQL)

- Use a mock GraphQL API (Apollo Server, or similar) with an in-memory for storage.
- You are responsible for designing the GraphQL schema (types, queries, mutations) needed to support the required features.

### 2. Frontend (Next.js)

- Pages:
  - /events — List all events
  - /events/new — Form to create a event
  - /events/[id] — Event details, attendee management
- Features:
  - List events with title, date, and attendee count
  - Create event (title and date required)
  - View event details (show attendees)
  - Add attendee (name and email, email optional)
  - Remove attendee
- Tech:
  - TypeScript everywhere
  - Use Apollo Client or React Query for data fetching
  - Use React hooks and functional components
  - Minimal styling (TailwindCSS preferred)
  - Use Formik for forms
  - Use Zustand for state management (if needed)
  - Use Zod or Yup for validation (if needed)
  - Use Headless UI for any UI components (modals, dialogs, etc.) (if needed)

### 3. Entity Relationship Design

In addition to the working app, provide a short document (ENTITIES.md) where you
describe a realistic data model for the following relationships:

- Users can create and manage events (create, view, update, delete)
- Attendees can attend events, but they are not Users
- Each Event can have one or more Tags (e.g. “Internal”, “Public”, “Team Offsite”)
- Attendees may attend multiple events, and their RSVP status should be tracked

What to include:

- Entity names
- Attributes for each entity
- Types of each attribute (e.g., string, number, date, reference)
- Any "join" entities if needed
- Any constraints or unique identifiers
- Any indexes or performance considerations
- Any assumptions made about the data model

For example:

```markdown
# Entities

Dog

- name: string
- age: number (age of the dog in years)
- ownerId: string (ID of the owner, references User)

User

- name: string
- email: string (unique email address)
```

### 4. Bonus (Optional)

This is ONLY if you have extra time after completing the main features. It is preferred that you spend extra time on ensuring the code is maintainable and organized and rather than implementing these features.

- Form validation when creating events and adding attendees
- Optimistic UI for attendee add/remove
- Responsive design
- Provide a Dockerfile for the app

### 4. Deliverables

- GitHub repo (public link) or zip file (delete the .git and node_modules directories if zipping)
  - Source code for the Next.js app
  - Source code for the GraphQL server
  - Any additional scripts or configuration files needed to run the app
  - ENTITIES.md with the data model design
  - SETUP.md with setup instructions and running instructions
  - NOTES.md with any assumptions made and any known issues

### 5. Time Expectation

The core assignment should take around 5–6 hours. Please prioritize functionality and clarity. Don’t worry about perfect CSS or scalability. You’ll have 3 days to complete it, but if you need a bit more time just let me know.

## Good luck!
