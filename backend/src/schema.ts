export const typeDefs = `#graphql
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
    tags: [Tag!]!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String!
    rsvp: String!
  }

  type Tag {
    id: ID!
    label: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(title: String!, date: String!): Event!
    addAttendee(
      eventId: ID!
      name: String!
      email: String!
      rsvp: String!
    ): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
  }
`;
