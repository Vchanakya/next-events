# Entity Relationship Design

## Overview

This document describes the data model for the Event Manager application, which supports:

- Users creating and managing events
- Attendees participating in events (without being Users)
- Events having multiple tags for categorization
- Tracking RSVP status for attendees across multiple events

## Entities

### User

Represents system users who can create and manage events.

**Attributes:**

- `id`: string (UUID, primary key)
- `email`: string (unique, required) - User's email address for authentication
- `name`: string (required) - Display name
- `password`: string (hashed, required) - Authentication credential
- `role`: enum ['admin', 'organizer', 'viewer'] - User permission level
- `isActive`: boolean (default: true) - Account status
- `createdAt`: datetime - Account creation timestamp
- `updatedAt`: datetime - Last modification timestamp

**Indexes:**

- Primary: id
- Unique: email
- Index: isActive, role (for filtering active users by role)

### Event

Represents an event that can be created and managed by users.

**Attributes:**

- `id`: string (UUID, primary key)
- `title`: string (required, max 100 chars) - Event name
- `description`: text (optional) - Detailed event information
- `date`: datetime (required) - Event date and time
- `location`: string (optional) - Event venue/address
- `capacity`: integer (optional) - Maximum number of attendees
- `isPublic`: boolean (default: true) - Visibility status
- `status`: enum ['draft', 'published', 'cancelled', 'completed'] - Event lifecycle status
- `createdById`: string (foreign key -> User.id) - Event creator
- `createdAt`: datetime - Creation timestamp
- `updatedAt`: datetime - Last modification timestamp

**Indexes:**

- Primary: id
- Foreign: createdById
- Index: date, status (for querying upcoming events)
- Index: createdById, status (for user's events)

### Attendee

Represents individuals who can attend events but are not system users.

**Attributes:**

- `id`: string (UUID, primary key)
- `name`: string (required) - Attendee's full name
- `email`: string (optional) - Contact email
- `phone`: string (optional) - Contact phone
- `createdAt`: datetime - First registration timestamp

**Indexes:**

- Primary: id
- Index: email (for lookups and deduplication)

### Tag

Categorization labels for events.

**Attributes:**

- `id`: string (UUID, primary key)
- `name`: string (unique, required) - Tag label (e.g., "Internal", "Public", "Team Offsite")
- `color`: string (optional) - Hex color for UI display
- `description`: string (optional) - Tag purpose/usage
- `createdAt`: datetime - Creation timestamp

**Indexes:**

- Primary: id
- Unique: name

### EventAttendee (Join Table)

Tracks the many-to-many relationship between Events and Attendees with RSVP status.

**Attributes:**

- `id`: string (UUID, primary key)
- `eventId`: string (foreign key -> Event.id)
- `attendeeId`: string (foreign key -> Attendee.id)
- `rsvpStatus`: enum ['pending', 'confirmed', 'declined', 'maybe', 'no-show'] - Attendance status
- `registeredAt`: datetime - Registration timestamp
- `checkedInAt`: datetime (optional) - Actual attendance timestamp
- `notes`: text (optional) - Special requirements or comments

**Indexes:**

- Primary: id
- Unique composite: (eventId, attendeeId) - Prevents duplicate registrations
- Foreign: eventId, attendeeId
- Index: eventId, rsvpStatus (for event attendance queries)
- Index: attendeeId (for attendee history)

### EventTag (Join Table)

Links events with their tags.

**Attributes:**

- `id`: string (UUID, primary key)
- `eventId`: string (foreign key -> Event.id)
- `tagId`: string (foreign key -> Tag.id)
- `addedAt`: datetime - Tagging timestamp

**Indexes:**

- Primary: id
- Unique composite: (eventId, tagId) - Prevents duplicate tags
- Foreign: eventId, tagId
- Index: tagId (for finding events by tag)

## Relationships

1. **User → Event** (One-to-Many)

   - A User can create multiple Events
   - An Event belongs to one User (creator)

2. **Event ↔ Attendee** (Many-to-Many via EventAttendee)

   - An Event can have multiple Attendees
   - An Attendee can attend multiple Events
   - Relationship includes RSVP status and check-in data

3. **Event ↔ Tag** (Many-to-Many via EventTag)
   - An Event can have multiple Tags
   - A Tag can be applied to multiple Events

## Constraints

1. **Business Rules:**

   - An attendee cannot register for the same event twice
   - Event capacity cannot be exceeded by confirmed attendees
   - Past events cannot be modified (except for check-in data)
   - Only event creators and admins can modify events

2. **Data Integrity:**
   - Cascade delete: When an Event is deleted, remove all EventAttendee and EventTag records
   - Restrict delete: Cannot delete a User who has created events
   - Soft delete option: Mark events as 'cancelled' instead of deleting

## Performance Considerations

1. **Query Patterns:**

   - Frequent: List upcoming events, filter by tags, check attendance
   - Heavy: Event attendee lists, attendance reports
   - Consider read replicas for reporting queries

2. **Caching Strategy:**

   - Cache event details (TTL: 5 minutes)
   - Cache attendee counts (refresh on updates)
   - Cache tag lists (TTL: 1 hour)

3. **Scalability:**
   - Partition events table by date for large datasets
   - Consider separate analytics database for reporting
   - Implement pagination for attendee lists

## Assumptions

1. **Authentication:**

   - Users authenticate via email/password
   - Consider OAuth integration for future

2. **Attendee Management:**

   - Attendees are tracked separately from Users to allow public registration
   - Email is optional to support walk-in registrations

3. **Event Lifecycle:**

   - Events transition through defined statuses
   - Historical data is preserved for analytics

4. **Multi-tenancy:**
   - Current design assumes single organization
   - Can be extended with Organization entity for multi-tenant support

## Future Enhancements

1. **Features:**

   - Recurring events
   - Event templates
   - Waitlist management
   - Email notifications
   - QR code check-in

2. **Entities to Consider:**
   - Organization (for multi-tenancy)
   - EventSession (for multi-day events)
   - Invitation (for private events)
   - Payment (for paid events)
