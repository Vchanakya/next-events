import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { v4 as uuidv4 } from "uuid";

// Helper function to encode cursor
const encodeCursor = (id: string): string => Buffer.from(id).toString("base64");
const decodeCursor = (cursor: string): string =>
  Buffer.from(cursor, "base64").toString("ascii");

// In-memory storage
const events = new Map();
const attendees = new Map();

// Helper to get sorted events
const getSortedEvents = (orderBy?: { field: string; direction: string }) => {
  const eventsList = Array.from(events.values());

  if (orderBy) {
    eventsList.sort((a, b) => {
      let compareValue = 0;

      switch (orderBy.field) {
        case "DATE":
          compareValue =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "TITLE":
          compareValue = a.title.localeCompare(b.title);
          break;
        case "CREATED_AT":
          compareValue =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          compareValue =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return orderBy.direction === "DESC" ? -compareValue : compareValue;
    });
  }

  return eventsList;
};

// Helper to paginate results
const paginate = (items: any[], first: number = 10, after?: string) => {
  let startIndex = 0;

  if (after) {
    const afterId = decodeCursor(after);
    const afterIndex = items.findIndex((item) => item.id === afterId);
    if (afterIndex >= 0) {
      startIndex = afterIndex + 1;
    }
  }

  const endIndex = startIndex + first;
  const paginatedItems = items.slice(startIndex, endIndex);
  const hasNextPage = endIndex < items.length;
  const hasPreviousPage = startIndex > 0;

  const edges = paginatedItems.map((item) => ({
    cursor: encodeCursor(item.id),
    node: item,
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
    totalCount: items.length,
  };
};

// Seed some initial data
const seedData = () => {
  // Event 1
  const event1Id = uuidv4();
  events.set(event1Id, {
    id: event1Id,
    title: "Tech Conference 2024",
    date: "2024-12-15T10:00:00Z",
    createdAt: new Date("2024-01-01").toISOString(),
  });

  const attendee1Id = uuidv4();
  attendees.set(attendee1Id, {
    id: attendee1Id,
    name: "John Doe",
    email: "john@example.com",
    eventId: event1Id,
    createdAt: new Date().toISOString(),
  });

  const attendee2Id = uuidv4();
  attendees.set(attendee2Id, {
    id: attendee2Id,
    name: "Jane Smith",
    email: "jane@example.com",
    eventId: event1Id,
    createdAt: new Date().toISOString(),
  });

  // Event 2
  const event2Id = uuidv4();
  events.set(event2Id, {
    id: event2Id,
    title: "Team Building Workshop",
    date: "2024-12-20T14:00:00Z",
    createdAt: new Date("2024-01-02").toISOString(),
  });

  const attendee3Id = uuidv4();
  attendees.set(attendee3Id, {
    id: attendee3Id,
    name: "Bob Johnson",
    email: null,
    eventId: event2Id,
    createdAt: new Date().toISOString(),
  });
};

// Initialize seed data
seedData();

export const resolvers = {
  Query: {
    events: (
      _: any,
      {
        first = 10,
        after,
        orderBy,
      }: { first?: number; after?: string; orderBy?: any }
    ) => {
      const sortedEvents = getSortedEvents(orderBy);
      return paginate(sortedEvents, first, after);
    },
    event: (_: any, { id }: { id: string }) => events.get(id) || null,
  },
  Event: {
    attendees: (
      parent: any,
      { first = 10, after }: { first?: number; after?: string }
    ) => {
      const eventAttendees = Array.from(attendees.values())
        .filter((attendee) => attendee.eventId === parent.id)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      return paginate(eventAttendees, first, after);
    },
    attendeeCount: (parent: any) => {
      return Array.from(attendees.values()).filter(
        (attendee) => attendee.eventId === parent.id
      ).length;
    },
  },
  Mutation: {
    createEvent: (_: any, { title, date }: { title: string; date: string }) => {
      const id = uuidv4();
      const event = {
        id,
        title,
        date,
        createdAt: new Date().toISOString(),
      };
      events.set(id, event);
      return event;
    },
    addAttendee: (
      _: any,
      {
        eventId,
        name,
        email,
      }: { eventId: string; name: string; email?: string }
    ) => {
      const event = events.get(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      const attendeeId = uuidv4();
      const attendee = {
        id: attendeeId,
        name,
        email: email || null,
        eventId,
        createdAt: new Date().toISOString(),
      };
      attendees.set(attendeeId, attendee);

      return attendee;
    },
    removeAttendee: (
      _: any,
      { eventId, attendeeId }: { eventId: string; attendeeId: string }
    ) => {
      const event = events.get(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      const attendee = attendees.get(attendeeId);
      if (!attendee || attendee.eventId !== eventId) {
        throw new Error("Attendee not found for this event");
      }

      attendees.delete(attendeeId);
      return event;
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
}

startServer();
