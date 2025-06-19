import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuid } from "uuid";
import { typeDefs } from "./schema";
import { Event, Attendee, Tag } from "./types";

const events: Event[] = [];

const resolvers = {
  Query: {
    events: () => events,
    event: (_: unknown, { id }: { id: string }) =>
      events.find((e) => e.id === id),
  },
  Mutation: {
    createEvent: (
      _: unknown,
      { title, date }: { title: string; date: string }
    ) => {
      const event: Event = {
        id: uuid(),
        title,
        date,
        attendees: [],
        tags: [],
      };
      events.push(event);
      return event;
    },
    addAttendee: (
      _: unknown,
      {
        eventId,
        name,
        email,
        rsvp,
      }: { eventId: string; name: string; email?: string; rsvp: string }
    ) => {
      const event = events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");

      const attendee: Attendee = {
        id: uuid(),
        name,
        email,
        rsvp,
      };
      event.attendees.push(attendee);
      return attendee;
    },
    removeAttendee: (
      _: unknown,
      { eventId, attendeeId }: { eventId: string; attendeeId: string }
    ) => {
      const event = events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");

      const index = event.attendees.findIndex((a) => a.id === attendeeId);
      if (index === -1) return false;

      event.attendees.splice(index, 1);
      return true;
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
