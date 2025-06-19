"use client";

import { Title, Card, Text, Stack } from "@mantine/core";
import { useSuspenseQuery } from "@apollo/client";
import { GetEventsQuery } from "../../graphql/generated";
import { GET_EVENTS } from "../../graphql/getEvents.query";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const router = useRouter();
  const QUERY = useSuspenseQuery<GetEventsQuery>(GET_EVENTS);
  const events = QUERY.data?.events || [];

  return (
    <Stack>
      <Title order={2}>All Events</Title>
      {events.map((event) => (
        <Card
          key={event.id}
          shadow="sm"
          padding="md"
          withBorder
          onClick={() => router.push(`/events/${event.id}`)}
        >
          <Title order={4}>{event.title}</Title>
          <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
          <Text>Attendees: {event.attendees.length}</Text>
        </Card>
      ))}
    </Stack>
  );
}
