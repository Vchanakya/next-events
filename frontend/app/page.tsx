"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/getEvents.query";
import {
  Card,
  Title,
  Text,
  Grid,
  Loader,
  Stack,
  AppShell,
  Burger,
} from "@mantine/core";
import { Suspense } from "react";
import { GetEventsQuery } from "../graphql/generated";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const QUERY = useSuspenseQuery<GetEventsQuery>(GET_EVENTS);
  const events = QUERY.data?.events || [];
  const totalEvents = events.length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees.length, 0);
  const avgAttendees = totalEvents
    ? Math.round(totalAttendees / totalEvents)
    : 0;
  const latestEventDate =
    events
      .map((e) => new Date(e.date))
      .sort((a, b) => b.getTime() - a.getTime())[0]
      ?.toDateString() ?? "N/A";

  const [opened, { toggle }] = useDisclosure();

  return (
    <Suspense fallback={<Loader />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <AppShell.Main>
          <Stack>
            <Title order={1}>Event Dashboard</Title>

            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card withBorder onClick={() => router.push("/events")}>
                  <Title order={4}>Total Events</Title>
                  <Text size="lg">{totalEvents}</Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card withBorder>
                  <Title order={4}>Total Attendees</Title>
                  <Text size="lg">{totalAttendees}</Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card withBorder>
                  <Title order={4}>Average Attendees</Title>
                  <Text size="lg">{avgAttendees}</Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card withBorder>
                  <Title order={4}>Most Recent Event</Title>
                  <Text size="lg">{latestEventDate}</Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
}
