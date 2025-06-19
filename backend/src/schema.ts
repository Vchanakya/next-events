export const typeDefs = `#graphql
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees(first: Int, after: String): AttendeeConnection!
    attendeeCount: Int!
    createdAt: String!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
    eventId: ID!
    createdAt: String!
  }

  type EventEdge {
    cursor: String!
    node: Event!
  }

  type EventConnection {
    edges: [EventEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type AttendeeEdge {
    cursor: String!
    node: Attendee!
  }

  type AttendeeConnection {
    edges: [AttendeeEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    events(first: Int, after: String, orderBy: EventOrderBy): EventConnection!
    event(id: ID!): Event
  }

  input EventOrderBy {
    field: EventOrderByField!
    direction: OrderDirection!
  }

  enum EventOrderByField {
    DATE
    TITLE
    CREATED_AT
  }

  enum OrderDirection {
    ASC
    DESC
  }

  type Mutation {
    createEvent(title: String!, date: String!): Event!
    addAttendee(eventId: ID!, name: String!, email: String): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Event!
  }

  type MutationResponse {
    success: Boolean!
    message: String
    event: Event
  }
`;
