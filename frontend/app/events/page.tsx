"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import {
  Container,
  Title,
  Button,
  Group,
  Card,
  Text,
  Badge,
  Select,
  Stack,
  Loader,
  Center,
  Alert,
  Flex,
  Box,
} from "@mantine/core";
import {
  IconCalendar,
  IconUsers,
  IconPlus,
  IconAlertCircle,
} from "@tabler/icons-react";
import { GET_EVENTS } from "../../graphql/getEvents.query";
import { GetEventsData, EventOrderBy } from "../../types/types";

const EVENTS_PER_PAGE = 5;

export default function EventsPage() {
  const [orderBy, setOrderBy] = useState<EventOrderBy>({
    field: "CREATED_AT",
    direction: "DESC",
  });

  const { loading, error, data, fetchMore } = useQuery<GetEventsData>(
    GET_EVENTS,
    {
      variables: {
        first: EVENTS_PER_PAGE,
        orderBy,
      },
    }
  );

  const handleLoadMore = () => {
    if (data?.events.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.events.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            events: {
              ...fetchMoreResult.events,
              edges: [...prev.events.edges, ...fetchMoreResult.events.edges],
            },
          };
        },
      });
    }
  };

  const handleSortChange = (value: string | null) => {
    if (!value) return;
    if (value === "CREATED_AT_DESC") {
      setOrderBy({ field: "CREATED_AT", direction: "DESC" });
      return;
    }
    if (value === "CREATED_AT_ASC") {
      setOrderBy({ field: "CREATED_AT", direction: "ASC" });
      return;
    }
    if (value === "DATE_ASC") {
      setOrderBy({ field: "DATE", direction: "ASC" });
      return;
    }
    if (value === "DATE_DESC") {
      setOrderBy({ field: "DATE", direction: "DESC" });
      return;
    }
    if (value === "TITLE_ASC") {
      setOrderBy({ field: "TITLE", direction: "ASC" });
      return;
    }
    if (value === "TITLE_DESC") {
      setOrderBy({ field: "TITLE", direction: "DESC" });
      return;
    }
  };

  if (loading && !data) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="lg" mt="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1}>Events</Title>
        <Button
          component={Link}
          href="/events/new"
          leftSection={<IconPlus size="1.2rem" />}
          size="md"
        >
          Create Event
        </Button>
      </Flex>

      <Group justify="space-between" mb="lg">
        <Text c="dimmed" size="sm">
          Total events: {data?.events.totalCount || 0}
        </Text>
        <Select
          w={250}
          size="sm"
          value={`${orderBy.field}_${orderBy.direction}`}
          onChange={handleSortChange}
          data={[
            { value: "CREATED_AT_DESC", label: "Newest First" },
            { value: "CREATED_AT_ASC", label: "Oldest First" },
            { value: "DATE_ASC", label: "Event Date (Earliest)" },
            { value: "DATE_DESC", label: "Event Date (Latest)" },
            { value: "TITLE_ASC", label: "Title (A-Z)" },
            { value: "TITLE_DESC", label: "Title (Z-A)" },
          ]}
          placeholder="Sort by"
        />
      </Group>

      {data?.events.edges.length === 0 ? (
        <Card p="xl" radius="md" withBorder>
          <Text ta="center" c="dimmed">
            No events yet. Create your first event!
          </Text>
        </Card>
      ) : (
        <Stack gap="md">
          {data?.events.edges.map(({ node: event }) => (
            <Card
              key={event.id}
              radius="md"
              withBorder
              shadow="sm"
              style={{ transition: "all 0.2s ease" }}
              styles={{
                root: {
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "var(--mantine-shadow-md)",
                  },
                },
              }}
            >
              <Flex justify="space-between" align="flex-start">
                <Box style={{ flex: 1 }}>
                  <Title order={3} size="h4" mb="xs">
                    {event.title}
                  </Title>
                  <Group gap="xs" mb="xs">
                    <IconCalendar
                      size="1rem"
                      color="var(--mantine-color-gray-6)"
                    />
                    <Text size="sm" c="dimmed">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconUsers
                      size="1rem"
                      color="var(--mantine-color-gray-6)"
                    />
                    <Badge variant="light" size="sm">
                      {event.attendeeCount}{" "}
                      {event.attendeeCount === 1 ? "attendee" : "attendees"}
                    </Badge>
                  </Group>
                </Box>
                <Button
                  component={Link}
                  href={`/events/${event.id}`}
                  variant="light"
                  size="sm"
                  rightSection="→"
                >
                  View Details
                </Button>
              </Flex>
            </Card>
          ))}

          {data?.events.pageInfo.hasNextPage && (
            <Center mt="lg">
              <Button
                onClick={handleLoadMore}
                loading={loading}
                variant="default"
                size="md"
              >
                Load More
              </Button>
            </Center>
          )}
        </Stack>
      )}
    </Container>
  );
}
